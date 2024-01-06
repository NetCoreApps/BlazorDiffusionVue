using ServiceStack.Auth;
using BlazorDiffusion.ServiceInterface;

[assembly: HostingStartup(typeof(BlazorDiffusion.ConfigureAuth))]

namespace BlazorDiffusion;

public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services =>
        {
            services.AddPlugin(new AuthFeature(IdentityAuth.For<AppUser,int>(options => {
                options.EnableCredentialsAuth = true;
                options.EnableJwtAuth = true;
                options.SessionFactory = () => new CustomUserSession();
            })));
        });
}
