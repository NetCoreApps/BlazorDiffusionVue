using ServiceStack.Auth;
using BlazorDiffusion.ServiceInterface;

[assembly: HostingStartup(typeof(BlazorDiffusion.ConfigureAuth))]

namespace BlazorDiffusion;

public class ConfigureAuth : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context,services) =>
        {
            services.AddPlugin(new AuthFeature(IdentityAuth.For<AppUser,int>(options => {
                options.EnableCredentialsAuth = true;
                options.SessionFactory = () => new CustomUserSession();
                if (context.HostingEnvironment.IsDevelopment())
                {
                    options.EnableJwtAuth = true;
                }
            })));
        });
}
