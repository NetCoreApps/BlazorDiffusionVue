using System;
using System.Collections.Generic;
using System.Diagnostics;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface.Recurring;

public class SyncCreativesCommand(ILogger<SyncCreativesCommand> logger, IBackgroundJobs jobs, IDbConnectionFactory dbFactory, AppConfig appConfig) 
    : SyncCommand
{
    protected override void Run()
    {
        var log = Request.CreateJobLogger(jobs, logger);
        var db = dbFactory.OpenDbConnection();
        var now = DateTime.UtcNow;
        
        var swTask = Stopwatch.StartNew();
        Scores.Clear();
        Scores.Load(db);
        using var dbAnalytics = dbFactory.OpenDbConnection(Databases.Analytics);
        Scores.LoadAnalytics(dbAnalytics);

        var count = 0;
        var allCreatives = db.Select(db.From<Creative>());
        foreach (var creative in allCreatives)
        {
            var creativeArtifacts = db.Select(db.From<Artifact>().Where(x => x.CreativeId == creative.Id));
            foreach (var artifact in creativeArtifacts)
            {
                var needsUpdating = Scores.PopulateArtifactScores(artifact) || Scores.PopulateTemporalScore(artifact);
                if (needsUpdating)
                {
                    count++;
                    db.UpdateOnly(() => new Artifact { 
                        TemporalScore = artifact.TemporalScore,
                        LikesCount = artifact.LikesCount,
                        AlbumsCount = artifact.AlbumsCount,
                        DownloadsCount = artifact.DownloadsCount,
                        SearchCount = artifact.SearchCount,
                        Score = artifact.Score,
                        ModifiedBy = Users.System.Id.ToString(),
                        ModifiedDate = now,
                }, x => x.Id == artifact.Id);
                    Updated.ArtifactIds.Add(artifact.Id);
                }
            }
        }
        log.LogInformation("SYNC updated {0} artifacts, took {1}ms", count, swTask.ElapsedMilliseconds);

        count = 0;
        swTask.Restart();
        var allAlbums = db.Select<Album>();
        foreach (var album in allAlbums)
        {
            var needsUpdating = Scores.PopulateAlbumScores(album);
            if (needsUpdating)
            {
                count++;
                db.UpdateOnly(() => new Album
                {
                    LikesCount = album.LikesCount,
                    SearchCount = album.SearchCount,
                    Score = album.Score,
                    ModifiedBy = Users.System.Id.ToString(),
                    ModifiedDate = now,
                }, x => x.Id == album.Id);
            }
        }
        log.LogInformation("SYNC updated {0} albums, took {1}ms", count, swTask.ElapsedMilliseconds);
    }
}