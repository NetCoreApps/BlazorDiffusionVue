using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.Logging;
using ServiceStack.OrmLite;
using BlazorDiffusion.ServiceModel;

namespace BlazorDiffusion.ServiceInterface;

public class SsgServies : Service
{
    public static ILog Log = LogManager.GetLogger(typeof(SsgServies));
    public HtmlTemplate HtmlTemplate { get; set; } = default!;
    public IStableDiffusionClient StableDiffusionClient { get; set; } = default!;
    public AppConfig AppConfig { get; set; } = default!;

    public async Task<object> Get(ViewCreativeMetadata request)
    {
        var creative = await Db.SingleByIdAsync<Creative>(request.CreativeId);
        var metadataFile = creative != null ? StableDiffusionClient.GetMetadataFile(creative) : null;
        if (metadataFile == null)
            return HttpError.NotFound("Creative not found");

        var json = metadataFile.ReadAllText();
        var metadataCreative = json.FromJson<Creative>();
        return metadataCreative;
    }
}
