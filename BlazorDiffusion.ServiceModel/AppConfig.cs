using ServiceStack.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlazorDiffusion.ServiceModel;

public class AppConfig
{
    public static AppConfig Instance { get; private set; } = new();
    public string? GitPagesBaseUrl { get; set; }
    public string BaseUrl { get; set; }
    public string ApiBaseUrl { get; set; }
    public string WwwBaseUrl { get; set; }
    public string CdnBaseUrl { get; set; }
    public string? R2AccessId { get; set; }
    public string? R2AccessKey { get; set; }
    public string ArtifactBucket { get; set; }
    public string CdnBucket { get; set; }
    public string R2Account { get; set; }
    public string AssetsBasePath { get; set; }
    public string FallbackAssetsBasePath { get; set; }

    public Dictionary<string, string> AvailableModelMappings { get; set; } = new()
    {
        { "Realistic", "jibMixRealisticXL_v130RisenFromAshes.safetensors" },
        { "Anime", "animexlXuebimix_v60LCM.safetensors" },
        { "SciFi", "LahHongchenSDXLSD15_xlLightning.safetensors" },
        { "Replicate", "5f24084160c9089501c1b3545d9be3c27883ae2239b6f412990e82d4a6210f8f"}
    };
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
    public TimeSpan SyncTasksInterval { get; set; }
    public static AppConfig Set(AppConfig instance) => Instance = instance;
}
