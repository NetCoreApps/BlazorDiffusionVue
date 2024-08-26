using ServiceStack;
using BlazorDiffusion.ServiceModel;
using System.Threading.Tasks;
using ServiceStack.OrmLite;
using System;
using System.Linq;
using BlazorDiffusion.ServiceInterface.AiServer;
using ServiceStack.Text;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;

namespace BlazorDiffusion.ServiceInterface;

public class MyServices(AiServerClient aiClient) : Service
{
    public object Any(GetUserProfile request)
    {
        var userId = Request.GetRequiredUserId();
        var userProfile = Db.GetUserProfile(userId);
        return new GetUserProfileResponse {
            Result = userProfile
        };
    }

    public async Task<object> Any(UpdateUserProfile request)
    {
        var userId = Request.GetRequiredUserId();
        var userInfo = Db.Single<UserProfile>(Db.From<AppUser>()
            .Where(x => x.Id == userId));

        if (string.IsNullOrWhiteSpace(request.Handle))
            request.Handle = null;
        if (string.IsNullOrWhiteSpace(request.Avatar))
            request.Avatar = null;

        if (request.Handle != null && !request.Handle.IsValidVarName())
            throw new ArgumentException("Invalid chars in Handle", nameof(request.Handle));

        if (request.Handle != null && Db.Exists<AppUser>(x => x.Handle == request.Handle && x.Id != userId))
            throw new ArgumentException("Handle already taken", nameof(request.Handle));

        var file = Request.Files.FirstOrDefault();
        if (file != null)
        {
            var imageStream = file.InputStream;
            var ms = MemoryStreamFactory.GetStream((int)file.ContentLength);
            var ext = file.FileName.LastRightPart('.');
            if (ext != "webp")
            {
                var image = await Image.LoadAsync(imageStream);
                await image.SaveAsWebpAsync(ms, new WebpEncoder { Quality = 80 });
                await imageStream.DisposeAsync();
                ms.Position = 0;
                imageStream = ms;
                ext = "webp";
            }
            
            var fileName = $"/avatars/{userId.ToString()}.{ext}";
            var response = await aiClient.Client.PostFileWithRequestAsync<StoreFileUploadResponse>(imageStream, fileName, new StoreFileUpload {
                Name = "pub"
            });
            var publicPath = response.Results?.FirstOrDefault()
                ?? throw new Exception("File Upload Failed");
            var v = 0;
            if (userInfo.Avatar != null && userInfo.Avatar.Contains('?'))
            {
                var qs = PclExportClient.Instance.ParseQueryString(userInfo.Avatar);
                if (qs["v"] != null && int.TryParse(qs["v"], out var qsValue))
                    v = qsValue;
            }
            v += 1;
            var nextAvatar = "/variants/width=128".CombineWith(publicPath).AddQueryParam("v", v.ToString());
            request.Avatar = nextAvatar;
        }
        
        if (string.IsNullOrWhiteSpace(request.DisplayName))
            request.DisplayName = null;
        if (string.IsNullOrWhiteSpace(request.Handle))
            request.Handle = null;
        if (string.IsNullOrWhiteSpace(request.Avatar))
            request.Avatar = null;

        lock (Locks.AppDb)
        {
            Db.UpdateOnly(() => new AppUser {
                DisplayName = request.DisplayName ?? userInfo.DisplayName,
                Handle = request.Handle,
                Avatar = request.Avatar ?? userInfo.Avatar,
            }, where: x => x.Id == userId);
        }

        return new UserProfile {
            DisplayName = request.DisplayName ?? userInfo.DisplayName,
            Handle = request.Handle,
            Avatar = request.Avatar ?? userInfo.Avatar,
        };
    }
}
