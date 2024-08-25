﻿using System;
using System.Threading.Tasks;
using BlazorDiffusion.ServiceModel;
using ServiceStack;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface;

public class ArtifactServices(AppConfig appConfig) : Service
{
    public async Task<object> Post(CreateArtifactLike request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();
        var row = new ArtifactLike
        {
            AppUserId = userId,
            ArtifactId = request.ArtifactId,
            CreatedDate = DateTime.UtcNow,
        };
        row.Id = await base.Db.InsertAsync(row, selectIdentity:true);

        PublishMessage(new BackgroundTasks { RecordArtifactLikeId = request.ArtifactId });
        return row;
    }

    public async Task Delete(DeleteArtifactLike request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();
        await Db.DeleteAsync<ArtifactLike>(x => x.ArtifactId == request.ArtifactId && x.AppUserId == userId);

        PublishMessage(new BackgroundTasks { RecordArtifactUnlikeId = request.ArtifactId });
    }

    public async Task<object> Post(CreateArtifactReport request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();
        var row = request.ConvertTo<ArtifactReport>();
        row.AppUserId = userId;
        row.CreatedDate = DateTime.UtcNow;
        row.Id = await base.Db.InsertAsync(row, selectIdentity: true);
        return row;
    }

    public async Task Delete(DeleteArtifactReport request)
    {
        var session = await SessionAsAsync<CustomUserSession>();
        var userId = session.GetUserId();
        await Db.DeleteAsync<ArtifactReport>(x => x.ArtifactId == request.ArtifactId && x.AppUserId == userId);
    }

    public async Task<object> Get(DownloadArtifact request)
    {
        var artifact = !string.IsNullOrEmpty(request.RefId)
            ? await Db.SingleAsync<Artifact>(x => x.RefId == request.RefId)
            : null;
        if (artifact?.FilePathLarge == null)
            return HttpError.NotFound("File not found");

        PublishMessage(new AnalyticsTasks {
            RecordArtifactStat = new ArtifactStat {
                Type = StatType.Download,
                ArtifactId = artifact!.Id,
                RefId = artifact.RefId,
                Source = nameof(DownloadArtifact),
                Version = ServiceStack.Text.Env.VersionString,
            }.WithRequest(Request!, await GetSessionAsync())
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
