using System.Data;
using Funq;
using ServiceStack.IO;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Configuration;
using Amazon.S3;
using BlazorDiffusion.ServiceInterface;
using BlazorDiffusion.ServiceModel;

[assembly: HostingStartup(typeof(BlazorDiffusion.AppHost))]

namespace BlazorDiffusion;

public class AppHost : AppHostBase, IHostingStartup
{
    public AppHost() : base("Blazor Diffusion", typeof(MyServices).Assembly) { }

    public const string LocalBaseUrl = "https://localhost:5001";

    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            services.ConfigureNonBreakingSameSiteCookies(context.HostingEnvironment);
            services.AddSingleton(AppData.Instance);
            services.AddSingleton<AppUserQuotas>();

            //Plugins.Add(new ProfilingFeature());
            var baseUrl = Environment.GetEnvironmentVariable("VIRTUAL_HOST");
            baseUrl = !string.IsNullOrEmpty(baseUrl)
                ? $"https://{baseUrl}"
                : LocalBaseUrl;

            var apiUrl = Environment.GetEnvironmentVariable("DEPLOY_API");
            apiUrl = !string.IsNullOrEmpty(apiUrl)
                ? $"https://{apiUrl}"
                : null;

            // set in launchSettings.json
            var r2AccessId = Environment.GetEnvironmentVariable("R2_ACCESS_KEY_ID")!;
            var r2AccessKey = Environment.GetEnvironmentVariable("R2_SECRET_ACCESS_KEY")!;

            var appConfig = AppConfig.Set(new AppConfig
            {
                BaseUrl = baseUrl,
                ApiBaseUrl = apiUrl ?? baseUrl,
                WwwBaseUrl = baseUrl,
                CdnBaseUrl = baseUrl,
                R2Account = "b95f38ca3a6ac31ea582cd624e6eb385",
                R2AccessId = r2AccessId,
                R2AccessKey = r2AccessKey,
                ArtifactBucket = "diffusion",
                CdnBucket = "diffusion-client",
                AssetsBasePath = r2AccessId != null ? "https://cdn.diffusion.works" : "/uploads",
                FallbackAssetsBasePath = r2AccessId != null ? "https://pub-97bba6b94a944260b10a6e7d4bf98053.r2.dev" : "/uploads",
                SyncTasksInterval = TimeSpan.FromMinutes(10),
            });
            services.AddSingleton(AppConfig.Instance);

            var s3Client = new AmazonS3Client(appConfig.R2AccessId, appConfig.R2AccessKey, new AmazonS3Config
            {
                ServiceURL = $"https://{appConfig.R2Account}.r2.cloudflarestorage.com"
            });
            services.AddSingleton(s3Client);
        });


    public override void Configure(Container container)
    {
        SetConfig(new HostConfig
        {
            AddRedirectParamsToQueryString = true,
            UseSameSiteCookies = false,
        });

        var appConfig = container.Resolve<AppConfig>();

        Plugins.Add(new CorsFeature(allowedHeaders: "Content-Type,Authorization",
            allowOriginWhitelist: new[]{
            "https://localhost:5002",
            "http://localhost:5000",
            "http://localhost:8080",
            "https://diffusion.works",
             appConfig.BaseUrl,
            "https://blazordiffusion.com",
            "https://www.blazordiffusion.com",
            "https://pub-e17dff5b2d09437a97efdbb7f6ee3701.r2.dev", // CDN diffusion-client public bucket
        }, allowCredentials: true));

        var hasR2 = !string.IsNullOrEmpty(appConfig.R2AccessId);
        if (!hasR2)
            Log.Warn($"Starting without R2 access.");

        var s3Client = container.Resolve<AmazonS3Client>();

        var appFs = VirtualFiles = hasR2 
            ? new R2VirtualFiles(s3Client, appConfig.ArtifactBucket) 
            : new FileSystemVirtualFiles(ContentRootDirectory.RealPath.CombineWith("App_Data").AssertDir());
        Plugins.Add(new FilesUploadFeature(
            new UploadLocation("artifacts", appFs,
                readAccessRole: RoleNames.AllowAnon,
                maxFileBytes: AppData.MaxArtifactSize),
            new UploadLocation("avatars", appFs, allowExtensions: FileExt.WebImages,
                // Use unique URL to invalidate CDN caches
                resolvePath: ctx =>
                {
                    using var db = GetDbConnection();
                    var q = db.From<AppUser>().Where(x => x.Id == ctx.Session.UserAuthId.ToInt()).Select(x => x.RefIdStr);
                    var userRef = db.Scalar<string>(q);
                    return $"/avatars/{userRef[..2]}/{userRef}/{ctx.FileName}";
                },
                maxFileBytes: AppData.MaxAvatarSize,
                transformFile: ImageUtils.TransformAvatarAsync)
            ));

        // Don't use public prefix if working locally
        Register<IStableDiffusionClient>(new DreamStudioClient
        {
            Log = container.Resolve<ILogger<DreamStudioClient>>(),
            ApiKey = Environment.GetEnvironmentVariable("DREAMAI_APIKEY") ?? "<your_api_key>",
            OutputPathPrefix = "artifacts",
            PublicPrefix = appConfig.AssetsBasePath,
            VirtualFiles = appFs
        });

        using var db = container.Resolve<IDbConnectionFactory>().Open();
        db.LoadAppDataAsync(AppData.Instance).Wait();

        ScriptContext.Args[nameof(AppData)] = AppData.Instance;
    }

    public override void OnStartupException(Exception ex)
    {
        base.OnStartupException(ex);
    }

    public static void RegisterKey() =>
        ServiceStack.Licensing.RegisterLicense("OSS BSD-3-Clause 2023 https://github.com/NetCoreApps/BlazorDiffusionVue DsTKwLQqs8eXjfszoK62cu4zpAEp5ZuDfXjq7majdXF5vsD38zzPG01aqShWv44m8sf/XUbqvVy1jTPV+2G4vZAsteVJ8b9U7JWoFzxfjHTBWAMuSXMdXs76J+RR0gBTK5UWu/xDQqpAEY4BroEMkXpp5ybsFcUjnIt0Wqg7NoA=");
}
