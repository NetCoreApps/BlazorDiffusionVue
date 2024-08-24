﻿using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using BlazorDiffusion.ServiceModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.DataAnnotations;
using ServiceStack.IO;
using ServiceStack.OrmLite;
using ServiceStack.Text;

namespace BlazorDiffusion.ServiceInterface;

public class CreativeService(
    ILogger<CreativeService> log,
    IStableDiffusionClient stableDiffusion,
    AppConfig appConfig,
    AppUserQuotas userQuotas,
    UserManager<AppUser> userManager)
    : Service
{
    const int DefaultHeight = 1024;
    const int DefaultWidth = 1024;
    const int DefaultImages = 4;
    const int DefaultSteps = 4;

    const int DefaultModeratorImages = 5;
    const int DefaultModeratorSteps = 4;

    const int DefaultMaxWidth = 1344;
    const int DefaultMaxHeight = 1344;

    public async Task<object> Any(CheckQuota request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();
        var userRoles = session.Roles;
        var creative = new CreateCreative
        {
            Width = request.Width,
            Height = request.Height,
            Images = request.Images,
        };
        var imageGenerationRequest = CreateImageGenerationRequest(creative, new List<Modifier>(), new List<Artist>(), userRoles);
        var requestCredits = userQuotas.CalculateCredits(imageGenerationRequest);
        var startOfDay = DateTime.UtcNow.Date;
        var dailyQuota = userQuotas.GetDailyQuota(userRoles) ?? -1;
        var creditsUsed = await userQuotas.GetCreditsUsedAsync(Db, userId, since: DateTime.UtcNow.Date);

        return new CheckQuotaResponse
        {
            TimeRemaining = startOfDay.AddDays(1) - DateTime.UtcNow,
            CreditsUsed = creditsUsed,
            CreditsRequested = requestCredits,
            DailyQuota = dailyQuota,
            CreditsRemaining = dailyQuota == -1 ? -1 : dailyQuota - creditsUsed,
            RequestedDetails = userQuotas.ToRequestDetails(imageGenerationRequest),
        };
    }

    public async Task<object> Post(CreateCreativeCallback request)
    {
        if (request.Outputs == null || !request.Outputs.Any())
            throw new ArgumentException("No outputs provided");
        
        // Deserialize base64 json string to CreateCreative
        var bytes = Convert.FromBase64String(request.State);
        var json = Encoding.UTF8.GetString(bytes);
        var createCreative = json.FromJson<CreateCreative>();
        
        var modifiers = await Db.SelectAsync<Modifier>(x => Sql.In(x.Id, createCreative.ModifierIds));
        var artists = createCreative.ArtistIds.Count == 0 ? new List<Artist>() :
            await Db.SelectAsync<Artist>(x => Sql.In(x.Id, createCreative.ArtistIds));

        var now = DateTime.UtcNow;
        var response = new ImageGenerationResponse
        {
            RequestId = request.RefId,
            EngineId = "comfy",
            Key = $"{now:yyyy/MM/dd}/{(long)now.TimeOfDay.TotalMilliseconds}",
            Results = new(),
        };
        foreach(var item in request.Outputs)
        {
            var variant = createCreative.Height > createCreative.Width ? "height" : "width";
            response.Results.Add(new() {
                Prompt = createCreative.UserPrompt,
                AnswerId = request.RefId,
                FilePath = item.Url,
                FileName = item.FileName,
                Width = (int)createCreative.Width!,
                Height = (int)createCreative.Height!,
                FilePathSmall = $"/variants/{variant}=118".CombineWith(item.Url.RightPart("/artifacts")),
                FilePathMedium = $"/variants/{variant}=288".CombineWith(item.Url.RightPart("/artifacts")),
                FilePathLarge = item.Url,
                // No longer have the bytes here, can look at updating info in bg job
                // ContentLength = bytes.Length,
                // ImageDetails = imageDetails,
            });
        }
        
        var creativeQueue = await Db.SingleAsync<CreativeQueue>(x => x.RefId == request.RefId);
        Creative? creative = null;
        if (creativeQueue == null)
        {
            // Already processed
            log?.LogWarning("CreativeQueue not found for RefId (likely duplicate): {RefId}", request.RefId);
            // Find existing Creative
            creative = await Db.SingleAsync<Creative>(x => x.RefId == request.RefId);
            if (creative == null)
            {
                log?.LogError("Creative and CreativeQueue not found for RefId: {RefId}", request.RefId);
                throw HttpError.NotFound("Creative not found");
            }
            return new CreateCreativeResponse { Result = creative };
        }
        
        var creativeId = await PersistCreative(createCreative, 
            response, 
            modifiers, 
            artists,
            creativeQueue.UserId,
            creativeQueue.RefId);
    
        creative = await Db.LoadSingleByIdAsync<Creative>(creativeId);
    
        PublishMessage(new BackgroundTasks { NewCreative = creative });
    
        return new CreateCreativeResponse { Result = creative };
    }
    
    public async Task<object> Post(QueueCreative request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();
        var userAuth = await userManager.FindByIdAsync(session.UserAuthId);
        if (userAuth == null)
            throw HttpError.Unauthorized("Not Authorized");

        var requestLower = request.UserPrompt.ToLower();
        foreach (var banWord in AppConfig.Instance.BanWords)
        {
            if (requestLower.Contains(banWord))
            {
                await userManager.SetLockoutEnabledAsync(userAuth, true);
                await userManager.SetLockoutEndDateAsync(userAuth, DateTime.UtcNow.AddYears(1));
                break;
            }
        }
        if (userAuth.LockoutEnd > DateTime.UtcNow)
        {
            throw HttpError.Forbidden("Account is locked");
        }

        var userRoles = await session.GetRolesAsync(AuthRepositoryAsync);

        var modifiers = await Db.SelectAsync<Modifier>(x => Sql.In(x.Id, request.ModifierIds));
        var artists = request.ArtistIds.Count == 0 ? new List<Artist>() :
            await Db.SelectAsync<Artist>(x => Sql.In(x.Id, request.ArtistIds));

        var imageGenerationRequest = CreateImageGenerationRequest(request.ConvertTo<CreateCreative>(), modifiers, artists, userRoles);

        var quotaError = await userQuotas.ValidateQuotaAsync(Db, imageGenerationRequest, userId, userRoles);
        if (quotaError != null)
        {
            log.LogInformation("User #{Id} {UserName} exceeded quota, credits: {CreditsUsed} + {CreditsRequested} > {DailyQuota}, time remaining: {TimeRemaining}",
                session.UserAuthId, session.UserAuthName, quotaError.CreditsUsed,
                quotaError.CreditsRequested, quotaError.DailyQuota, quotaError.TimeRemaining);

            return quotaError.ToHttpError(quotaError.ToResponseStatus());
        }

        var queueReq = new QueueImageGeneration
        {
            ImageGeneration = imageGenerationRequest,
            State = Convert.ToBase64String(request.ToJson().ToUtf8Bytes())
        };
        var queueImageGenerationResponse = await stableDiffusion.QueueGenerateImageAsync(queueReq);
        Db.Insert(new CreativeQueue
        {
            RefId = queueImageGenerationResponse.RefId,
            UserId = userId
        });
        return queueImageGenerationResponse;
    }

    public async Task<object> Post(CreateCreative request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();
        var userAuth = await userManager.FindByIdAsync(session.UserAuthId);
        if (userAuth == null)
            throw HttpError.Unauthorized("Not Authorized");

        var requestLower = request.UserPrompt.ToLower();
        foreach (var banWord in AppConfig.Instance.BanWords)
        {
            if (requestLower.Contains(banWord))
            {
                await userManager.SetLockoutEnabledAsync(userAuth, true);
                await userManager.SetLockoutEndDateAsync(userAuth, DateTime.UtcNow.AddYears(1));
                break;
            }
        }
        if (userAuth.LockoutEnd > DateTime.UtcNow)
        {
            throw HttpError.Forbidden("Account is locked");
        }

        var userRoles = await session.GetRolesAsync(AuthRepositoryAsync);

        var modifiers = await Db.SelectAsync<Modifier>(x => Sql.In(x.Id, request.ModifierIds));
        var artists = request.ArtistIds.Count == 0 ? new List<Artist>() :
            await Db.SelectAsync<Artist>(x => Sql.In(x.Id, request.ArtistIds));

        var imageGenerationRequest = CreateImageGenerationRequest(request, modifiers, artists, userRoles);

        var quotaError = await userQuotas.ValidateQuotaAsync(Db, imageGenerationRequest, userId, userRoles);
        if (quotaError != null)
        {
            log.LogInformation("User #{Id} {UserName} exceeded quota, credits: {CreditsUsed} + {CreditsRequested} > {DailyQuota}, time remaining: {TimeRemaining}",
                session.UserAuthId, session.UserAuthName, quotaError.CreditsUsed,
                quotaError.CreditsRequested, quotaError.DailyQuota, quotaError.TimeRemaining);

            return quotaError.ToHttpError(quotaError.ToResponseStatus());
        }

        var queueReq = new QueueImageGeneration
        {
            ImageGeneration = imageGenerationRequest,
            State = Convert.ToBase64String(request.ToJson().ToUtf8Bytes())
        };
        var imageGenerationResponse = await stableDiffusion.QueueGenerateImageAsync(queueReq);
        Db.Insert(new CreativeQueue
        {
            RefId = imageGenerationResponse.RefId,
            UserId = userId
        });
        // Poll for completion
        var refId = imageGenerationResponse.RefId;

        Creative? creative = null;
        var timeout = DateTime.UtcNow.AddSeconds(120);
        while (DateTime.UtcNow < timeout)
        {
            creative = await Db.SingleAsync<Creative>(x => x.RefId == refId);
            if (creative != null)
            {
                break;
            }
            await Task.Delay(1000);
        }
        
        if(creative == null)
            throw new HttpError(HttpStatusCode.BadRequest,"Request timed out waiting for Creative. Your Creative might be delayed, please check back later.");
        
        PublishMessage(new BackgroundTasks { NewCreative = creative });

        return new CreateCreativeResponse { Result = creative };
    }
    
    public async Task<object> Patch(UpdateCreative request)
    {
        var creative = await Db.LoadSingleByIdAsync<Creative>(request.Id);
        if (creative == null)
            return HttpError.NotFound("Creative not found");

        var session = await GetSessionAsync();
        if (!await session.IsOwnerOrModerator(creative.OwnerId))
            return HttpError.Forbidden("You don't own this Creative");

        var artifactId = request.UnpinPrimaryArtifact == true
            ? null
            : request.PrimaryArtifactId;

        if (artifactId != null)
        {
            var artifact = creative.Artifacts.SingleOrDefault(x => x.Id == request.PrimaryArtifactId);
            if (artifact == null)
                throw HttpError.NotFound($"Artifact not found");
        }

        await Db.UpdateOnlyAsync(() => 
            new Creative { 
                PrimaryArtifactId = artifactId,
                ModifiedBy = session.UserAuthId,
                ModifiedDate = DateTime.UtcNow,
            }, where:x => x.Id == request.Id);

        Updated.CreativeIds.Add(creative.Id);
        
        PublishMessage(new BackgroundTasks {
            RecordPrimaryArtifact = new() {
                CreativeId = creative.Id,
                FromArtifactId = creative.PrimaryArtifactId,
                ToArtifactId = artifactId,
            },
        });

        creative.PrimaryArtifactId = artifactId;
        return creative;
    }

    public async Task<object> Patch(UpdateArtifact request)
    {
        var artifact = await Db.SingleByIdAsync<Artifact>(request.Id);
        if (artifact == null)
            return HttpError.NotFound("Artifact not found");

        var creative = await Db.SingleByIdAsync<Creative>(artifact.CreativeId);
        if (creative == null)
            return HttpError.NotFound("Creative not found");

        var session = await GetSessionAsync();
        if (!await session.IsOwnerOrModerator(creative.OwnerId))
            return HttpError.Forbidden("You don't own this Creative");

        if (request.Nsfw != null)
        {
            await Db.UpdateOnlyAsync(() => new Artifact {
                Nsfw = request.Nsfw,
                ModifiedBy = session.UserAuthId,
                ModifiedDate = DateTime.UtcNow,
            }, where: x => x.Id == request.Id);
            artifact.Nsfw = request.Nsfw;
        }
        if (request.Quality != null)
        {
            await Db.UpdateOnlyAsync(() => new Artifact {
                Quality = request.Quality.Value,
                ModifiedBy = session.UserAuthId,
                ModifiedDate = DateTime.UtcNow,
            }, where: x => x.Id == request.Id);
            artifact.Quality = request.Quality.Value;
        }

        Updated.CreativeIds.Add(creative.Id);

        return artifact;
    }

    private async Task<int> PersistCreative(CreateCreative request,
        ImageGenerationResponse imageGenerationResponse,
        List<Modifier> modifiers,
        List<Artist> artists,
        int callbackUserId = 0,
        string? refId = null)
    {
        request.UserPrompt = request.UserPrompt.Trim();
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();
        if(userId == 0)
            userId = callbackUserId;
        if(userId == 0)
            throw HttpError.Unauthorized("Not Authorized");
        var now = DateTime.UtcNow;
        var creative = request.ConvertTo<Creative>()
            .WithAudit(session.UserAuthId, now);
        creative.Width = request.Width ?? DefaultWidth;
        creative.Height = request.Height ?? DefaultHeight;
        creative.Steps = request.Steps ?? DefaultSteps;
        creative.OwnerId = userId;
        creative.OwnerRef = Db.GetUserRef(userId);
        creative.Key = imageGenerationResponse.Key;
        creative.ArtistNames = artists.Select(x => x.GetArtistName()).ToList();
        creative.ModifierNames = modifiers.Select(x => x.Name).ToList();
        creative.Prompt = request.UserPrompt.ConstructPrompt(modifiers, artists);
        creative.RefId = refId ?? Guid.NewGuid().ToString("D");

        using var db = HostContext.AppHost.GetDbConnection();
        using var transaction = db.OpenTransaction();
        await db.SaveAsync(creative);
        
        var creativeArtists = request.ArtistIds.Select(x => new CreativeArtist {
            ArtistId = x,
            CreativeId = creative.Id
        });
        var creativeModifiers = request.ModifierIds.Select(x => new CreativeModifier {
            CreativeId = creative.Id,
            ModifierId = x
        });
        
        await db.InsertAllAsync(creativeArtists);
        await db.InsertAllAsync(creativeModifiers);

        var artifacts = imageGenerationResponse.Results.Select(x => new Artifact {
            CreativeId = creative.Id,
            Width = x.Width,
            Height = x.Height,
            Prompt = x.Prompt,
            Seed = x.Seed,
            FileName = x.FileName,
            FilePath = x.FilePath,
            FilePathSmall = x.FilePathSmall,
            FilePathMedium = x.FilePathMedium,
            FilePathLarge = x.FilePathLarge,
            ContentType = MimeTypes.ImagePng,
            ContentLength = x.ContentLength,
            RefId = Guid.NewGuid().ToString("D"),
        }.WithImageDetails(x.ImageDetails).WithAudit(session.UserAuthId, now));
        await db.InsertAllAsync(artifacts);
        transaction.Commit();

        return creative.Id;
    }

    public ImageGeneration CreateImageGenerationRequest(CreateCreative request, List<Modifier> modifiers, List<Artist> artists, ICollection<string> userRoles)
    {
        var adminOrMod = userRoles.Contains(AppRoles.Admin) || userRoles.Contains(AppRoles.Moderator);
        var apiPrompt = request.UserPrompt.ConstructPrompt(modifiers, artists);

        var maxHeight = adminOrMod
            ? request.Height ?? DefaultHeight
            : request.Height > request.Width
                ? DefaultMaxHeight
                : DefaultHeight;
        var maxWidth = adminOrMod
            ? request.Width ?? DefaultWidth
            : request.Width > request.Height
               ? DefaultMaxWidth
               : DefaultWidth;
        int height = Math.Min(request.Height ?? DefaultHeight, maxHeight);
        int width = Math.Min(request.Width ?? DefaultWidth, maxWidth);
        int noOfImages = request.Images ?? (adminOrMod ? DefaultModeratorImages : DefaultImages);
        int noOfSteps = request.Steps ?? (adminOrMod ? DefaultModeratorSteps : DefaultSteps);

        var to = new ImageGeneration
        {
            Prompt = apiPrompt,
            Engine = request.EngineId,
            Height = height,
            Width = width,
            Images = noOfImages,
            Steps = noOfSteps,
            Seed = request.Seed
        };

        if (log.IsEnabled(LogLevel.Debug)) log.LogDebug("ImageGeneration {ImageGeneration}", to.Dump());

        return to;
    }


    private async Task<ImageGenerationResponse> GenerateImage(ImageGeneration request)
    {

        try
        {
            return await stableDiffusion.GenerateImageAsync(request);
        }
        catch (Exception e)
        {
            log.LogError(e, "Failed to generate image: {Message}", e.Message);
            throw HttpError.ServiceUnavailable($"Failed to generate image: {e.Message}");
        }
    }
    
    public async Task<object> Get(ResizedArtifact request)
    {
        var artifact = Db.SingleById<Artifact>(request.ArtifactId);
        if (artifact == null)
            return HttpError.NotFound("Artifact does not exist");

        if (request.Size == ArtifactSize.Original)
            return HttpResult.Redirect(appConfig.AssetsBasePath.CombineWith(artifact.FilePath));
        if (request.Size == ArtifactSize.Small && artifact.FilePathSmall != null)
            return HttpResult.Redirect(appConfig.AssetsBasePath.CombineWith(artifact.FilePathSmall));
        if (request.Size == ArtifactSize.Medium && artifact.FilePathMedium != null)
            return HttpResult.Redirect(appConfig.AssetsBasePath.CombineWith(artifact.FilePathMedium));
        if (request.Size == ArtifactSize.Large && artifact.FilePathLarge != null)
            return HttpResult.Redirect(appConfig.AssetsBasePath.CombineWith(artifact.FilePathLarge));

        await VirtualFiles.ResizeArtifactsAsync(artifact);

        await Db.UpdateOnlyAsync(() => new Artifact
        {
            FilePathSmall = artifact.FilePathSmall!,
            FilePathMedium = artifact.FilePathMedium!,
            FilePathLarge = artifact.FilePathLarge!,
        }, where: x => x.Id == artifact.Id);

        if (request.Size == ArtifactSize.Small)
            return HttpResult.Redirect(appConfig.AssetsBasePath.CombineWith(artifact.FilePathSmall));
        if (request.Size == ArtifactSize.Medium)
            return HttpResult.Redirect(appConfig.AssetsBasePath.CombineWith(artifact.FilePathMedium));
        if (request.Size == ArtifactSize.Large)
            return HttpResult.Redirect(appConfig.AssetsBasePath.CombineWith(artifact.FilePathLarge));

        return HttpResult.Redirect(appConfig.AssetsBasePath.CombineWith(artifact.FilePath));
    }

    public async Task Delete(DeleteCreative request)
    {
        var creative = await Db.SingleByIdAsync<Creative>(request.Id);
        if (creative == null)
            return;

        var session = await GetSessionAsync();
        if (!await session.IsOwnerOrModerator(creative.OwnerId))
            throw HttpError.Forbidden($"You don't own this Creative {session.UserAuthId} vs {creative.OwnerId}");

        var now = DateTime.UtcNow;
        // transfer to system user
        await Db.UpdateOnlyAsync(() =>
            new Creative {
                OwnerId = Users.System.Id, 
                OwnerRef = Users.System.RefIdStr,
                ModifiedBy = session.UserAuthId,
                ModifiedDate = now,
                DeletedBy = session.UserAuthId,
                DeletedDate = now,
            }, where: x => x.Id == request.Id);

        Updated.CreativeIds.Add(creative.Id);
    }

    public void Delete(HardDeleteCreative request)
    {
        var creative = Db.SingleById<Creative>(request.Id);
        if (creative == null)
            throw HttpError.NotFound($"Creative {request.Id} does not exist");

        var artifacts = Db.Select<Artifact>(x => x.CreativeId == request.Id);
        var artifactIds = artifacts.Select(x => x.Id).ToSet();

        using var transaction = Db.OpenTransaction();

        Db.Delete<AlbumArtifact>(x => artifactIds.Contains(x.ArtifactId));
        Db.Delete<ArtifactReport>(x => artifactIds.Contains(x.ArtifactId));
        Db.Delete<ArtifactLike>(x => artifactIds.Contains(x.ArtifactId));
        Db.Delete<Artifact>(x => x.CreativeId == request.Id);
        Db.Delete<CreativeArtist>(x => x.CreativeId == request.Id);
        Db.Delete<CreativeModifier>(x => x.CreativeId == request.Id);
        Db.Delete<Creative>(x => x.Id == request.Id);
        Db.Delete<ArtifactFts>(x => x.CreativeId == request.Id);

        transaction.Commit();

        // await stableDiffusion.DeleteFolderAsync(creative);

        using var analyticsDb = OpenDbConnection(Databases.Analytics);
        analyticsDb.Delete<ArtifactStat>(x => artifactIds.Contains(x.ArtifactId));
        analyticsDb.Delete<SearchStat>(x => x.ArtifactId != null && artifactIds.Contains(x.ArtifactId.Value));
    }

    public object Any(DeleteCdnFilesMq request)
    {
        var msg = new DiskTasks
        {
            CdnDeleteFiles = request.Files
        };
        PublishMessage(msg);
        return msg;
    }

    public void Any(DeleteCdnFile request)
    {
        VirtualFiles.DeleteFile(request.File);
    }

    public object Any(GetCdnFile request)
    {
        var file = VirtualFiles.GetFile(request.File);
        if (file == null)
            throw new FileNotFoundException(request.File);
        return new HttpResult(file);
    }

    public async Task<object> Any(GetCreative request)
    {
        var creativeId = request.Id
            ?? await Db.ScalarAsync<int?>(Db.From<Artifact>().Where(x => x.Id == request.ArtifactId).Select(x => x.CreativeId));

        var creative = creativeId != null
            ? await Db.LoadSingleByIdAsync<Creative>(creativeId)
            : null;

        if (creative == null)
            throw HttpError.NotFound("Creative does not exist");

        return new GetCreativeResponse
        {
            Result = creative
        };
    }
}

