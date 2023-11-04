using BlazorDiffusion.ServiceModel;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.Migrations;

[Description("Add Artifact Sizes")]
public class Migration1005 : MigrationBase
{
    public class Artifact
    {
        public string? FilePathSmall { get; set; } // 118x118 or 118x207
        public string? FilePathMedium { get; set; } // 288x288 or 288x504
        public string? FilePathLarge { get; set; } // Original Size in .webp
        public Dictionary<string, string> Versions { get; set; } // Alternative Asset Versions
    }

    public override void Up()
    {
        Db.Migrate<Artifact>();
    }

    public override void Down()
    {
        Db.Revert<Artifact>();
    }
}
