using ServiceStack.IO;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Configuration;
using Amazon.S3;
using BlazorDiffusion.AiServer;
using BlazorDiffusion.ServiceInterface;

[assembly: HostingStartup(typeof(BlazorDiffusion.AppHost))]

namespace BlazorDiffusion;

public class AppHost() : AppHostBase("Blazor Diffusion"), IHostingStartup
{
    const string LocalBaseUrl = "https://localhost:5001";

    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => {
            services.ConfigureNonBreakingSameSiteCookies(context.HostingEnvironment);
            services.AddSingleton(AppData.Instance);
            services.AddSingleton<AppUserQuotas>();

            var baseUrl = Environment.GetEnvironmentVariable("VIRTUAL_HOST");
            baseUrl = !string.IsNullOrEmpty(baseUrl)
                ? $"https://{baseUrl}"
                : LocalBaseUrl;

            var apiUrl = Environment.GetEnvironmentVariable("DEPLOY_API");
            apiUrl = !string.IsNullOrEmpty(apiUrl)
                ? $"https://{apiUrl}"
                : null;

            // set in launchSettings.json
            var r2AccessId = Environment.GetEnvironmentVariable("R2_ACCESS_KEY_ID");
            var r2AccessKey = Environment.GetEnvironmentVariable("R2_SECRET_ACCESS_KEY");

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
            services.AddSingleton(appConfig);

            var s3Client = new AmazonS3Client(appConfig.R2AccessId, appConfig.R2AccessKey, new AmazonS3Config
            {
                ServiceURL = $"https://{appConfig.R2Account}.r2.cloudflarestorage.com"
            });
            services.AddSingleton(s3Client);
            
        services.AddPlugin(new CorsFeature(allowedHeaders: "Content-Type,Authorization",
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
            Log.Warn("Starting without R2 access.");

        IVirtualFiles appFs = hasR2 
            ? new R2VirtualFiles(s3Client, appConfig.ArtifactBucket) 
            : new FileSystemVirtualFiles(context.HostingEnvironment.ContentRootPath.CombineWith("App_Data").AssertDir());
        services.AddSingleton(appFs);
        
        services.AddPlugin(new FilesUploadFeature(
            new UploadLocation("artifacts", appFs,
                readAccessRole: RoleNames.AllowAnon,
                maxFileBytes: AppData.MaxArtifactSize),
            new UploadLocation("avatars", appFs, allowExtensions: FileExt.WebImages,
                // Use unique URL to invalidate CDN caches
                resolvePath: ctx =>
                {
                    using var db = Instance.GetDbConnection();
                    var q = db.From<AppUser>().Where(x => x.Id == ctx.Session.UserAuthId.ToInt()).Select(x => x.RefIdStr);
                    var userRef = db.Scalar<string>(q);
                    return $"/avatars/{userRef[..2]}/{userRef}/{ctx.FileName}";
                },
                maxFileBytes: AppData.MaxAvatarSize,
                transformFile: ImageUtils.TransformAvatarAsync)
            ));
        
            // If development, ignore SSL
            if (context.HostingEnvironment.IsDevelopment())
            {
                HttpClientHandler? clientHandler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (message, certificate2, arg3, arg4) => true
                };
                HttpUtils.CreateClient = () => new HttpClient(clientHandler);
            }
        
            var aiServerClient = new JsonApiClient("https://localhost:5005/");
            // Ignore local SSL Errors
            aiServerClient = IgnoreSslValidation(aiServerClient);
            if(!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("AI_SERVER_APIKEY")))
                aiServerClient.BearerToken = Environment.GetEnvironmentVariable("AI_SERVER_APIKEY");

            services.AddSingleton<IStableDiffusionClient>(x => new AiServerClient
            {
                Client = aiServerClient,
                OutputPathPrefix = "artifacts",
                VirtualFiles = appFs,
                Logger = x.GetService<ILoggerFactory>().CreateLogger<AiServerClient>(),
                //PublicPrefix = appConfig.AssetsBasePath,
            });
        });

    private JsonApiClient IgnoreSslValidation(JsonApiClient client)
    {
        // Ignore local SSL Errors
        var handler = HttpUtils.HttpClientHandlerFactory();
        handler.ServerCertificateCustomValidationCallback = (httpRequestMessage, cert, cetChain, policyErrors) => true;
        var httpClient = new HttpClient(handler, disposeHandler:client.HttpMessageHandler == null) {
            BaseAddress = new Uri(client.BaseUri),
        };
        client = new JsonApiClient(httpClient);
        return client;
    }
    
    public override void Configure()
    {
        SetConfig(new HostConfig
        {
            AddRedirectParamsToQueryString = true,
            UseSameSiteCookies = false,
        });

        using var db = Resolve<IDbConnectionFactory>().Open();
        db.LoadAppDataAsync(AppData.Instance).Wait();

        ScriptContext.Args[nameof(AppData)] = AppData.Instance;
    }

    public override void OnStartupException(Exception ex)
    {
        base.OnStartupException(ex);
    }

    public static void RegisterKey() =>
        Licensing.RegisterLicense("OSS GPL-3.0 2024 https://github.com/NetCoreApps/BlazorDiffusionVue K0VsMikfSp8ZKaRhYB9deGsvqJW7L8liuUmg6wD6kDAWoXiVRN3nKZ+nWLzgBvsuxK1yJ2NlL2XEwo2Zmj+e/jPDbnzEBasPOJVAP4E3lIPye7KfqUVWICvwTn6kav5BNfcyLlG/MTX6HloKEqQijOV/Azrw5fACOeNh9mXUQ1o=");
}
