using System;
using System.Linq;
using System.Threading.Tasks;
using BlazorDiffusion.ServiceInterface.AiServer;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface;

[ValidateApiKey]
public class MigrateArtifact : IPost, IReturn<MigrateArtifactResponse>
{
    public string Path { get; set; }
    public DateTime? Date { get; set; }
}
public class MigrateArtifactResponse
{
    public string FilePath { get; set; }
    public ResponseStatus? ResponseStatus { get; set; }
}

public class MigrationServices(ILogger<MigrationServices> log, AiServerClient aiClient) : Service
{
    public async Task<object> Any(MigrateOldArtifacts request)
    {
        var limit = request.Limit ?? 10;
        var artifacts = Db.Select(Db.From<Artifact>()
            .Where(x => x.FilePath.EndsWith(".png"))
            .OrderBy(x => x.Id)
            .Take(limit));

        var to = new MigrateOldArtifactsResponse();
        foreach (var artifact in artifacts)
        {
            try
            {
                var filePath = artifact.FilePath;
                if (filePath.EndsWith(".png"))
                    filePath = filePath.LastLeftPart('.') + ".webp";
                var api = await aiClient.Client.ApiAsync(new MigrateArtifact
                {
                    Path = filePath,
                    Date = artifact.CreatedDate,
                });
                if (api.Succeeded)
                {
                    lock (Locks.AppDb)
                    {
                        var newFilePath = api.Response?.FilePath;
                        if (string.IsNullOrEmpty(newFilePath))
                        {
                            to.Failed.Add(filePath);
                            log.LogError("Failed migrating artifact {Id} {FilePath}: Missing Path", 
                                artifact.Id, filePath);
                        }
                        else
                        {
                            var variant = artifact.Height > artifact.Width ? "height" : "width";
                            var fileName = newFilePath.LastRightPart('/');
                            // var filePathSmall = $"/variants/{variant}=118".CombineWith(newFilePath.RightPart("/artifacts"));
                            // var filePathMedium = $"/variants/{variant}=288".CombineWith(newFilePath.RightPart("/artifacts"));
                            Db.UpdateOnly(() => new Artifact
                            {
                                FileName = fileName,
                                FilePath = newFilePath,
                                // FilePathSmall = filePathSmall,
                                // FilePathMedium = filePathMedium,
                                // FilePathLarge = newFilePath,
                            }, where: a => a.Id == artifact.Id);
                            to.Results.Add(newFilePath);
                            log.LogInformation($"Migrated {artifact.Id} to {newFilePath}");
                        }
                    }
                }
                else
                {
                    to.Failed.Add(artifact.FilePath);
                    log.LogError("Failed migrating artifact {Id} {FilePath}: {Json}", 
                        artifact.Id, filePath, api.Error.ToJson());
                }
            }
            catch (Exception e)
            {
                log.LogError(e, "Failed to migrate Artifact {Id} at {Path}: {Message}", artifact.Id, artifact.FilePath, e.Message);
                to.Failed.Add(artifact.FilePath);
            }
        }
        
        return to;
    }
}