﻿using System.Linq;
using System.Threading.Tasks;
using BlazorDiffusion.ServiceInterface.Analytics;
using ServiceStack;
using ServiceStack.OrmLite;
using BlazorDiffusion.ServiceModel;
using CoenM.ImageHash.HashAlgorithms;
using ServiceStack.Jobs;

namespace BlazorDiffusion.ServiceInterface;

public class SearchService(IAutoQueryDb autoQuery, IBackgroundJobs jobs) : Service
{
    public object Any(SearchArtifacts query)
    {
        var search = query.Query ?? "";

        using var db = autoQuery.GetDb(query, base.Request);
        var q = autoQuery.CreateQuery(query, base.Request, db);

        var similar = query.Similar?.Trim();
        var similarToArtifact = !string.IsNullOrEmpty(similar)
            ? Db.Single<Artifact>(x => x.RefId == similar)
            : null;
        // ?similar={RefId}&by=[^background|avg|diff|...perceptual]
        if (similarToArtifact != null)
        {
            const string DefaultSimilarSearch = "background";

            if (similarToArtifact.MissingImageDetails())
            {
                var hashAlgorithm = new PerceptualHash();
                var artifactFile = VirtualFiles.GetFile(similarToArtifact.FilePath);
                using var filStream = artifactFile.OpenRead();
                similarToArtifact.LoadImageDetails(filStream);
                lock (Locks.AppDb)
                {
                    Db.UpdateOnly(() => new Artifact
                    {
                        PerceptualHash = similarToArtifact.PerceptualHash,
                        AverageHash = similarToArtifact.AverageHash,
                        DifferenceHash = similarToArtifact.DifferenceHash,
                        Background = similarToArtifact.Background,
                    },
                    where: x => x.Id == similarToArtifact.Id);
                }
            }

            var by = query.By ?? DefaultSimilarSearch;
            var background = by == "background";
            var perceptual = !background;

            q.Join<Creative>();
            q.OrderByDescending("Quality");

            if (background)
            {
                db.RegisterBgCompare();
                q.SelectDistinct<Artifact, Creative>((a, c) => new {
                    a,
                    c.UserPrompt,
                    c.ArtistNames,
                    c.ModifierNames,
                    c.PrimaryArtifactId,
                    Similarity = Sql.Custom($"bgcompare('{similarToArtifact.Background}',Background)"),
                });
                var isLandscape = similarToArtifact.Width > similarToArtifact.Height;
                if (isLandscape)
                    q.Where(x => x.Width >= x.Height);
                var isPortrait = similarToArtifact.Height > similarToArtifact.Width;
                if (isPortrait)
                    q.Where(x => x.Height >= x.Width);

                q.Where("Similarity <= 50");
                q.ThenBy("Similarity");
            }
            else
            {
                var fnArgs = by == "avg"
                    ? $"{similarToArtifact.AverageHash},AverageHash"
                    : by == "diff"
                        ? $"{similarToArtifact.DifferenceHash},DifferenceHash"
                        : $"{similarToArtifact.PerceptualHash},PerceptualHash";

                db.RegisterImgCompare();

                q.Where("Similarity >= 60");
                q.SelectDistinct<Artifact, Creative>((a, c) => new {
                    a,
                    c.UserPrompt,
                    c.ArtistNames,
                    c.ModifierNames,
                    c.PrimaryArtifactId,
                    Similarity = Sql.Custom($"imgcompare({fnArgs})"),
                });
                q.ThenByDescending("Similarity");
            }

        }
        else
        {
            q.Join<Creative>((a, c) => c.Id == a.CreativeId); 
            q.OrderByDescending(x => x.Quality); // always show bad images last

            if (!string.IsNullOrEmpty(search))
            {
                //q.Where<Creative>(x => x.Prompt.Contains(search)); // basic search
                search = search.Replace("\"", ""); // escape
                if (search.EndsWith('s')) // allow wildcard search to match on both
                    search = Words.Singularize(search);
                var ftsSearch = search.Quoted() + "*"; // wildcard search
                q.Join<ArtifactFts>((a, f) => a.Id == f.rowid);
                q.Where<Artifact,Creative>((a, c) => c.PrimaryArtifactId == a.Id); // only pinned
                q.Where(q.Column<ArtifactFts>(x => x.Prompt, prefixTable: true) + " match {0}", ftsSearch);
                q.ThenBy(q.Column<ArtifactFts>("Rank", prefixTable: true));
            }
            else if (query.Modifier != null)
            {
                q.Join<Creative, CreativeModifier>((creative, modifierRef) => creative.Id == modifierRef.CreativeId)
                 .Join<CreativeModifier, Modifier>((modifierRef, modifier) => modifierRef.ModifierId == modifier.Id && modifier.Name == query.Modifier);
                q.Where<Artifact, Creative>((a, c) => c.PrimaryArtifactId == a.Id); // only pinned
            }
            else if (query.Artist != null)
            {
                var lastName = query.Artist.RightPart(',');
                var firstName = lastName == query.Artist
                    ? null
                    : query.Artist.LeftPart(',');

                q.Join<Creative, CreativeArtist>((creative, artistRef) => creative.Id == artistRef.CreativeId)
                 .Join<CreativeArtist, Artist>((artistRef, artist) => artistRef.ArtistId == artist.Id && artist.FirstName == firstName && artist.LastName == lastName);
                q.Where<Artifact, Creative>((a, c) => c.PrimaryArtifactId == a.Id); // only pinned
            }
            else if (query.User != null)
            {
                if (query.Show == "likes")
                {
                    q.Join<AppUser>((a,u) => u.RefIdStr == query.User)
                     .Join<Artifact,ArtifactLike,AppUser>((a, l, u) => a.Id == l.ArtifactId && u.Id == l.AppUserId)
                     .ThenByDescending(a => a.Id);
                }
                else if (query.Album != null)
                {
                    q.Join<AppUser>((a, u) => u.RefIdStr == query.User)
                     .Join<Artifact, AlbumArtifact>((artifact, albumRef) => artifact.Id == albumRef.ArtifactId)
                     .Join<AlbumArtifact, Album>((albumRef, album) => albumRef.AlbumId == album.Id && album.RefId == query.Album);
                    q.ThenByDescending<Album, AlbumArtifact>((album, artifact) => new { 
                        PrimaryArtifact = artifact.ArtifactId == album.PrimaryArtifactId ? 1 : 0, artifact.Id,
                    });
                }
                else
                {
                    // only pinned
                    q.Where<Artifact,Creative>((a, c) => c.OwnerRef == query.User && c.PrimaryArtifactId == a.Id)
                     .ThenByDescending(a => a.Id);
                }
            }
            else if (query.Album != null)
            {
                q.Join<Artifact, AlbumArtifact>((artifact, albumRef) => artifact.Id == albumRef.ArtifactId)
                 .Join<AlbumArtifact, Album>((albumRef, album) => albumRef.AlbumId == album.Id && album.RefId == query.Album);
                q.ThenByDescending<Album, AlbumArtifact>((album, artifact) => new {
                    PrimaryArtifact = artifact.ArtifactId == album.PrimaryArtifactId ? 1 : 0,
                    artifact.Id,
                });
                
                var user = Request.GetClaimsPrincipal(); 
                if (user == null || !(user.IsInRole(AppRoles.Admin) || user.IsInRole(AppRoles.Moderator)))
                {
                    q.Where<Artifact>(x => (x.Nsfw == false || x.Nsfw == null) && x.Quality >= 0);
                }
            }
            else
            {
                q.Where<Artifact, Creative>((a, c) => c.PrimaryArtifactId == a.Id); // only pinned
            }

            if (query.Show == "top")
            {
                q.ThenByDescending(x => x.Score).ThenByDescending(x => x.Id);
            }
            else if (query.Show == "latest")
            {
                q.ThenByDescending(x => x.Id);
            }
            else
            {
                q.ThenByDescending(x => x.Score + x.TemporalScore).ThenByDescending(x => x.Id);
            }

            // Need distinct else Blazor @key throws when returning dupes
            q.SelectDistinct<Artifact, Creative>((a, c) => new { a, c.UserPrompt, c.ArtistNames, c.ModifierNames, c.PrimaryArtifactId, c.OwnerRef });
        }

        var userId = Request.GetUserId();
        if (userId != Users.Admin.Id && userId != Users.System.Id)
        {
            var recordSearch = query.Query != null
                || query.Similar != null
                || query.Modifier != null
                || query.Artist != null
                || (query.Album != null && query.Source != AppSource.Top)
                || similarToArtifact?.Id != null;

            if (recordSearch && Request!.RawUrl?.StartsWith("gateway://") != true)
            {
                jobs.RunCommand<RecordAnalyticsCommand>(new RecordAnalytics {
                    RecordSearchStat = new SearchStat
                    {
                        Query = query.Query,
                        Similar = query.Similar,
                        User = query.User,
                        Show = query.Show,
                        Modifier = query.Modifier,
                        Artist = query.Artist,
                        Album = query.Album,
                        ArtifactId = similarToArtifact?.Id,
                        Source = query.Source,
                    }.WithRequest(Request),
                });
            }
        }

        return autoQuery.Execute(query, q, base.Request, db);
    }
}
