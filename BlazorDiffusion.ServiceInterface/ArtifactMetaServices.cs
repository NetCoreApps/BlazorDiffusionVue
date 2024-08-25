using System;
using System.Threading.Tasks;
using BlazorDiffusion.ServiceInterface.Analytics;
using BlazorDiffusion.ServiceInterface.App;
using BlazorDiffusion.ServiceModel;
using ServiceStack;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface;

public class ArtifactServices(AppConfig appConfig, IBackgroundJobs jobs) : Service
{
    public object Post(CreateArtifactLike request)
    {
        var userId = Request.GetRequiredUserId();
        var row = new ArtifactLike
        {
            AppUserId = userId,
            ArtifactId = request.ArtifactId,
            CreatedDate = DateTime.UtcNow,
        };
        lock (Locks.AppDb)
        {
            row.Id = base.Db.Insert(row, selectIdentity:true);
        }

        jobs.RunCommand<UpdateScoresCommand>(new UpdateScores { RecordArtifactLikeId = request.ArtifactId });
        return row;
    }

    public void Delete(DeleteArtifactLike request)
    {
        var userId = Request.GetRequiredUserId();
        lock (Locks.AppDb)
        {
            Db.Delete<ArtifactLike>(x => x.ArtifactId == request.ArtifactId && x.AppUserId == userId);
        }

        jobs.RunCommand<UpdateScoresCommand>(new UpdateScores { RecordArtifactUnlikeId = request.ArtifactId });
    }

    public object Post(CreateArtifactReport request)
    {
        var userId = Request.GetRequiredUserId();
        var row = request.ConvertTo<ArtifactReport>();
        row.AppUserId = userId;
        row.CreatedDate = DateTime.UtcNow;
        lock (Locks.AppDb)
        {
            row.Id = base.Db.Insert(row, selectIdentity: true);
        }
        return row;
    }

    public void Delete(DeleteArtifactReport request)
    {
        var userId = Request.GetRequiredUserId();
        lock (Locks.AppDb)
        {
            Db.Delete<ArtifactReport>(x => x.ArtifactId == request.ArtifactId && x.AppUserId == userId);
        }
    }

    public async Task<object> Get(DownloadArtifact request)
    {
        var artifact = !string.IsNullOrEmpty(request.RefId)
            ? Db.Single<Artifact>(x => x.RefId == request.RefId)
            : null;
        if (artifact?.FilePathLarge == null)
            return HttpError.NotFound("File not found");

        jobs.RunCommand<RecordAnalyticsCommand>(new RecordAnalytics {
            RecordArtifactStat = new ArtifactStat {
                Type = StatType.Download,
                ArtifactId = artifact!.Id,
                RefId = artifact.RefId,
                Source = nameof(DownloadArtifact),
                Version = ServiceStack.Text.Env.VersionString,
            }.WithRequest(Request!)
        });

        long? contentLength = null;
        var url = appConfig.AiServerBaseUrl.CombineWith(artifact.FilePathLarge);
        var imageBytes = await url.GetBytesFromUrlAsync(responseFilter:res => contentLength = res.GetContentLength());
        var headerValue = $"attachment; {HttpExt.GetDispositionFileName(artifact.FileName)}; " + 
            (contentLength != null ? $"size={contentLength}; " : "") +
            $"creation-date={artifact.CreatedDate.ToString("R").Replace(",", "")}; " +
            $"modification-date={artifact.ModifiedDate.ToString("R").Replace(",", "")}; " +
            $"read-date={artifact.ModifiedDate.ToString("R").Replace(",", "")}";
        Response!.AddHeader(HttpHeaders.ContentDisposition, headerValue);
        return imageBytes;
    }
}
