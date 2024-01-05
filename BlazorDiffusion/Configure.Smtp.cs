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
                // Check if SMTP is configured
                var smtpConfig = appHost.TryResolve<SmtpConfig>();
                var log = appHost.GetApplicationServices().GetRequiredService<ILogger<ConfigureSmtp>>();
                // Log if missing
                if (smtpConfig is null)
                {
                    log.LogWarning("SMTP is not configured, please configure SMTP to enable sending emails");
                }
                else
                {
                    log.LogWarning("SMTP is configured with <{SmtpConfigFromEmail}> {SmtpConfigFromName}", smtpConfig.FromEmail, smtpConfig.FromName);
                }
            });
    }
}
