using ServiceStack.Auth;
using BlazorDiffusion.ServiceModel;
using BlazorDiffusion.ServiceInterface;

[assembly: HostingStartup(typeof(BlazorDiffusion.ConfigureAuth))]

namespace BlazorDiffusion;

public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureAppHost(appHost => {
            appHost.Plugins.Add(new AuthFeature(IdentityAuth.For<AppUser,int>(options => {
                options.EnableCredentialsAuth = true;
                options.SessionFactory = () => new CustomUserSession();
            })));
        });
}
