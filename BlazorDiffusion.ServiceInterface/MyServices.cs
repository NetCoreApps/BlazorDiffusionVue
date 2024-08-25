using ServiceStack;
using BlazorDiffusion.ServiceModel;
using System.Threading.Tasks;
using ServiceStack.OrmLite;
using System;
using System.Linq;
using BlazorDiffusion.ServiceInterface.AiServer;
using ServiceStack.Text;

namespace BlazorDiffusion.ServiceInterface;

public class MyServices(AiServerClient aiClient) : Service
{
    public async Task<object> Any(GetUserProfile request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userProfile = await Db.GetUserProfileAsync(session.UserAuthId.ToInt());
        return new GetUserProfileResponse {
            Result = userProfile
        };
    }

    public async Task<object> Any(UpdateUserProfile request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();

        var userInfo = await Db.SingleAsync<UserProfile>(Db.From<AppUser>()
            .Where(x => x.Id == userId));

        if (string.IsNullOrWhiteSpace(request.Handle))
            request.Handle = null;
        if (string.IsNullOrWhiteSpace(request.Avatar))
            request.Avatar = null;

        if (request.Handle != null && !request.Handle.IsValidVarName())
            throw new ArgumentException("Invalid chars in Handle", nameof(request.Handle));

        if (request.Handle != null && await Db.ExistsAsync<AppUser>(x => x.Handle == request.Handle && x.Id != userId))
            throw new ArgumentException("Handle already taken", nameof(request.Handle));

        var file = Request.Files.FirstOrDefault();
        if (file != null)
        {
            var fileName = $"/avatars/{userId.ToString()}.{file.FileName.LastRightPart('.')}";
            var response = aiClient.Client.PostFileWithRequest<StoreFileUploadResponse>(file.InputStream, fileName, new StoreFileUpload {
                Name = "pub"
            });
            var publicPath = response.Results?.FirstOrDefault()
                ?? throw new Exception("File Upload Failed");
            request.Avatar = "/variants/width=128".CombineWith(publicPath);
        }

        await Db.UpdateOnlyAsync(() => new AppUser {
            DisplayName = request.DisplayName ?? userInfo.DisplayName,
            Handle = request.Handle,
            Avatar = request.Avatar ?? userInfo.Avatar,
        }, where: x => x.Id == userId);

        return new UserProfile {
            DisplayName = request.DisplayName ?? userInfo.DisplayName,
            Handle = request.Handle,
            Avatar = request.Avatar ?? userInfo.Avatar,
        };
    }
}
