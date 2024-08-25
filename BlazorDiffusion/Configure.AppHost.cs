using ServiceStack.IO;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using BlazorDiffusion.ServiceInterface;
using BlazorDiffusion.ServiceInterface.AiServer;

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

        services.AddPlugin(new CorsFeature(allowedHeaders: "Content-Type,Authorization",
            allowOriginWhitelist: [
            "https://localhost:5002",
            "http://localhost:5000",
            "http://localhost:8080",
            "https://diffusion.works",
             appConfig.BaseUrl,
            "https://blazordiffusion.com",
            "https://www.blazordiffusion.com",
            ], allowCredentials: true));

        IVirtualFiles appFs = new FileSystemVirtualFiles(context.HostingEnvironment.ContentRootPath.CombineWith("App_Data").AssertDir());
        services.AddSingleton(appFs);
        
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

        services.AddSingleton(x => new AiServerClient
        {
            Client = aiServerClient,
            OutputPathPrefix = "artifacts",
            VirtualFiles = appFs,
            ReplyToUrl = appConfig.BaseUrl.CombineWith("/creatives/callback"),
            Logger = x.GetService<ILoggerFactory>().CreateLogger<AiServerClient>(),
            //PublicPrefix = appConfig.AssetsBasePath,
        });
        services.AddSingleton<IStableDiffusionClient>(x => x.GetRequiredService<AiServerClient>());
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
        db.LoadAppData(AppData.Instance);

        ScriptContext.Args[nameof(AppData)] = AppData.Instance;
    }

    public override void OnStartupException(Exception ex)
    {
        base.OnStartupException(ex);
    }

    public static void RegisterKey() =>
        Licensing.RegisterLicense("OSS GPL-3.0 2024 https://github.com/NetCoreApps/BlazorDiffusionVue K0VsMikfSp8ZKaRhYB9deGsvqJW7L8liuUmg6wD6kDAWoXiVRN3nKZ+nWLzgBvsuxK1yJ2NlL2XEwo2Zmj+e/jPDbnzEBasPOJVAP4E3lIPye7KfqUVWICvwTn6kav5BNfcyLlG/MTX6HloKEqQijOV/Azrw5fACOeNh9mXUQ1o=");
}
