using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;
using BlazorDiffusion.ServiceModel;

namespace BlazorDiffusion.ServiceInterface;

public class SsgServices(IStableDiffusionClient stableDiffusion) : Service
{
    public async Task<object> Get(ViewCreativeMetadata request)
    {
        var creative = await Db.SingleByIdAsync<Creative>(request.CreativeId);
        var metadataFile = creative != null ? stableDiffusion.GetMetadataFile(creative) : null;
        if (metadataFile == null)
            return HttpError.NotFound("Creative not found");

        var json = await metadataFile.ReadAllTextAsync();
        var metadataCreative = json.FromJson<Creative>();
        return metadataCreative;
    }
}
