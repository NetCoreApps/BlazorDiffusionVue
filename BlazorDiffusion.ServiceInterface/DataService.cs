using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using ServiceStack;
using ServiceStack.OrmLite;
using BlazorDiffusion.ServiceModel;
using System;
using System.Data;
using ServiceStack.Data;

namespace BlazorDiffusion.ServiceInterface;

public class DataService(IDbConnectionFactory dbFactory) : Service
{
    public object Any(SearchData request)
    {
        var to = new SearchDataResponse
        {
            Artists = Db.Select<Artist>().OrderBy(x => x.Rank)
                .Select(x => new ArtistInfo
                {
                    Id = x.Id,
                    Name = x.FirstName != null ? $"{x.FirstName} {x.LastName}" : x.LastName,
                    Type = x.Type == null ? null : string.Join(", ", x.Type.Take(3)),
                }).ToList(),

            Modifiers = Db.Select<Modifier>().OrderBy(x => x.Rank)
                .Select(x => new ModifierInfo { Id = x.Id, Name = x.Name, Category = x.Category }).ToList(),
        };
        return to;
    }

    public object Any(GetUserInfo request)
    {
        var userId = Db.Scalar<int>(Db.From<AppUser>()
            .Where(x => x.RefIdStr == request.RefId).Select(x => x.Id));
        if (userId == default)
            return HttpError.NotFound("User not found");

        var result = X.Apply(Db.GetUserResult(userId), x => x.RefId = request.RefId);
        return new GetUserInfoResponse
        {
            Result = result,
        };
    }

    public async Task<object> Any(AnonData request)
    {
        var topAlbumResults = Db.Select(Db.From<Album>().Where(x => x.DeletedDate == null)
                .OrderByDescending(x => new { x.Score, x.Id }).Take(10))
            .Map(x => x.ToAlbumResult());

        return new AnonDataResponse
        {
            TopAlbums = topAlbumResults,
        };
    }

    public async Task<object> Any(GetAlbumIds request)
    {
        var topAlbumIds = await Db.ColumnAsync<int>(Db.From<Album>()
            .Where(x => x.DeletedDate == null)
            .OrderByDescending(x => new { x.Score, x.Id })
            .Take(1000)
            .Select(x => x.Id));

        return new GetAlbumIdsResponse
        {
            Results = topAlbumIds
        };
    }

    public object Any(GetAlbumRefs request)
    {
        var topAlbums = Db.GetAlbumRefs();
        return new GetAlbumRefsResponse {
            Results = topAlbums
        };
    }

    public object Any(UserData request)
    {
        var userId = Request.GetRequiredUserId();
        var roles = Request.GetClaimsPrincipal().GetRoles();
        var result = Db.GetUserResult(userId);
        var profile = Db.GetUserProfile(userId);

        using var dbAnalytics = dbFactory.OpenDbConnection(Databases.Analytics);
        var signupTypes = dbAnalytics.Column<SignupType>(Db.From<Signup>()
            .Where(x => x.AppUserId == userId && x.Type == SignupType.Beta && x.CancelledDate == null).Select(x => x.Type));

        return new UserDataResponse
        {
            User = result,
            Profile = profile,
            Signups = signupTypes,
            Roles = roles,
        };
    }

    public object Any(GetAlbumResults request)
    {
        var ids = request.Ids?.ToArray() ?? [];
        var refIds = request.RefIds?.ToArray() ?? [];

        var albums = Db.LoadSelect<Album>(x => x.DeletedDate == null && (ids.Contains(x.Id) || refIds.Contains(x.RefId)))
            .OrderByDescending(x => x.Artifacts?.Max(x => x.Id)).ToList();

        var albumResults = albums.Map(x => x.ToAlbumResult());

        return new GetAlbumResultsResponse
        {
            Results = albumResults,
        };
    }

    public object Any(CreateSignup request)
    {
        var userId = Request.GetUserId();
        using var dbAnalytics = dbFactory.OpenDbConnection(Databases.Analytics);

        lock (Locks.GetDbLock(Databases.Analytics))
        {
            // If already exists uncancel existing Signup and prevent duplicate registrations
            int existingSignups = userId != null
                ? dbAnalytics.UpdateOnly(() => new Signup { Email = request.Email, CancelledDate = null },
                    where: x => x.AppUserId == userId && x.Type == request.Type)
                : dbAnalytics.UpdateOnly(() => new Signup { CancelledDate = null },
                    where: x => x.Email == request.Email && x.Type == request.Type);

            if (existingSignups == 0)
            {
                dbAnalytics.Insert(new Signup {
                    Type = request.Type,
                    Name = request.Name, 
                    Email = request.Email,
                }
                .WithRequest(Request!));
            }
        }
        return new EmptyResponse();
    }
}

public static class DataServiceExtensions
{
    public static List<AlbumRef> GetAlbumRefs(this IDbConnection db)
    {
        return db.Select<AlbumRef>(db.From<Album>(db.TableAlias("a"))
            .Where(x => x.DeletedDate == null)
            .OrderByDescending(x => new { x.Score, x.Id })
            .Take(1000)
            .Select(x => new {
                x.RefId,
                x.OwnerId,
                x.Name,
                x.Slug,
                x.Description,
                x.Tags,
                ArtifactsCount = Sql.Custom<int>("(SELECT COUNT(*) FROM AlbumArtifact WHERE AlbumId = a.Id)")
            }));
    }
}