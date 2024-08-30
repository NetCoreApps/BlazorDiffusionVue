using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AiServer.ServiceModel;
using BlazorDiffusion.ServiceInterface.AiServer;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface.App;


public class RemoveArtifacts
{
    public List<int> Ids { get; set; } = [];
}public class RemoveArtifactsCommand(
    ILogger<RemoveArtifactsCommand> logger, IBackgroundJobs jobs, IDbConnection db, AiServerClient aiClient) : AsyncCommand<RemoveArtifacts>
{
    protected override async Task RunAsync(RemoveArtifacts request, CancellationToken token)
    {
        var log = Request.CreateJobLogger(jobs,logger);
        if (request.Ids.Count == 0)
        {
            log.LogWarning("No artifacts to delete");
            return;
        }
        
        log.LogInformation("Removing {Count} artifacts...", request.Ids.Count);
        
        var artifactsToDelete = db.Dictionary<int,string>(db.From<Artifact>()
            .Where(x => x.Quality < 0)
            .Select(x => new { x.Id, x.FilePath }));
        var artifactPathsMap = new Dictionary<string,int>();
        foreach (var entry in artifactsToDelete)
        {
            artifactPathsMap[entry.Value] = entry.Key;
        }

        try
        {
            var artifactPaths = artifactsToDelete.Values.ToList();
            var api = await aiClient.Client.ApiAsync(new DeleteFiles {
                Paths = artifactPaths,
            });
            
            api.ThrowIfError();
            
            log.LogInformation("Deleted File Results: Deleted {DeletedCount}, Missing {MissingCount}, Failed {FailedCount}", 
                api.Response!.Deleted.Count, api.Response!.Missing.Count, api.Response!.Failed.Count);

            var deletedIds = new List<int>();
            var missingIds = new List<int>();
            var failedIds = new List<int>();

            if (api.Response!.Deleted.Count > 0)
            {
                foreach (var path in api.Response!.Deleted)
                {
                    if (!artifactPathsMap.TryGetValue(path, out var id))
                        deletedIds.Add(id);
                }
                log.LogInformation("Deleted Ids: {Ids}", string.Join(",", deletedIds));
            }
            if (api.Response!.Missing.Count > 0)
            {
                foreach (var path in api.Response!.Missing)
                {
                    if (!artifactPathsMap.TryGetValue(path, out var id))
                        missingIds.Add(id);
                }
                log.LogInformation("Missing Ids: {Ids}", string.Join(",", missingIds));
            }
            if (api.Response!.Failed.Count > 0)
            {
                foreach (var path in api.Response!.Missing)
                {
                    if (!artifactPathsMap.TryGetValue(path, out var id))
                        failedIds.Add(id);
                }
                log.LogInformation("Failed Ids: {Ids}", string.Join(",", failedIds));
            }
            
            var artifactIds = deletedIds.Union(missingIds).ToSet();
            if (artifactIds.Count > 0)
            {
                log.LogInformation("Deleting {Count} Artifacts:\n{Ids}", 
                    artifactIds.Count, string.Join(',', artifactIds));
                db.Delete<AlbumArtifact>(x => artifactIds.Contains(x.ArtifactId));
                db.Delete<ArtifactReport>(x => artifactIds.Contains(x.ArtifactId));
                db.Delete<ArtifactLike>(x => artifactIds.Contains(x.ArtifactId));
                db.Delete<Artifact>(x => artifactIds.Contains(x.Id));
                db.Delete<ArtifactFts>(x => artifactIds.Contains(x.rowid));
            }
        }
        catch (Exception e)
        {
            log.LogError(e, "Failed to remove artifacts: {Message}", e.Message);
        }        
    }
}