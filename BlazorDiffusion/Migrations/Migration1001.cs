﻿using System.Data;
using System.Diagnostics;
using System.IO.Compression;
using System.Runtime.Serialization;
using BlazorDiffusion.Data;
using BlazorDiffusion.ServiceInterface;
using BlazorDiffusion.ServiceModel;
using CoenM.ImageHash;
using CoenM.ImageHash.HashAlgorithms;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Configuration;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using ServiceStack.Text;

namespace BlazorDiffusion.Migrations;

public class Migration1001 : MigrationBase
{
    public class Creative : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string UserPrompt { get; set; }
        public string Prompt { get; set; }

        public int Images { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public int Steps { get; set; }

        public int? CuratedArtifactId { get; set; }
        public int? PrimaryArtifactId { get; set; }

        public List<string> ArtistNames { get; set; }
        public List<string> ModifierNames { get; set; }

        [Reference]
        public List<CreativeArtist> Artists { get; set; }

        [Reference]
        public List<CreativeModifier> Modifiers { get; set; }

        [Reference]
        [Format("presentFilesPreview")]
        public List<Artifact> Artifacts { get; set; }

        public string? Error { get; set; }

        //[References(typeof(AppUser))]
        public int? OwnerId { get; set; }

        public string? OwnerRef { get; set; }
        public string? Key { get; set; }

        public bool Curated { get; set; }
        public int? Rating { get; set; }
        public bool Private { get; set; }
        [Default(0)]
        public int Score { get; set; }
        [Default(0)]
        public int Rank { get; set; }
        public string RefId { get; set; }
        public string RequestId { get; set; }
        public string EngineId { get; set; }
    }

