using System.Collections.Generic;
using System.Data;
using BlazorDiffusion.ServiceModel;
using Microsoft.Extensions.Logging;
using ServiceStack;
using ServiceStack.Jobs;

namespace BlazorDiffusion.ServiceInterface.App;

public class UpdateScores
{
    public int? RecordArtifactLikeId { get; set; }
    public int? RecordArtifactUnlikeId { get; set; }

    public int? RecordAlbumLikeId { get; set; }
    public int? RecordAlbumUnlikeId { get; set; }

    public RecordPrimaryArtifact? RecordPrimaryArtifact { get; set; }

    public List<int>? ArtifactIdsAddedToAlbums { get; set; }
    public List<int>? ArtifactIdsRemovedFromAlbums { get; set; }
}

public class RecordPrimaryArtifact
{
    public int CreativeId { get; set; }
    public int? FromArtifactId { get; set; }
    public int? ToArtifactId { get; set; }
}


[Worker(Workers.AppDb)]
public class UpdateScoresCommand(ILogger<UpdateScoresCommand> logger, IBackgroundJobs jobs, IDbConnection db) 
    : SyncCommand<UpdateScores>
{
    protected override void Run(UpdateScores request)
    {
        if (request.RecordArtifactLikeId != null)
            Scores.IncrementArtifactLike(db, request.RecordArtifactLikeId.Value);
        if (request.RecordArtifactUnlikeId != null)
            Scores.DecrementArtifactLike(db, request.RecordArtifactUnlikeId.Value);

        if (request.RecordAlbumLikeId != null)
            Scores.IncrementAlbumLike(db, request.RecordAlbumLikeId.Value);
        if (request.RecordAlbumUnlikeId != null)
            Scores.DecrementAlbumLike(db, request.RecordAlbumUnlikeId.Value);

        if (request.ArtifactIdsAddedToAlbums?.Count > 0)
        {
            foreach (var artifactId in request.ArtifactIdsAddedToAlbums)
            {
                Scores.IncrementArtifactInAlbum(db, artifactId);
            }
        }
        if (request.ArtifactIdsRemovedFromAlbums?.Count > 0)
        {
            foreach (var artifactId in request.ArtifactIdsRemovedFromAlbums)
            {
                Scores.DecrementArtifactInAlbum(db, artifactId);
            }
        }
        if (request.RecordPrimaryArtifact != null)
        {
            Scores.ChangePrimaryArtifact(db,
                request.RecordPrimaryArtifact.CreativeId,
                request.RecordPrimaryArtifact.FromArtifactId,
                request.RecordPrimaryArtifact.ToArtifactId);
        }
    }
}