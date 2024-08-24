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

            context.Configuration.GetSection(nameof(AppConfig)).Bind(AppConfig.Instance);
            services.AddSingleton(AppConfig.Instance);
            var appConfig = AppConfig.Instance;

            var baseUrl = Environment.GetEnvironmentVariable("VIRTUAL_HOST");
            baseUrl = !string.IsNullOrEmpty(baseUrl)
                ? $"https://{baseUrl}"
                : LocalBaseUrl;
            var apiUrl = Environment.GetEnvironmentVariable("DEPLOY_API");
            apiUrl = !string.IsNullOrEmpty(apiUrl)
                ? $"https://{apiUrl}"
                : null;
            appConfig.BaseUrl = baseUrl;    
            appConfig.ApiBaseUrl = apiUrl ?? baseUrl;
            var aiServerApiKey = Environment.GetEnvironmentVariable("AI_SERVER_APIKEY");
            if (aiServerApiKey != null)
                appConfig.AiServerApiKey = aiServerApiKey;

            var r2AccountId = Environment.GetEnvironmentVariable("R2_ACCOUNT_ID");
            if (r2AccountId != null)
                appConfig.R2Account = r2AccountId;
            var r2AccessId = Environment.GetEnvironmentVariable("R2_ACCESS_KEY_ID");
            if (r2AccessId != null)
                appConfig.R2AccessId = r2AccessId;
            var r2AccessKey = Environment.GetEnvironmentVariable("R2_SECRET_ACCESS_KEY");
            if (r2AccessKey != null)
                appConfig.R2AccessKey = r2AccessKey;

            var s3Client = new AmazonS3Client(appConfig.R2AccessId, appConfig.R2AccessKey, new AmazonS3Config
            {
                ServiceURL = $"https://{appConfig.R2Account}.r2.cloudflarestorage.com"
            });
            services.AddSingleton(s3Client);
            
        services.AddPlugin(new CorsFeature(allowedHeaders: "Content-Type,Authorization",
            allowOriginWhitelist: [
            "https://localhost:5002",
            "http://localhost:5000",
            "http://localhost:8080",
            "https://diffusion.works",
             appConfig.BaseUrl,
            "https://blazordiffusion.com",
            "https://www.blazordiffusion.com",
            "https://pub-e17dff5b2d09437a97efdbb7f6ee3701.r2.dev" // CDN diffusion-client public bucket
            ], allowCredentials: true));

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
        
            var aiServerClient = new JsonApiClient(appConfig.AiServerBaseUrl);
            if (context.HostingEnvironment.IsDevelopment())
            {
                // If development, Ignore local SSL Errors
                var clientHandler = new HttpClientHandler {
                    ServerCertificateCustomValidationCallback = (message, certificate2, arg3, arg4) => true
                };
                HttpUtils.CreateClient = () => new HttpClient(clientHandler);
                aiServerClient = IgnoreSslValidation(aiServerClient);
            }
            aiServerClient.AddHeader("Authorization","Bearer " + appConfig.AiServerApiKey);

            services.AddSingleton<IStableDiffusionClient>(x => new AiServerClient
            {
                Client = aiServerClient,
                OutputPathPrefix = "artifacts",
                VirtualFiles = appFs,
                ReplyToUrl = appConfig.BaseUrl.CombineWith("/creatives/callback"),
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
