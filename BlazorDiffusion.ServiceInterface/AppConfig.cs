using System;
using System.Collections.Generic;
using System.Security.Claims;
using ServiceStack;

namespace BlazorDiffusion;

public class AppConfig
{
    public static AppConfig Instance { get; private set; } = new();
    public string? GitPagesBaseUrl { get; set; }
    public string BaseUrl { get; set; }
    public string AiServerBaseUrl { get; set; }
    public string? AiServerApiKey { get; set; }
    public string ApiBaseUrl { get; set; }
    public string WwwBaseUrl { get; set; }
    public string CdnBaseUrl { get; set; }
    public string AssetsBasePath { get; set; }
    public string FallbackAssetsBasePath { get; set; }

    public HashSet<string> BanWords { get; set; } = new(StringComparer.OrdinalIgnoreCase)
    {
        "panties",
        "breasts",
        "hispanic",
    };

    /// <summary>
    /// Ignore saving creatives + pre-rendering pages to avoid Hot Reload reloading page
    /// </summary>
    public bool DisableWrites { get; set; }
    public TimeSpan SyncTasksInterval { get; set; } = TimeSpan.FromMinutes(10);
    public static AppConfig Set(AppConfig instance) => Instance = instance;
}