    public class ArtifactLike
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Artifact))]
        public int ArtifactId { get; set; }

        //[References(typeof(AppUser))]
        public int AppUserId { get; set; }

        public DateTime CreatedDate { get; set; }
    }

    public class ArtifactReport
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Artifact))]
        public int ArtifactId { get; set; }

        //[References(typeof(AppUser))]
        public int AppUserId { get; set; }

        public ReportType Type { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? Notes { get; set; }
        public DateTime? ActionedDate { get; set; }
        public string? ActionedBy { get; set; }
    }

    public enum ReportType
    {
        Nsfw,
        Other,
    }

    public class Artifact : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Creative))]
        public int CreativeId { get; set; }

        public string FileName { get; set; }

        [Format(FormatMethods.Attachment)]
        public string FilePath { get; set; }

        public string ContentType { get; set; }

        [Format(FormatMethods.Bytes)]
        public long ContentLength { get; set; }

        public int Width { get; set; }
        public int Height { get; set; }
        public ulong Seed { get; set; }
        public string Prompt { get; set; }
        public bool? Nsfw { get; set; }
        public Int64? AverageHash { get; set; }
        public Int64? PerceptualHash { get; set; }

        public Int64? DifferenceHash { get; set; }

        // Dominant Color to show before download
        public string? Background { get; set; }

        // Low Quality Image Placeholder for fast load in
        public string? Lqip { get; set; }

        // Set Low Quality images to:
        //  - Malformed: -1
        //  - Blurred: -2
        //  - LowQuality: -3
        public int Quality { get; set; }
        public int LikesCount { get; set; } // duplicated aggregate counts
        public int AlbumsCount { get; set; }
        public int DownloadsCount { get; set; }
        public int SearchCount { get; set; }
        public int TemporalScore { get; set; } // bonus score given to recent creations
        [Default(0)]
        public int Score { get; set; }
        [Default(0)]
        public int Rank { get; set; }
        public string RefId { get; set; }
    }

    public class Artist : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string? FirstName { get; set; }
        public string LastName { get; set; }
        public int? YearDied { get; set; }
        public List<string>? Type { get; set; }
        [Default(0)]
        public int Score { get; set; }
        [Default(0)]
        public int Rank { get; set; }
    }

    public class Modifier : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Category { get; set; }
        public string? Description { get; set; }
        [Default(0)]
        public int Score { get; set; }
        [Default(0)]
        public int Rank { get; set; }
    }

    public class CreativeArtist
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Creative))]
        public int CreativeId { get; set; }

        [References(typeof(Artist))]
        public int ArtistId { get; set; }

        [Reference]
        public Artist Artist { get; set; }
    }

    public class CreativeModifier
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Creative))]
        public int CreativeId { get; set; }

        [References(typeof(Modifier))]
        public int ModifierId { get; set; }

        [Reference]
        public Modifier Modifier { get; set; }
    }

    public class Album : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string Slug { get; set; }
        public List<string> Tags { get; set; }
        public string RefId { get; set; }

        //[References(typeof(AppUser))]
        public int OwnerId { get; set; }

        public string OwnerRef { get; set; }
        public int? PrimaryArtifactId { get; set; }
        public bool Private { get; set; }
        public int? Rating { get; set; }
        public int LikesCount { get; set; } // duplicated aggregate counts
        public int DownloadsCount { get; set; }
        public int SearchCount { get; set; }
        public int Score { get; set; }
        public int Rank { get; set; }
        public int? PrefColumns { get; set; }

        [Reference]
        public List<AlbumArtifact> Artifacts { get; set; }
    }

    public class AlbumArtifact
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Album))]
        public int AlbumId { get; set; }

        [References(typeof(Artifact))]
        public int ArtifactId { get; set; }

        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }

        [Reference]
        public List<Artifact> Artifact { get; set; }
    }

    public class AlbumLike
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Album))]
        public int AlbumId { get; set; }

        //[References(typeof(AppUser))]
        public int AppUserId { get; set; }

        public DateTime CreatedDate { get; set; }
    }

    public static string GetArtistName(Artist artist) => string.IsNullOrEmpty(artist.FirstName)
        ? artist.LastName
        : $"{artist.FirstName} {artist.LastName}";

    public override void Up()
    {
        Db.CreateTable<Artist>();
        Db.CreateTable<Modifier>();
        Db.CreateTable<Creative>();
        Db.CreateTable<CreativeArtist>();
        Db.CreateTable<CreativeModifier>();
        Db.CreateTable<Artifact>();
        Db.CreateTable<ArtifactLike>();
        Db.CreateTable<ArtifactReport>();
        Db.CreateTable<Album>();
        Db.CreateTable<AlbumArtifact>();
        Db.CreateTable<AlbumLike>();

        var seedDir = Path.GetFullPath(Path.Combine("./Migrations/seed"));

        var errors = new List<string>();

        // Import Modifiers
        foreach (var line in File.ReadAllLines(seedDir.CombineWith("modifiers.txt")))
        {
            var category = line.LeftPart(':').Trim();
            var modifiers = line.RightPart(':').Split(',').Select(x => x.Trim()).ToList();
            foreach (var modifier in modifiers)
            {
                Db.Insert(new Modifier { Name = modifier, Category = category }.BySystemUser());
            }
        }

        /// Check for duplicates
        var savedModifiers = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        var allMods = Db.Select<Modifier>();
        foreach (var modifier in allMods)
        {
            var isUnique = savedModifiers.TryAdd(modifier.Name, modifier.Id);
            if (!isUnique)
                errors.Add($"Duplicate Modifier - {modifier.Category}/{modifier.Name}");
        }

        // Import Artists
        var Artists = File.ReadAllText(seedDir.CombineWith("artists.csv")).FromCsv<List<Artist>>()
            .Select(x => x.BySystemUser()).ToList();
        Db.InsertAll(Artists);
        /// Check for duplicates
        var savedArtistIds = new Dictionary<string, int>(StringComparer.OrdinalIgnoreCase);
        var allArtists = Db.Select<Artist>();
        foreach (var a in allArtists)
        {
            var artistName = GetArtistName(a);
            var isUnique = savedArtistIds.TryAdd(artistName, a.Id);
            if (!isUnique)
                errors.Add($"Duplicate Artist - {artistName}");
        }

        // When needing to match on Artifact Ids
        var artifactRefIdsMap = new Dictionary<string, int>();

        // Import Creatives + Artifacts
        var allArtifactLikeRefs = File.ReadAllText(seedDir.CombineWith("artifact-likes.csv"))
            .FromCsv<List<ArtifactLikeRef>>();
        var appData = new DirectoryInfo("./App_Data");
        if (!appData.Exists)
            appData.Create();

        var seedFromDirectory = new DirectoryInfo("./App_Data/artifacts");
        if (!seedFromDirectory.Exists)
        {
            seedFromDirectory.Create();
            FetchDemoAssets();
        }
        var filesToLoad = seedFromDirectory.GetMatchingFiles("*metadata.json").OrderBy(x => x);
        var creativeEntries = new List<Creative>();
        foreach (var file in filesToLoad)
        {
            var creative = File.ReadAllText(file).FromJson<Creative>();
            creative.Prompt = ConstructPrompt(creative.UserPrompt, creative.ModifierNames, creative.ArtistNames);
            creativeEntries.Add(creative);
        }

        foreach (var creative in creativeEntries)
        {
            creative.Id = 0;
            creative.Modifiers = [];
            creative.ModifierNames ??= [];
            creative.ArtistNames ??= [];
            var owner = Users.GetUserById(creative.CreatedBy);
            creative.OwnerId = owner.Id;
            creative.OwnerRef = owner.RefIdStr;

            var primaryArtifact = creative.PrimaryArtifactId != null
                ? creative.Artifacts.FirstOrDefault(x => x.Id == creative.PrimaryArtifactId)
                : null;

            // If PrimaryArtifactId doesn't refer to one of its Artifacts, unset it to avoid dupes
            if (primaryArtifact == null)
                creative.PrimaryArtifactId = null;

            var id = creative.Id = (int)Db.Insert(creative, selectIdentity: true);
            foreach (var text in creative.ModifierNames)
            {
                if (savedModifiers.TryGetValue(text, out var mod))
                {
                    Db.Insert(new CreativeModifier
                    {
                        ModifierId = mod,
                        CreativeId = id
                    });
                }
                else
                {
                    errors.Add($"{creative.Key} NotFound: Modifier {text}");
                }
            }

            foreach (var artistName in creative.ArtistNames)
            {
                if (savedArtistIds.TryGetValue(artistName.Trim(), out var artist))
                {
                    Db.Insert(new CreativeArtist
                    {
                        ArtistId = artist,
                        CreativeId = id
                    });
                }
                else
                {
                    errors.Add($"{creative.Key} NotFound: Artist {artistName}");
                }
            }

            foreach (var artifact in creative.Artifacts)
            {
                artifact.Id = 0;
                artifact.CreativeId = id;
                var filePath = $"./App_Data/{artifact.FilePath}";
                artifact.Id = (int)Db.Insert(artifact, selectIdentity: true);
                artifactRefIdsMap[artifact.RefId] = artifact.Id;

                if (artifact == primaryArtifact)
                {
                    creative.PrimaryArtifactId = artifact.Id;
                    Db.UpdateOnly(() => new Creative { PrimaryArtifactId = artifact.Id },
                        where: x => x.Id == creative.Id);
                }

                // Add ArtifactLikes
                var artifactLikeRefs = allArtifactLikeRefs.Where(x => x.RefId == artifact.RefId).ToList();
                if (artifactLikeRefs.Count > 0)
                {
                    foreach (var artifactLikeRef in artifactLikeRefs)
                    {
                        var artifactLike = X.Apply(artifactLikeRef.ConvertTo<ArtifactLike>(),
                            x => x.ArtifactId = artifact.Id);
                        artifactLike.AppUserId = Users.GetUserById(artifactLike.AppUserId).Id;
                        Db.Insert(artifactLike);
                    }
                }
            }
        }


        // Import Albums
        var albumRefs = File.ReadAllText(seedDir.CombineWith("albums.csv")).FromCsv<List<AlbumRef>>();
        var albumArtifactRefs = File.ReadAllText(seedDir.CombineWith("album-artifacts.csv"))
            .FromCsv<List<AlbumArtifactRef>>();
        var allAlbumLikeRefs =
            File.ReadAllText(seedDir.CombineWith("album-likes.csv")).FromCsv<List<AlbumLikeRef>>();
        foreach (var albumnRef in albumRefs)
        {
            var owner = Users.GetUserById(albumnRef.OwnerId);
            var album = new Album
            {
                RefId = albumnRef.RefId,
                OwnerId = owner.Id,
                OwnerRef = owner.RefIdStr,
                Name = albumnRef.Name,
                Slug = albumnRef.Name.GenerateSlug(),
                Description = albumnRef.Description,
                Tags = albumnRef.Tags,
            }.WithAudit(owner.Id);
            album.Id = (int)Db.Insert(album, selectIdentity: true);

            foreach (var x in albumArtifactRefs.Where(x => x.AlbumRefId == albumnRef.RefId))
            {
                if (artifactRefIdsMap.ContainsKey(x.ArtifactRefId))
                {
                    var albumArtifact = new AlbumArtifact
                    {
                        AlbumId = album.Id,
                        ArtifactId = artifactRefIdsMap[x.ArtifactRefId],
                        Description = x.Description,
                        CreatedDate = album.CreatedDate,
                    };
                    albumArtifact.Id = (int)Db.Insert(albumArtifact, selectIdentity: true);

                    if (albumnRef.PrimaryArtifactRef == x.ArtifactRefId)
                    {
                        album.PrimaryArtifactId = albumArtifact.ArtifactId;
                        Db.UpdateOnly(() => new Album { PrimaryArtifactId = album.PrimaryArtifactId },
                            where: x => x.Id == album.Id);
                    }
                }
            }

            // Add AlbumLikes
            var albumLikeRefs = allAlbumLikeRefs.Where(x => x.RefId == album.RefId).ToList();
            if (albumLikeRefs.Count > 0)
            {
                foreach (var albumLikeRef in albumLikeRefs)
                {
                    var albumLike = X.Apply(albumLikeRef.ConvertTo<AlbumLike>(), x => x.AlbumId = album.Id);
                    albumLike.AppUserId = Users.GetUserById(albumLike.AppUserId).Id;
                    Db.Insert(albumLike);
                }
            }
        }

        Console.WriteLine($"{nameof(Migration1001)} had {errors.Count} errors:");
        if (errors.Count > 0)
        {
            throw new Exception($"{nameof(Migration1001)} had {errors.Count} errors:\n"
                                + string.Join("\n", errors.Map(x => $"   {x}")));
        }
    }
    
    public static void FetchDemoAssets()
    {
        using var zipStream = "https://github.com/NetCoreApps/BlazorDiffusionAssets/archive/refs/heads/master.zip"
            .GetStreamFromUrl();
        var zipArchive = new ZipArchive(zipStream);
        var appFiles = new DirectoryInfo("./App_Data");
        foreach (var entry in zipArchive.Entries)
        {
            using var stream = entry.Open();
            var relPath = entry.FullName.SplitOnFirst("/")[1];
            var path = Path.Combine(appFiles.FullName, relPath);
            if (entry.Length == 0)
            {
                if(!Directory.Exists(path))
                    Directory.CreateDirectory(path); 
                continue;
            }
            File.WriteAllBytes(Path.Combine(appFiles.FullName,relPath), entry.Open().ReadFully());
        }
    }

    private string ConstructPrompt(string userPrompt, List<string> modifiers, List<string> artists)
    {
        var finalPrompt = userPrompt;
        finalPrompt += $", {modifiers.Select(x => x).Join(",").TrimEnd(',')}";
        var artistsSuffix = artists.Select(x => $"inspired by {x}").Join(",").TrimEnd(',');
        if (artists.Count > 0)
            finalPrompt += $", {artistsSuffix}";
        return finalPrompt;
    }

    public override void Down()
    {
        Db.DropTable<AlbumLike>();
        Db.DropTable<AlbumArtifact>();
        Db.DropTable<Album>();
        Db.DropTable<ArtifactLike>();
        Db.DropTable<ArtifactReport>();
        Db.DropTable<Artifact>();
        Db.DropTable<CreativeArtist>();
        Db.DropTable<CreativeModifier>();
        Db.DropTable<Creative>();
        Db.DropTable<Modifier>();
        Db.DropTable<Artist>();
    }
}
