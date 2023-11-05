using System.Net;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.Server;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using BlazorDiffusion.Components;
using BlazorDiffusion.Data;
using BlazorDiffusion.Identity;
using ServiceStack.Blazor;
using BlazorDiffusion.ServiceModel;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents();

builder.Services.AddCascadingAuthenticationState();
builder.Services.AddScoped<UserAccessor>();
builder.Services.AddScoped<IdentityRedirectManager>();
builder.Services.AddScoped<AuthenticationStateProvider, ServerAuthenticationStateProvider>();

var config = builder.Configuration;
builder.Services.AddAuthorization();
builder.Services.AddAuthentication(options =>
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
    })   
    .AddIdentityCookies();

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

builder.Services.AddSingleton<IEmailSender, EmailSender>();

var baseUrl = builder.Configuration["ApiBaseUrl"] ??
    (builder.Environment.IsDevelopment() ? "https://localhost:5001" : "http://" + IPAddress.Loopback);
builder.Services.AddScoped(c => new HttpClient { BaseAddress = new Uri(baseUrl) });
builder.Services.AddBlazorServerIdentityApiClient(baseUrl);
builder.Services.AddLocalStorage();
builder.Services.AddScoped<UserState>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
}
else
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>();

// Add additional endpoints required by the Identity /Account Razor components.
app.MapAdditionalIdentityEndpoints();

app.UseServiceStack(new AppHost());

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