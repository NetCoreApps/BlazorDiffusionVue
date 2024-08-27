using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;

namespace BlazorDiffusion.ServiceInterface.Recurring;

public class SyncArtifactsCommand(ILogger<SyncArtifactsCommand> logger, IBackgroundJobs jobs, IDbConnection db, AppConfig appConfig) 
    : AsyncCommand
{
    protected override async Task RunAsync(CancellationToken token)
    {
        var log = Request.CreateJobLogger(jobs, logger);
        var artifacts = db.Select(db.From<Artifact>()
            .Where(x => x.ContentLength == 0 ||
                        x.PerceptualHash == null ||
                        x.AverageHash == null ||
                        x.DifferenceHash == null || x.Background == null));
        
        log.LogInformation("SYNC ARTIFACTS Found {Count} Artifacts with missing image details", artifacts.Count);

        foreach (var artifact in artifacts)
        {
            try
            {
                var artifactUrl = appConfig.AiServerBaseUrl.CombineWith(artifact.FilePath);
                var stream = await artifactUrl.GetStreamFromUrlAsync(
                    responseFilter:res => artifact.ContentLength = res.Content.Headers.ContentLength ?? 0, token:token);
            
                using var image = Image.Load<Rgba32>(stream);
                var imageDetails = ImageDetails.Calculate(image);
                artifact.WithImageDetails(imageDetails);

                log.LogInformation("SYNC ARTIFACTS Updating Artifact {Id} Image Details ({Bytes} bytes)", 
                    artifact.Id, artifact.ContentLength);
                lock (Locks.AppDb)
                {
                    db.UpdateOnly(() => new Artifact {
                        ContentLength = artifact.ContentLength,
                        PerceptualHash = artifact.PerceptualHash,
                        AverageHash = artifact.AverageHash,
                        DifferenceHash = artifact.DifferenceHash,
                        Background = artifact.Background,
                    }, where: a => a.Id == artifact.Id);
                }
            }
            catch (Exception e)
            {
                log.LogError(e, "Failed to sync Artifact {Id}: {Message}", artifact.Id, e.Message);
            }
        }
    }
}