using System.Data;
using System.Linq;
using System.Threading.Tasks;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Hosting;
using ServiceStack;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface;

public static class DbExtensions
{
    public static async Task<UserProfile> GetUserProfileAsync(this IDbConnection db, int userId) => 
        await db.SingleAsync<UserProfile>(db.From<AppUser>().Where(x => x.Id == userId));

    public static async Task<UserResult> GetUserResultAsync(this IDbConnection db, int userId)
    {
        var likes = new Likes
        {
            ArtifactIds = await db.ColumnAsync<int>(db.From<ArtifactLike>().Where(x => x.AppUserId == userId).Select(x => x.ArtifactId).OrderByDescending(x => x.Id)),
            AlbumIds = await db.ColumnAsync<int>(db.From<AlbumLike>().Where(x => x.AppUserId == userId).Select(x => x.AlbumId).OrderByDescending(x => x.Id)),
        };

        var userAlbums = await db.LoadSelectAsync<Album>(x => x.OwnerId == userId && x.DeletedDate == null);
        var albums = userAlbums.OrderByDescending(x => x.Artifacts.Max(x => x.Id)).ToList();
        var albumResults = albums.Map(x => x.ToAlbumResult());

        var userInfo = await db.SingleAsync<(string refId, string handle, string avatar, string profileUrl)>(db.From<AppUser>()
            .Where(x => x.Id == userId).Select(x => new { x.RefIdStr, x.Handle, x.Avatar, x.ProfileUrl }));

        return new UserResult
        {
            RefId = userInfo.refId,
            Handle = userInfo.handle,
            Avatar = userInfo.avatar,
            ProfileUrl = userInfo.profileUrl,
            Likes = likes,
            Albums = albumResults,
        };
    }

    public static string GetUserRef(this IDbConnection db, int userId)
    {
        if (AppData.Instance.UserRefMap.TryGetValue(userId, out var userRef))
            return userRef;

        userRef = db.Single<string>(db.From<AppUser>().Where(x => x.Id == userId).Select(x => x.RefIdStr));
        if (userRef == null)
            throw HttpError.NotFound($"User {userId} does not exist");

        AppData.Instance.UserRefMap[userId] = userRef;
        return userRef;
    }

    public static async Task LoadAppDataAsync(this IDbConnection db, AppData appData)
    {
        appData.AlbumRefs = await db.GetAlbumRefsAsync();
        appData.UserRefMap = await db.DictionaryAsync<int, string>(db.From<AppUser>().Select(x => new { x.Id, x.RefIdStr }));
        appData.TotalArtifacts = await db.CountAsync<Artifact>();
    }
}
