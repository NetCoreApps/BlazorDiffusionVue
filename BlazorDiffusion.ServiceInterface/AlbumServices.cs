using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BlazorDiffusion.ServiceInterface.App;
using ServiceStack;
using ServiceStack.OrmLite;
using BlazorDiffusion.ServiceModel;
using ServiceStack.Jobs;

namespace BlazorDiffusion.ServiceInterface;

public class AlbumServices(IBackgroundJobs jobs, ICrudEvents crudEvents) : Service
{
    public object Any(CreateAlbum request)
    {
        if (string.IsNullOrEmpty(request.Name))
            throw new ArgumentNullException(nameof(request.Name));

        var slug = request.Name.GenerateSlug();

        if (Db.Exists<Album>(x => x.Slug == slug))
            throw HttpError.Conflict("Album already exists");

        var userId = Request.GetRequiredUserId();

        var album = request.ConvertTo<Album>();
        album.OwnerId = userId;
        album.OwnerRef = Db.GetUserRef(album.OwnerId);
        album.RefId = Guid.NewGuid().ToString("D");
        album.Slug = slug;
        album.WithAudit(userId);

        lock (Locks.AppDb)
        {
            album.Id = (int)Db.Insert(album, selectIdentity: true);
            
            if (request.ArtifactIds?.Count > 0)
            {
                var albumArtifacts = request.ArtifactIds.Map(x => new AlbumArtifact
                {
                    AlbumId = album.Id,
                    ArtifactId = x,
                    CreatedDate = album.CreatedDate,
                    ModifiedDate = album.ModifiedDate,
                });
                Db.InsertAll(albumArtifacts);
                album.Artifacts = albumArtifacts;
            }

            var crudContext = CrudContext.Create<Album>(Request, Db, request, AutoCrudOperation.Create);
            crudEvents.Record(crudContext);
        }

        return album;
    }

    public object Any(UpdateAlbum request)
    {
        var album = Db.LoadSingleById<Album>(request.Id);
        if (album == null)
            throw HttpError.NotFound("Album not found");

        if (!Request.IsOwnerOrModerator(album.OwnerId))
            throw HttpError.Forbidden("You don't own this Album");

        lock (Locks.AppDb)
        {
            using var trans = Db.OpenTransaction();
            var updateAlbum = request.Name != null || request.Description != null || request.Slug != null || request.Tags?.Count > 0;
            if (updateAlbum)
            {
                if (album.Name != null)
                {
                    album.Slug = album.Name.GenerateSlug();
                }
                album.PopulateWithNonDefaultValues(request).WithAudit(Request!);
                Db.UpdateNonDefaults(album, x => x.Id == album.Id);
            }

            if (request.RemoveArtifactIds?.Count > 0)
            {
                Db.Delete<AlbumArtifact>(x => x.AlbumId == album.Id && request.RemoveArtifactIds.Contains(x.ArtifactId));
                // Delete Album if it no longer contains any Artifacts
                if (!Db.Exists<AlbumArtifact>(x => x.AlbumId == album.Id))
                {
                    Db.DeleteById<Album>(album.Id);
                }
                else if (album.PrimaryArtifactId != null && request.RemoveArtifactIds.Contains(album.PrimaryArtifactId.Value))
                {
                    Db.UpdateOnly(() => new Album { PrimaryArtifactId = null }, where: x => x.Id == album.Id);
                }
                album.Artifacts.RemoveAll(x => request.RemoveArtifactIds.Contains(x.ArtifactId)); // required so they get added below
                request.RemoveArtifactIds.ForEach(Updated.ArtifactIds.Add); //rerender artifact .html
            }
            if (request.AddArtifactIds?.Count > 0)
            {
                var albumArtifacts = request.AddArtifactIds.Where(x => album.Artifacts.OrEmpty().All(a => a.ArtifactId != x))
                    .Map(x => new AlbumArtifact
                    {
                        AlbumId = album.Id,
                        ArtifactId = x,
                        CreatedDate = album.CreatedDate,
                        ModifiedDate = album.ModifiedDate,
                    });
                Db.InsertAll(albumArtifacts);
                request.AddArtifactIds.ForEach(Updated.ArtifactIds.Add); //rerender artifact .html
            }
            if (request.PrimaryArtifactId != null)
            {
                if (request.UnpinPrimaryArtifact != true)
                    Db.UpdateOnly(() => new Album { PrimaryArtifactId = request.PrimaryArtifactId }, where: x => x.Id == album.Id);
                else
                    Db.UpdateOnly(() => new Album { PrimaryArtifactId = null }, where: x => x.Id == album.Id);
            }

            if (updateAlbum)
            {
                var crudContext = CrudContext.Create<Album>(Request, Db, request, AutoCrudOperation.Patch);
                crudEvents.Record(crudContext);
            }

            trans.Commit();

            jobs.RunCommand<UpdateScoresCommand>(new UpdateScores {
                ArtifactIdsAddedToAlbums = request.AddArtifactIds,
                ArtifactIdsRemovedFromAlbums = request.RemoveArtifactIds,
            });
        }

