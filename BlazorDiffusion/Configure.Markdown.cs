using Microsoft.AspNetCore.Mvc.Rendering;

[assembly: HostingStartup(typeof(BlazorDiffusion.ConfigureMarkdown))]

namespace BlazorDiffusion;

public class ConfigureMarkdown : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context,services) =>
        {
            services.AddSingleton<MarkdownPages>();
            AppConfig.Instance.GitPagesBaseUrl ??= ResolveGitBlobBaseUrl(context.HostingEnvironment.ContentRootPath);
        })
        .ConfigureAppHost(
            afterPluginsLoaded: appHost =>
            {
                var pages = appHost.Resolve<MarkdownPages>();
                pages.LoadFrom("_pages");
            });
    
    private string? ResolveGitBlobBaseUrl(string contentDir)
    {
        var srcDir = new DirectoryInfo(contentDir);
        var gitConfig = new FileInfo(Path.Combine(srcDir.Parent!.FullName, ".git", "config"));
        if (gitConfig.Exists)
        {
            var txt = gitConfig.ReadAllText();
            var pos = txt.IndexOf("url = ", StringComparison.Ordinal);
            if (pos >= 0)
            {
                var url = txt[(pos + "url = ".Length)..].LeftPart(".git").LeftPart('\n').Trim();
                var gitBaseUrl = url.CombineWith($"blob/main/{srcDir.Name}");
                return gitBaseUrl;
            }
        }
        return null;
    }
}


// Add additional frontmatter info to include
public class MarkdownFileInfo : MarkdownFileBase
{
}

public static class HtmlHelpers
{
    public static string ToAbsoluteContentUrl(string? relativePath) => HostContext.DebugMode 
        ? AppConfig.Instance.BaseUrl.CombineWith(relativePath)
        : AppConfig.Instance.WwwBaseUrl.CombineWith(relativePath);
    public static string ToAbsoluteApiUrl(string? relativePath) => HostContext.DebugMode 
        ? AppConfig.Instance.BaseUrl.CombineWith(relativePath)
        : AppConfig.Instance.WwwBaseUrl.CombineWith(relativePath);


    public static string ContentUrl(this IHtmlHelper html, string? relativePath) => ToAbsoluteContentUrl(relativePath); 
    public static string ApiUrl(this IHtmlHelper html, string? relativePath) => ToAbsoluteApiUrl(relativePath);
}
