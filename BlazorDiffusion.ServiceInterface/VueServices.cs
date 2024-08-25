using System.Linq;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;
using BlazorDiffusion.ServiceModel;

namespace BlazorDiffusion.ServiceInterface;

public class VueServices(IAutoQueryDb autoQuery) : Service
{
    //public async Task<object> Any(QueryArtifactComments query)
    //{
    //    using var db = autoQuery.GetDb(query, base.Request);
    //    var q = autoQuery.CreateQuery(query, base.Request, db);
    //    var response = await autoQuery.ExecuteAsync(query, q, base.Request, db);
    //    return response;
    //}
    
    public object Get(GetArtifactUserData request)
    {
        var userId = Request.GetRequiredUserId();
        var votes = Db.Select(Db.From<ArtifactCommentVote>().Join<ArtifactComment>()
            .Where(x => x.AppUserId == userId)
            .And<ArtifactComment>(x => x.ArtifactId == request.ArtifactId));
        var liked = Db.Exists<ArtifactLike>(x => x.ArtifactId == request.ArtifactId && x.AppUserId == userId);

        var ret = new GetArtifactUserDataResponse
        {
            ArtifactId = request.ArtifactId,
            Liked = liked,
            UpVoted = votes.Where(x => x.Vote > 0).Map(x => x.ArtifactCommentId),
            DownVoted = votes.Where(x => x.Vote < 0).Map(x => x.ArtifactCommentId),
        };
        return ret;
    }

    public object Get(GetAlbumUserData request)
    {
        var userId = Request.GetRequiredUserId();
        var likedIds = Db.Column<int>(Db.From<AlbumArtifact>()
            .Join<ArtifactLike>((a,l) => a.ArtifactId == l.ArtifactId && l.AppUserId == userId)
            .Where<AlbumArtifact>(x => x.AlbumId == request.AlbumId)
            .Select(x => x.ArtifactId));
        return new GetAlbumUserDataResponse
        {
            AlbumId = request.AlbumId,
            LikedArtifacts = likedIds,
        };
    }

    void RefreshVotes(int artifactCommentId)
    {
        var commentVotes = Db.Select<ArtifactCommentVote>(x => x.ArtifactCommentId == artifactCommentId);
        var upVotes = commentVotes.Count(x => x.Vote > 0);
        var downVotes = commentVotes.Count(x => x.Vote < 0);
        var votes = upVotes - downVotes;

        lock (Locks.AppDb)
        {
            Db.UpdateOnly(() => new ArtifactComment
            {
                UpVotes = upVotes,
                DownVotes = downVotes,
                Votes = votes,
            }, where: x => x.Id == artifactCommentId);
        }
    }

    public void Post(CreateArtifactCommentVote request)
    {
        autoQuery.Create(request, base.Request);
        RefreshVotes(request.ArtifactCommentId);
    }

    public void Delete(DeleteArtifactCommentVote request)
    {
        autoQuery.Delete(request, base.Request);
        RefreshVotes(request.ArtifactCommentId);
    }
}