        return album;
    }

    public async Task<object> Any(GetCreativesInAlbums request)
    {
        var creativeArtifactIds = Db.ColumnDistinct<int>(Db.From<Creative>()
            .Join<Artifact>((c, a) => c.Id == a.CreativeId && c.Id == request.CreativeId)
            .Select<Artifact>(a => a.Id));

        var q = Db.From<Album>()
            .Join<AlbumArtifact>()
            .Where<AlbumArtifact>(artifact => creativeArtifactIds.Contains(artifact.ArtifactId))
            .SelectDistinct<Album,AlbumArtifact>((album,artifact) => new {
                album.Id,
                album.Name,
                album.RefId,
                album.Slug,
                album.OwnerRef,
                album.PrimaryArtifactId,
                album.Score,
                artifact.ArtifactId,
            });

        var albumRefs = Db.Select<AlbumArtifactResult>(q);

        var albumMap = new Dictionary<int, AlbumResult>();
        foreach (var albumRef in albumRefs)
        {
            var album = albumMap.TryGetValue(albumRef.Id, out var existing)
                ? existing
                : albumMap[albumRef.Id] = new AlbumResult { 
                    Id = albumRef.Id,
                    Name = albumRef.Name,
                    Slug = albumRef.Slug,
                    AlbumRef = albumRef.RefId,
                    PrimaryArtifactId = albumRef.PrimaryArtifactId,
                    OwnerRef = albumRef.OwnerRef,
                    Score = albumRef.Score,
                    ArtifactIds = albumRef.PrimaryArtifactId != null 
                        ? [albumRef.PrimaryArtifactId.Value]
                        : [],
                };

            album.ArtifactIds.AddIfNotExists(albumRef.ArtifactId);
        }

        return new GetCreativesInAlbumsResponse
        {
            Results = albumMap.Values.OrderByDescending(x => x.Score).ThenByDescending(x => x.Id).Take(5).ToList(),
        };
    }

    public object Post(CreateAlbumLike request)
    {
        var userId = Request.GetRequiredUserId();
        var row = new AlbumLike
        {
            AppUserId = userId,
            AlbumId = request.AlbumId,
            CreatedDate = DateTime.UtcNow,
        };
        lock (Locks.AppDb)
        {
            row.Id = base.Db.Insert(row, selectIdentity: true);
        }

        jobs.RunCommand<UpdateScoresCommand>(new UpdateScores {
            RecordAlbumLikeId = request.AlbumId
        });
        return row;
    }

    public async Task Delete(DeleteAlbumLike request)
    {
        var userId = Request.GetRequiredUserId();
        lock (Locks.AppDb)
        {
            Db.Delete<AlbumLike>(x => x.AlbumId == request.AlbumId && x.AppUserId == userId);
        }

        jobs.RunCommand<UpdateScoresCommand>(new UpdateScores {
            RecordAlbumUnlikeId = request.AlbumId
        });
    }
}
