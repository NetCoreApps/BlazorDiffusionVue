using System.Data;
using BlazorDiffusion.ServiceModel;
using ServiceStack;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface.App;

public class CreateCreativeCommand(IDbConnection db) : SyncCommand<Creative>
{
    protected override void Run(Creative creative)
    {
        var ftsArtifacts = creative.Artifacts.Map(x => new ArtifactFts
        {
            rowid = x.Id,
            Prompt = creative.Prompt,
            CreativeId = creative.Id,
            RefId = x.RefId,
        });
        db.InsertAll(ftsArtifacts);
        // If retry callbacks fire, they will fail since there is no CreativeQueue reference.
        db.Delete<CreativeQueue>(x => x.RefId == creative.RefId);
    }
}