public class QueueCreative
{
    [Required]
    public string UserPrompt { get; set; }
    
    public int? Images { get; set; }
    
    public int? Width { get; set; }
    
    public int? Height { get; set; }
    
    public int? Steps { get; set; }
    public long? Seed { get; set; }
    
    public string? EngineId { get; set; }
    
    public List<int> ArtistIds { get; set; }
    public List<int> ModifierIds { get; set; }
}

public class QueueCreativeResponse
{
    public string? RefId { get; set; }
}

[Route("/creatives/callback", "POST")]
public class CreateCreativeCallback : IReturn<CreateCreativeCallbackResponse>
{
    /// <summary>
    /// Reference passed from original request
    /// </summary>
    public string RefId { get; set; }
    
    /// <summary>
    /// CreateCreative base64 encoded JSON
    /// </summary>
    public string State { get; set; }
    public List<DiffusionApiProviderOutput> Outputs { get; set; }
}
public class DiffusionApiProviderOutput
{
    public string FileName { get; set; }
    public string Url { get; set; }
}

public class CreateCreativeCallbackResponse
{
    
}

public static class CreateServiceUtils
{
    public static async Task<bool> IsOwnerOrModerator(this Service service, int? userId) => 
        await (await service.GetSessionAsync()).IsOwnerOrModerator(userId);

