using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface.Recurring;

[Worker(Workers.AppDb)]
public class RecalculateScoresCommand(ILogger<RecalculateScoresCommand> logger, IBackgroundJobs jobs, IDbConnectionFactory dbFactory) : SyncCommand
{
    protected override void Run()
    {
        var log = Request.CreateJobLogger(jobs, logger);
        var db = dbFactory.OpenDbConnection();
        var now = DateTime.UtcNow;
        
        var swTask = Stopwatch.StartNew();
        var thresholdDate = DateTime.UtcNow.Add(-Scores.TemporalScoreThreshold);
        var artifacts = db.Select(db.From<Artifact>()
            .Join<Creative>((a,c) => a.Id == c.PrimaryArtifactId)
            .Where(x => x.TemporalScore > 0 || x.CreatedDate >= thresholdDate));

        log.LogInformation("CALC Found {Artifacts} artifacts created before {ThresholdDate}", artifacts.Count, thresholdDate.ToString("s"));

        var count = 0;
        foreach (var artifact in artifacts)
        {
            if (Scores.PopulateTemporalScore(artifact))
            {
                count++;
                db.UpdateOnly(() => new Artifact { TemporalScore = artifact.TemporalScore }, x => x.Id == artifact.Id);
                Updated.ArtifactScore(artifact.Id);
            }
        }
        log.LogInformation("CALC Updated {Count} artifacts, took {Duration}ms", count, swTask.ElapsedMilliseconds);

        count = 0;
        swTask.Restart();
        var updatedAlbumsIds = new HashSet<int>();
        while (Updated.AlbumIds.TryTake(out var albumId)) updatedAlbumsIds.Add(albumId);

        var updatedAlbums = db.Select<Album>(x => updatedAlbumsIds.Contains(x.Id));
        foreach (var album in updatedAlbums)
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
                Updated.AlbumScore(album.Id);
            }
        }
        log.LogInformation("CALC Updated {Count} albums, took {Duration}ms", count, swTask.ElapsedMilliseconds);
    }
}
