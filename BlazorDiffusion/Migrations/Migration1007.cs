using ServiceStack.OrmLite;

namespace BlazorDiffusion.Migrations;

public class Migration1007 : MigrationBase
{
    public override void Up()
    {
        DropOldTable<Migration1006.AlbumLike>();
        DropOldTable<Migration1006.AlbumArtifact>();
        DropOldTable<Migration1006.Album>();
        
        DropOldTable<Migration1006.ArtifactLike>();
        DropOldTable<Migration1006.ArtifactCommentReport>();
        DropOldTable<Migration1006.ArtifactCommentVote>();
        DropOldTable<Migration1006.ArtifactComment>();
        DropOldTable<Migration1006.ArtifactReport>();
        DropOldTable<Migration1006.Artifact>();
        
        DropOldTable<Migration1006.CreativeArtist>();
        DropOldTable<Migration1006.CreativeModifier>();
        DropOldTable<Migration1006.Creative>();
    }
    
    private void DropOldTable<TModel>()
    {
        var modelDef = typeof(TModel).GetModelMetadata();
        Db.ExecuteSql($@"PRAGMA foreign_keys = OFF;
DROP TABLE IF EXISTS {modelDef.ModelName}_old;
PRAGMA foreign_keys = ON;");
    }
}