    public static Task<bool> IsOwnerOrModerator(this IAuthSession session, int? ownerId)
    {
        var roles = session.Roles.Safe();
        if (!roles.Contains(AppRoles.Admin) && !roles.Contains(AppRoles.Moderator))
        {
            return Task.FromResult(ownerId != null && ownerId.ToString() == session.UserAuthId);
        }
        return Task.FromResult(true);
    }

    public static async Task<Creative> SaveCreativeAsync(this IDbConnection db, int creativeId, IStableDiffusionClient client)
    {
        var creative = await db.LoadSingleByIdAsync<Creative>(creativeId);
        return await client.SaveCreativeAsync(creative);
    }

    public static async Task<Creative> SaveCreativeAsync(this IStableDiffusionClient client, Creative creative)
    {
        await client.SaveMetadataAsync(creative);
        return creative;
    }

}

public interface IStableDiffusionClient
{
    Task<ImageGenerationResponse> GenerateImageAsync(ImageGeneration request);
    Task<QueueImageGenerationResponse> QueueGenerateImageAsync(QueueImageGeneration request);
    Task<ImageGenerationResponse> GetQueueResult(string refId);
    IVirtualFile? GetMetadataFile(Creative creative);
    Task SaveMetadataAsync(Creative entry);
    Task DeleteFolderAsync(Creative entry);
}

