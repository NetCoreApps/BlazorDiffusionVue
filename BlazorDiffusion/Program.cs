using System.Net;
using System.Text;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using ServiceStack.Blazor;
using BlazorDiffusion.Components;
using BlazorDiffusion.Data;
using BlazorDiffusion.ServiceInterface;
using BlazorDiffusion.Components.Account;
using Microsoft.AspNetCore.Authentication;

AppHost.RegisterKey();
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents();

builder.Services.AddCascadingAuthenticationState();
builder.Services.AddScoped<IdentityUserAccessor>();
builder.Services.AddScoped<IdentityRedirectManager>();
builder.Services.AddScoped<AuthenticationStateProvider, ServerAuthenticationStateProvider>();

var config = builder.Configuration;
builder.Services.AddAuthorization();
var auth = builder.Services.AddAuthentication(options =>
    {
        options.DefaultScheme = IdentityConstants.ApplicationScheme;
        options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
    })
    .AddFacebook(options => { /* Create App https://developers.facebook.com/apps */
        options.AppId = config["oauth.facebook.AppId"]!;
        options.AppSecret = config["oauth.facebook.AppSecret"]!;
        options.SaveTokens = true;
        options.Scope.Clear();
        config.GetSection("oauth.facebook.Permissions").GetChildren()
            .Each(x => options.Scope.Add(x.Value!));
    })
    .AddGoogle(options => { /* Create App https://console.developers.google.com/apis/credentials */
        options.ClientId = config["oauth.google.ConsumerKey"]!;
        options.ClientSecret = config["oauth.google.ConsumerSecret"]!;
        options.SaveTokens = true;
    })
    .AddMicrosoftAccount(options => { /* Create App https://apps.dev.microsoft.com */
        options.ClientId = config["oauth.microsoft.AppId"]!;
        options.ClientSecret = config["oauth.microsoft.AppSecret"]!;
        options.SaveTokens = true;
    });
if (builder.Environment.IsDevelopment())
{
    auth.AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler<AppUser, int>>(BasicAuthenticationHandler.Scheme, null)
        .AddJwtBearer(options => {
            options.TokenValidationParameters = new()
            {
                ValidIssuer = config["JwtBearer:ValidIssuer"],
                ValidAudience = config["JwtBearer:ValidAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JwtBearer:IssuerSigningKey"]!)),
                ValidateIssuerSigningKey = true,
            };
        });
}
auth.AddIdentityCookies(options => options.DisableRedirectsForApis());

builder.Services.AddDataProtection()
    .PersistKeysToFileSystem(new DirectoryInfo("App_Data"));

// $ dotnet ef migrations add CreateIdentitySchema
// $ dotnet ef database update
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString, b => b.MigrationsAssembly(nameof(BlazorDiffusion))));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

builder.Services.AddIdentityCore<AppUser>(options => options.SignIn.RequireConfirmedAccount = true)
    .AddRoles<AppRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddSignInManager()
    .AddDefaultTokenProviders();

builder.Services.AddSingleton<IEmailSender<AppUser>, EmailSender>();
builder.Services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, AdditionalUserClaimsPrincipalFactory>();

var baseUrl = builder.Configuration["ApiBaseUrl"] ??
    (builder.Environment.IsDevelopment() ? "https://localhost:5001" : "http://" + IPAddress.Loopback);
builder.Services.AddScoped(c => new HttpClient { BaseAddress = new Uri(baseUrl) });
builder.Services.AddBlazorServerIdentityApiClient(baseUrl);
builder.Services.AddLocalStorage();
builder.Services.AddScoped<UserState>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddServiceStack(typeof(MyServices).Assembly, c => {
    if (builder.Environment.IsDevelopment())
    {
        c.AddSwagger(o => {
            o.AddBasicAuth();
            // o.AddJwtBearer();
        });
    }
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

// handle redirects from server.blazordiffusion.com
app.MapGet("/index.html", context => {
    context.Response.Redirect("/");
    return Task.CompletedTask;
});

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>();

// Add additional endpoints required by the Identity /Account Razor components.
app.MapAdditionalIdentityEndpoints();

app.UseServiceStack(new AppHost(), options => {
    options.MapEndpoints();
});

BlazorConfig.Set(new()
{
    Services = app.Services,
    JSParseObject = JS.ParseObject,
    IsDevelopment = app.Environment.IsDevelopment(),
    EnableLogging = app.Environment.IsDevelopment(),
    EnableVerboseLogging = app.Environment.IsDevelopment(),
    ApiBaseUrl = AppConfig.Instance.ApiBaseUrl,
    AssetsBasePath = AppConfig.Instance.AssetsBasePath,
    FallbackAssetsBasePath = AppConfig.Instance.FallbackAssetsBasePath,
    DefaultProfileUrl = Icons.AnonUserUri,
});

app.Run();
