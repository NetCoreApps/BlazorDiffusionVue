using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.Jobs;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.ServiceInterface.Analytics;

public class RecordAnalytics
{
    public SearchStat? RecordSearchStat { get; set; }
    public ArtifactStat? RecordArtifactStat { get; set; }
}

[Worker(Databases.Analytics)]
public class RecordAnalyticsCommand(ILogger<RecordAnalyticsCommand> logger, IBackgroundJobs jobs, IDbConnectionFactory dbFactory) : SyncCommand<RecordAnalytics>
{
    protected override void Run(RecordAnalytics request)
    {
        using var db = dbFactory.OpenDbConnection();
        if (request.RecordArtifactStat != null && !Users.IsAdminOrSystem(request.RecordArtifactStat.AppUserId))
        {
            using var analyticsDb = HostContext.AppHost.GetDbConnection(Databases.Analytics);
            analyticsDb.Insert(request.RecordArtifactStat);

            if (request.RecordArtifactStat.Type == StatType.Download)
                Scores.IncrementArtifactDownload(db, request.RecordArtifactStat.ArtifactId);
        }

        if (request.RecordSearchStat != null && !Users.IsAdminOrSystem(request.RecordSearchStat.AppUserId))
        {
            using var analyticsDb = HostContext.AppHost.GetDbConnection(Databases.Analytics);
            analyticsDb.Insert(request.RecordSearchStat);

            if (request.RecordSearchStat.ArtifactId != null)
                Scores.IncrementArtifactSearch(db, request.RecordSearchStat.ArtifactId.Value);

            if (request.RecordSearchStat.Source != AppSource.Top)
            {
                var albumId = request.RecordSearchStat.AlbumId
                              ?? (request.RecordSearchStat.Album != null
                                  ? db.Scalar<int>(db.From<Album>()
                                      .Where(x => x.RefId == request.RecordSearchStat.Album)
                                      .Select(x => x.Id))
                                  : null);
                if (albumId != null)
                    Scores.IncrementAlbumSearch(db, albumId.Value);
            }
        }
    }
}