public class ImageGeneration
{
    public string? Engine { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public int Images { get; set; }
    public long? Seed { get; set; }
    public string Prompt { get; set; }
    public int Steps { get; set; }
}

public struct ImageSize
{
    public ImageSize(int width, int height)
    {
        Width = width;
        Height = height;
    }
    
    public int Width { get; set; }
    public int Height { get; set; }
}

public class ImageGenerationResponse
{
    public string RequestId { get; set; }
    public string EngineId { get; set; }
    public List<ImageGenerationResult> Results { get; set; }
    public string Key { get; set; }
    public string Error { get; set; }
}

public class ImageGenerationResult
{
    public string FilePath { get; set; }
    public string? FilePathSmall { get; set; }
    public string? FilePathMedium { get; set; }
    public string? FilePathLarge { get; set; }
    public string AnswerId { get; set; }
    public uint Seed { get; set; }
    public string Prompt { get; set; }
    public string FileName { get; set; }
    public long ContentLength { get; set; }
    public int Width { get; set; }
    public int Height { get; set; }
    public ImageDetails? ImageDetails { get; set; }
}

public class QueueImageGeneration : IReturn<QueueImageGenerationResponse>
{
    public ImageGeneration ImageGeneration { get; set; }
    public string State { get; set; }
}

public class QueueImageGenerationResponse
{
    public string RefId { get; set; }
}

public class PrerenderView
{
    public string ViewPath { get; set; }
    public string WritePath { get; set; }
    public Func<PageModel>? PageModelFactory { get; set; }
}

public class PrerenderPage
{
    public Type Component { get; set; }
    public Dictionary<string, object> ComponentArgs { get; set; }
    public string WritePath { get; set; }
    public Func<string, string>? Transformer { get; set; }

    public PrerenderPage(Type component, string writePath, Dictionary<string, object>? componentArgs = null, Func<string, string>? transformer = null)
    {
        Component = component;
        ComponentArgs = componentArgs ?? new();
        WritePath = writePath;
        Transformer = transformer;
    }
}
