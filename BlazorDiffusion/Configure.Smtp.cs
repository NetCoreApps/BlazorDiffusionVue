using ServiceStack.Messaging;
using BlazorDiffusion.ServiceInterface;
using BlazorDiffusion.ServiceModel;

[assembly: HostingStartup(typeof(BlazorDiffusion.ConfigureSmtp))]

namespace BlazorDiffusion
{
    /**
      Register Services you want available via MQ in your AppHost, e.g:
        var mqServer = container.Resolve<IMessageService>();
        mqServer.RegisterHandler<MyRequest>(ExecuteMessage);
    */
    public class ConfigureSmtp : IHostingStartup
    {
        public void Configure(IWebHostBuilder builder) => builder
            .ConfigureServices((context,services) => {
                var smtpConfig = context.Configuration.GetSection(nameof(SmtpConfig))?.Get<SmtpConfig>();
                if (smtpConfig is not null)
                {
                    services.AddSingleton(smtpConfig);
                }
            })
            .ConfigureAppHost(appHost => {
                var mqService = appHost.Resolve<IMessageService>();
                mqService.RegisterHandler<SendEmail>(appHost.ExecuteMessage);
            });
    }
}
