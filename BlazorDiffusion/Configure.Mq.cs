using ServiceStack.Messaging;

[assembly: HostingStartup(typeof(BlazorDiffusion.ConfigureMq))]

namespace BlazorDiffusion;

/**
  Register Services you want available via MQ in your AppHost, e.g:
    var mqServer = container.Resolve&lt;IMessageService&gt;();
    mqServer.RegisterHandler&lt;MyRequest&gt;(ExecuteMessage);
*/
public class ConfigureMq : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            services.AddSingleton<IMessageService, BackgroundMqService>();
        })
        .ConfigureAppHost(afterAppHostInit: appHost => {
            var mqService = appHost.Resolve<IMessageService>();
            mqService.RegisterHandler<DiskTasks>(appHost.ExecuteMessage);
            mqService.RegisterHandler<BackgroundTasks>(appHost.ExecuteMessage);
            mqService.RegisterHandler<AnalyticsTasks>(appHost.ExecuteMessage);
            mqService.Start();
        });
}