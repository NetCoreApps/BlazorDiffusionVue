using BlazorDiffusion.Components;
using BlazorDiffusion.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ServiceStack.Data;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;

namespace BlazorDiffusion.Migrations;

public class Migration1006 : MigrationBase
{

    [Alias("AppUser")]
    public class OldAppUser
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? Handle { get; set; }
        public string Company { get; set; }
        
        public string Email { get; set; }

        public string? ProfileUrl { get; set; }

        [Input(Type = "file"), UploadTo("avatars")]
        public string? Avatar { get; set; } //overrides ProfileUrl

        public string? LastLoginIp { get; set; }
        public bool IsArchived { get; set; }
        public DateTime? ArchivedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime? BirthDate { get; set; }
        public string BirthDateRaw { get; set; }
        public string Address { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string Culture { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string Language { get; set; }
        public string MailAddress { get; set; }
        public string Nickname { get; set; }
        public string PostalCode { get; set; }
        public string TimeZone { get; set; }
        public Dictionary<string, string> Meta { get; set; }
        public string PrimaryEmail { get; set; }
        
        public string Salt { get; set; }
        
        public string PasswordHash { get; set; }
        
        public string DigestHa1Hash { get; set; }

        public List<string> Roles { get; set; }
        public List<string> Permissions { get; set; }
        public int? RefId { get; set; }
        public string RefIdStr { get; set; }
        public int InvalidLoginAttempts { get; set; }
        public DateTime? LastLoginAttempt { get; set; }
        public DateTime? LockedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }

    [Alias("AspNetUsers")]
    public class AppUser
    {
        public int Id { get; set; }
    }
    
    [Icon(Svg = Icons.Artifact)]
    public class Artifact : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Creative))]
        public int CreativeId { get; set; }
        public string FileName { get; set; }

        [Format(FormatMethods.Attachment)]
        public string FilePath { get; set; }
        public string ContentType { get; set; }

        [Format(FormatMethods.Bytes)]
        public long ContentLength { get; set; }

        public int Width { get; set; }
        public int Height { get; set; }
        public ulong Seed { get; set; }
        public string Prompt { get; set; }
        public bool? Nsfw { get; set; }
        public Int64? AverageHash { get; set; }
        public Int64? PerceptualHash { get; set; }
        public Int64? DifferenceHash { get; set; }
        // Dominant Color to show before download
        public string? Background { get; set; }
        // Low Quality Image Placeholder for fast load in
        public string? Lqip { get; set; }
        // Set Low Quality images to:
        //  - Malformed: -1
        //  - Blurred: -2
        //  - LowQuality: -3
        public int Quality { get; set; }
        public int LikesCount { get; set; } // duplicated aggregate counts
        public int AlbumsCount { get; set; }
        public int DownloadsCount { get; set; }
        public int SearchCount { get; set; }
        public int TemporalScore { get; set; } // bonus score given to recent creations
        public int Score { get; set; }
        public int Rank { get; set; }
        public string RefId { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? DeletedDate { get; set; }
        public string DeletedBy { get; set; }
        public string? FilePathSmall { get; set; } // 118x118 or 118x207
        public string? FilePathMedium { get; set; } // 288x288 or 288x504
        public string? FilePathLarge { get; set; } // Original Size in .webp
        public Dictionary<string,string> Versions { get; set; } // Alternative Asset Versions
    }
    
    public class ArtifactLike
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Artifact))]
        public int ArtifactId { get; set; }

        [References(typeof(AppUser))]
        public int AppUserId { get; set; }

        public DateTime CreatedDate { get; set; }
    }
    
    public class Album : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Slug { get; set; }
        public List<string> Tags { get; set; }
        public string RefId { get; set; }
        [References(typeof(AppUser))]
        public int OwnerId { get; set; }
        public string OwnerRef { get; set; }
        public int? PrimaryArtifactId { get; set; }
        public bool Private { get; set; }
        public int? Rating { get; set; }
        public int LikesCount { get; set; } // duplicated aggregate counts
        public int DownloadsCount { get; set; }
        public int SearchCount { get; set; }
        public int Score { get; set; }
        public int Rank { get; set; }
        public int? PrefColumns { get; set; }
        [Reference]
        public List<AlbumArtifact> Artifacts { get; set; }
    }
    
    public class AlbumArtifact
    {
        [AutoIncrement]
        public int Id { get; set; }

        [References(typeof(Album))]
        public int AlbumId { get; set; }
        [References(typeof(Artifact))]
        public int ArtifactId { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        [Reference]
        public Artifact? Artifact { get; set; }
    }
    
    public class AlbumLike
    {
        [AutoIncrement]
        public long Id { get; set; }

        [References(typeof(Album))]
        public int AlbumId { get; set; }
        [References(typeof(AppUser))]
        public int AppUserId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
    
    public class Creative : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }

        public string UserPrompt { get; set; }
        public string Prompt { get; set; }
    
        public int Images { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public int Steps { get; set; }

        public int? CuratedArtifactId { get; set; }
        public int? PrimaryArtifactId { get; set; }

        public List<string> ArtistNames { get; set; }
        public List<string> ModifierNames { get; set; }

        [Reference]
        public List<CreativeArtist> Artists { get; set; }
        [Reference]
        public List<CreativeModifier> Modifiers { get; set; }

        [Reference]
        [Format("presentFilesPreview")]
        public List<Artifact> Artifacts { get; set; }
    
        public string? Error { get; set; }
    
        [References(typeof(AppUser))]
        public int? OwnerId { get; set; }
        public string? OwnerRef { get; set; }
        public string? Key { get; set; }

        public bool Curated { get; set; }
        public int? Rating { get; set; }
        public bool Private { get; set; }
        [Default(0)]
        public int Score { get; set; }
        [Default(0)]
        public int Rank { get; set; }
        public string RefId { get; set; }
        public string RequestId { get; set; }
        public string EngineId { get; set; }
    }
    
    public class CreativeModifier
    {
        [AutoIncrement]
        public int Id { get; set; }
        [References(typeof(Creative))]
        public int CreativeId { get; set; }
        [References(typeof(Modifier))]
        public int ModifierId { get; set; }
    
        [Reference]
        public Modifier Modifier { get; set; }
    }
    
    public class Modifier : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string? Description { get; set; }
        [Default(0)]
        public int Score { get; set; }
        [Default(0)]
        public int Rank { get; set; }
    }
    
    public class CreativeArtist
    {
        [AutoIncrement]
        public int Id { get; set; }
        [References(typeof(Creative))]
        public int CreativeId { get; set; }
        [References(typeof(Artist))]
        public int ArtistId { get; set; }
    
        [Reference]
        public Artist Artist { get; set; }
    }
    
    public class Artist : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string LastName { get; set; }
        public int? YearDied { get; set; }
        public List<string>? Type { get; set; }
        [Default(0)]
        public int Score { get; set; }
        [Default(0)]
        public int Rank { get; set; }
    }
    
    public class ArtifactCommentReport
    {
        [AutoIncrement]
        public long Id { get; set; }

        [References(typeof(ArtifactComment))]
        public int ArtifactCommentId { get; set; }
        [References(typeof(AppUser))]
        public int AppUserId { get; set; }
        public PostReport PostReport { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
    }
    
    public enum PostReport
    {
        Offensive,
        Spam,
        Nudity,
        Illegal,
        Other,
    }
    
    public class ArtifactComment : AuditBase
    {
        [AutoIncrement]
        public int Id { get; set; }
        public int ArtifactId { get; set; }
        public int? ReplyId { get; set; }
        public string Content { get; set; }
        [Default(0)]
        public int UpVotes { get; set; }
        [Default(0)]
        public int DownVotes { get; set; }
        [Default(0)]
        public int Votes { get; set; }
        public string? FlagReason { get; set; }
        public string? Notes { get; set; }
        public string RefId { get; set; }
        public int AppUserId { get; set; }
    }
    
    [UniqueConstraint(nameof(ArtifactCommentId), nameof(AppUserId))]
    public class ArtifactCommentVote
    {
        [AutoIncrement]
        public long Id { get; set; }

        [References(typeof(ArtifactComment))]
        public int ArtifactCommentId { get; set; }
        [References(typeof(AppUser))]
        public int AppUserId { get; set; }
        public int Vote { get; set; } // -1 / 1
        public DateTime CreatedDate { get; set; }
    }
    
    public class ArtifactReport
    {
        [AutoIncrement]
        public long Id { get; set; }

        [References(typeof(Artifact))]
        public int ArtifactId { get; set; }
        [References(typeof(AppUser))]
        public int AppUserId { get; set; }

        [Reference]
        public Artifact Artifact { get; set; }

        public ReportType Type { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? Notes { get; set; }
        public DateTime? ActionedDate { get; set; }
        public string? ActionedBy { get; set; }
    }
    public enum ReportType
    {
        Nsfw,
        Malformed,
        Blurred,
        LowQuality,
        Other,
    }
    
    public override void Up()
    {
        var appHost = HostContext.AppHost;
        var log = appHost.GetApplicationServices().GetRequiredService<ILogger<ConfigureDbMigrations>>();

        // Since renaming tables forces FKs to match, we need to recreate them in order
        // of dependency from least to most dependent for any table that references AppUser.
        // Drop and create FK for Creative
        log.LogInformation("Migrating FKs from AppUser to AspNetUsers for Creative...");
        ReplaceForeignKeyConstraint<Creative>();
        
        ReplaceForeignKeyConstraint<Artifact>();
        
        // Drop and create FK for Album
        log.LogInformation("Migrating FKs from AppUser to AspNetUsers for Album...");
        ReplaceForeignKeyConstraint<Album>();
        
        log.LogInformation("Migrating FKs from AppUser to AspNetUsers for ArtifactLike...");
        ReplaceForeignKeyConstraint<ArtifactLike>();
        
        ReplaceForeignKeyConstraint<ArtifactComment>();
        
        ReplaceForeignKeyConstraint<ArtifactCommentReport>();
        
        // Drop and create FK for AlbumArtifact
        log.LogInformation("Migrating FKs for AlbumArtifact...");
        ReplaceForeignKeyConstraint<AlbumArtifact>();
        
        // Drop and create FK for AlbumLike
        log.LogInformation("Migrating FKs from AppUser to AspNetUsers for AlbumLike...");
        ReplaceForeignKeyConstraint<AlbumLike>();
        
        ReplaceForeignKeyConstraint<CreativeModifier>();
        
        ReplaceForeignKeyConstraint<CreativeArtist>();
        
        // Drop and create FK for ArtifactCommentVote
        log.LogInformation("Migrating FKs from AppUser to AspNetUsers for ArtifactCommentVote...");
        ReplaceForeignKeyConstraint<ArtifactCommentVote>();
        
        // Drop and create FK for ArtifactReport
        log.LogInformation("Migrating FKs from AppUser to AspNetUsers for ArtifactReport...");
        ReplaceForeignKeyConstraint<ArtifactReport>();
    }

    /// <summary>
    /// SQLite can't drop/recreate constraints, so we need to follow this SQL process.
    /// Rename the table, create the new table, copy the data, drop the old table.
    /// Eg, for Employee:
    /// ```
    /// PRAGMA foreign_keys=off;
    ///
    /// BEGIN TRANSACTION;
    ///
    /// ALTER TABLE Employee RENAME TO Employee_old;
    ///
    /// CREATE TABLE Employee (
    ///     EmpID INT NOT NULL,
    ///     Name VARCHAR(255),
    /// City VARCHAR(100),
    /// Age INT,
    ///     Salary DECIMAL(18,2)
    ///     );
    ///
    /// INSERT INTO Employee SELECT * FROM Employee_old;
    ///
    /// COMMIT;
    ///
    /// PRAGMA foreign_keys=on;
    /// ```
    /// One limitation is it assumes order of columns is the same.
    /// </summary>
    /// <param name="fieldName"></param>
    /// <param name="refFieldName"></param>
    /// <typeparam name="TModel"></typeparam>
    /// <typeparam name="TRef"></typeparam>
    private void ReplaceForeignKeyConstraint<TModel>()
    {
        var modelDef = typeof(TModel).GetModelMetadata();
        
        var createTable = SqliteDialect.Provider.ToCreateTableStatement(typeof(TModel));

        var sql = $@"PRAGMA foreign_keys = OFF;
ALTER TABLE {modelDef.ModelName} RENAME TO {modelDef.ModelName}_old;
{createTable}
INSERT INTO {modelDef.ModelName} SELECT * FROM {modelDef.ModelName}_old;
-- DROP TABLE {modelDef.ModelName}_old;
PRAGMA foreign_keys = ON;";
        Db.ExecuteSql(sql);
    }
}