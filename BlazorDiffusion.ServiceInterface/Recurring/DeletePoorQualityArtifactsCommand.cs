using System.Data;
using System.Linq;
using BlazorDiffusion.ServiceInterface.App;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface.Recurring;

public class DeletePoorQualityArtifactsCommand(
    ILogger<DeletePoorQualityArtifactsCommand> logger, 
    IBackgroundJobs jobs, 
    IDbConnection db) : SyncCommand
{
    protected override void Run()
    {
        var log = Request.CreateJobLogger(jobs,logger);

        var poorQualityArtifactIds = db.Column<int>(db.From<Artifact>()
            .Where(x => x.Quality < 0)
            .Select(x => x.Id));

        log.LogInformation("Deleting {Count} poor quality pictures...", poorQualityArtifactIds.Count);
        jobs.EnqueueCommand<RemoveArtifactsCommand>(new RemoveArtifacts {
            Ids = poorQualityArtifactIds
        });
    }
}
