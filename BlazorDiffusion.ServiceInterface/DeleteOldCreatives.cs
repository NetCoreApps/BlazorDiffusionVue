using BlazorDiffusion.ServiceModel;
using ServiceStack;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface;

public class DeleteOldCreatives : IGet, IReturn<StringsResponse> {}

public class DeleteOldCreativesService : Service
{
    public object Any(DeleteOldCreatives request)
    {
        using var service = ResolveService<CreativeService>();
        var oldIds = Db.Column<int>(Db.From<Creative>()
            .Where(x => x.Id < 8715));

        var to = new StringsResponse { Results = [] };
        foreach (var creativeId in oldIds)
        {
            to.Results.Add($"{creativeId}");
            service.Delete(new HardDeleteCreative { Id = creativeId });
        }
        return to;
    }
}