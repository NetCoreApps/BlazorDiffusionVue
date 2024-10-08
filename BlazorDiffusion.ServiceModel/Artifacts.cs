﻿using ServiceStack;
using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;

namespace BlazorDiffusion.ServiceModel;


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
    
    // No longer using hard-coded paths
    // public string? FilePathSmall { get; set; } // 118x118 or 118x207
    // public string? FilePathMedium { get; set; } // 288x288 or 288x504
    // public string? FilePathLarge { get; set; } // Original Size in .webp
    
    public Dictionary<string,string> Versions { get; set; } // Alternative Asset Versions
}

public class ArtifactResult : Artifact
{
    public string UserPrompt { get; set; }
    public List<string> ArtistNames { get; set; }
    public List<string> ModifierNames { get; set; }
    public int? PrimaryArtifactId { get; set; }
    public string OwnerRef { get; set; }
    public double? Similarity { get; set; }
}

/// <summary>
/// SQLite FTS table. Uses `rowid` as primary key
/// which is the Artifact.Id primary key.
///
/// One entry per Artifact while also
/// using data from Creative.
/// </summary>
public class ArtifactFts
{
    public int rowid { get; set; }
    public int CreativeId { get; set; }
    public string Prompt { get; set; }
    public string RefId { get; set; }
}

[Tag(Tag.Artifacts)]
public class SearchArtifacts : QueryDb<Artifact, ArtifactResult>
{
    public string? Query { get; set; }
    public string? Similar { get; set; }
    public string? By { get; set; }
    public string? User { get; set; }
    public string? Show { get; set; }
    public string? Modifier { get; set; }
    public string? Artist { get; set; }
    public string? Album { get; set; }
    public string? Source { get; set; }

    public SearchArtifacts Clone() => new()
    {
        Skip = Skip,
        Take = Take,
        OrderBy = OrderBy,
        OrderByDesc = OrderByDesc,
        Include = Include,
        Fields = Fields,
        Meta = Meta == null ? null : new(Meta),
        QueryParams = QueryParams == null ? null : new(QueryParams),
        Query = Query,
        Similar = Similar,
        By = By,
        User = User,
        Show = Show,
        Modifier = Modifier,
        Artist = Artist,
        Album = Album,
    };

    public override bool Equals(object? obj)
    {
        return obj is SearchArtifacts artifacts &&
               Skip == artifacts.Skip &&
               Take == artifacts.Take &&
               OrderBy == artifacts.OrderBy &&
               OrderByDesc == artifacts.OrderByDesc &&
               Include == artifacts.Include &&
               Fields == artifacts.Fields &&
               EqualityComparer<Dictionary<string, string>>.Default.Equals(Meta, artifacts.Meta) &&
               EqualityComparer<Dictionary<string, string>>.Default.Equals(QueryParams, artifacts.QueryParams) &&
               Query == artifacts.Query &&
               Similar == artifacts.Similar &&
               By == artifacts.By &&
               User == artifacts.User &&
               Show == artifacts.Show &&
               Modifier == artifacts.Modifier &&
               Artist == artifacts.Artist &&
               Album == artifacts.Album;
    }

    public bool Matches(SearchArtifacts artifacts)
    {
        return OrderBy == artifacts.OrderBy &&
               OrderByDesc == artifacts.OrderByDesc &&
               Include == artifacts.Include &&
               Fields == artifacts.Fields &&
               EqualityComparer<Dictionary<string, string>>.Default.Equals(Meta, artifacts.Meta) &&
               EqualityComparer<Dictionary<string, string>>.Default.Equals(QueryParams, artifacts.QueryParams) &&
               Query == artifacts.Query &&
               Similar == artifacts.Similar &&
               By == artifacts.By &&
               User == artifacts.User &&
               Show == artifacts.Show &&
               Modifier == artifacts.Modifier &&
               Artist == artifacts.Artist &&
               Album == artifacts.Album;
    }

    public List<string> GetDirtyFields(SearchArtifacts other)
    {
        var to = new List<string>();
        if (Skip != other.Skip) to.Add(nameof(Skip));
        if (Take != other.Take) to.Add(nameof(Take));
        if (OrderBy != other.OrderBy) to.Add(nameof(OrderBy));
        if (OrderByDesc != other.OrderByDesc) to.Add(nameof(OrderByDesc));
        if (Include != other.Include) to.Add(nameof(Include));
        if (!EqualityComparer<Dictionary<string, string>>.Default.Equals(Meta, other.Meta)) to.Add(nameof(Meta));
        if (!EqualityComparer<Dictionary<string, string>>.Default.Equals(QueryParams, other.QueryParams)) to.Add(nameof(QueryParams));
        if (Query != other.Query) to.Add(nameof(Query));
        if (Similar != other.Similar) to.Add(nameof(Similar));
        if (By != other.By) to.Add(nameof(By));
        if (User != other.User) to.Add(nameof(User));
        if (Show != other.Show) to.Add(nameof(Show));
        if (Modifier != other.Modifier) to.Add(nameof(Modifier));
        if (Artist != other.Artist) to.Add(nameof(Artist));
        if (Album != other.Album) to.Add(nameof(Album));
        return to;
    }
}

[Tag(Tag.Artifacts)]
public class QueryArtifacts : QueryDb<Artifact>
{
    public int? Id { get; set; }
    public List<int>? Ids { get; set; }
}

[Tag(Tag.Artifacts)]
[AutoApply(Behavior.AuditModify)]
[ValidateHasRole(AppRoles.Moderator)]
public class UpdateArtifact : IPatchDb<Artifact>, IReturn<Artifact>
{
    public int Id { get; set; }

    public bool? Nsfw { get; set; }
    public int? Quality { get; set; }
}

[Icon(Svg=Icons.Like)]
public class ArtifactLike
{
    [AutoIncrement]
    public long Id { get; set; }
        
    [References(typeof(Artifact))]
    public int ArtifactId { get; set; }
    //[References(typeof(AppUser))]
    public int AppUserId { get; set; }
    public DateTime CreatedDate { get; set; }
}

public class ArtifactLikeRef
{
    public string RefId { get; set; }
    public int ArtifactId { get; set; }
    public int AppUserId { get; set; }
    public DateTime CreatedDate { get; set; }
}

public class AlbumRef
{
    public string RefId { get; set; }
    public int OwnerId { get; set; }
    public string Name { get; set; }
    public string Slug { get; set; }
    public string Description { get; set; }
    public List<string> Tags { get; set; }
    public string? PrimaryArtifactRef { get; set; }
    public int ArtifactsCount { get; set; }
}
public class AlbumArtifactRef
{
    public string AlbumRefId { get; set; }
    public string ArtifactRefId { get; set; }
    public string? Description { get; set; }
}
public class AlbumLikeRef
{
    public string RefId { get; set; }
    public int AppUserId { get; set; }
    public DateTime CreatedDate { get; set; }
}


[Tag(Tag.Artifacts)]
[AutoFilter(QueryTerm.Ensure, nameof(ArtifactLike.AppUserId), Eval = "userAuthId")]
[ValidateIsAuthenticated]
public class QueryArtifactLikes : QueryDb<ArtifactLike>
{
}

[Tag(Tag.Artifacts)]
[ValidateIsAuthenticated]
public class CreateArtifactLike : ICreateDb<ArtifactLike>, IReturn<IdResponse>
{
    [ValidateGreaterThan(0)]
    public int ArtifactId { get; set; }
}

[Tag(Tag.Artifacts)]
[ValidateIsAuthenticated]
public class DeleteArtifactLike : IDeleteDb<ArtifactLike>, IReturnVoid
{
    [ValidateGreaterThan(0)]
    public int ArtifactId { get; set; }
}

[Icon(Svg = Icons.Report)]
public class ArtifactReport
{
    [AutoIncrement]
    public long Id { get; set; }

    [References(typeof(Artifact))]
    public int ArtifactId { get; set; }
    //[References(typeof(AppUser))]
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

[Tag(Tag.Artifacts)]
[ValidateIsAuthenticated]
[ValidateIsAdmin]
public class QueryArtifactReports : QueryDb<ArtifactReport>
{
    public int? ArtifactId { get; set; }
}

[Tag(Tag.Artifacts)]
[AutoPopulate(nameof(ArtifactReport.AppUserId), Eval = "userAuthId")]
[AutoPopulate(nameof(ArtifactReport.CreatedDate), Eval = "utcNow")]
[ValidateIsAuthenticated]
public class CreateArtifactReport : ICreateDb<ArtifactReport>, IReturn<ArtifactReport>
{
    [ValidateGreaterThan(0)]
    public int ArtifactId { get; set; }
    public ReportType Type { get; set; }
    public string? Description { get; set; }
}

[Tag(Tag.Artifacts)]
[AutoPopulate(nameof(ArtifactReport.AppUserId), Eval = "userAuthId")]
[ValidateIsAdmin]
public class UpdateArtifactReport : IPatchDb<ArtifactReport>, IReturn<ArtifactReport>
{
    [ValidateGreaterThan(0)]
    public int ArtifactId { get; set; }
    public ReportType? Type { get; set; }
    public string? Description { get; set; }
}

[Tag(Tag.Artifacts)]
[ValidateIsAuthenticated]
[ValidateIsAdmin]
public class DeleteArtifactReport : IDeleteDb<ArtifactReport>, IReturnVoid
{
    [ValidateGreaterThan(0)]
    public int ArtifactId { get; set; }
}

[Tag(Tag.Artifacts)]
[Route("/download/artifact/{RefId}")]
public class DownloadArtifact : IGet, IReturn<byte[]>
{
    public string RefId { get; set; }
}

[Tag(Tag.Artifacts)]
public class FindSimilarArtifacts
{
    public string ArtifactId { get; set; }
    public int? Skip { get; set; }
    public int? Take { get; set; }
}
public class FindSimilarArtifactsResponse
{
    public List<Artifact> Results { get; set; }
}

[Tag(Tag.Artifacts)]
public class SearchData : IReturn<SearchDataResponse> {}
public class SearchDataResponse
{
    public List<ArtistInfo> Artists { get; set; }
    public List<ModifierInfo> Modifiers { get; set; }
}


public class ArtistInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string? Type { get; set; }

    public override bool Equals(object? obj) => obj is ArtistInfo info && Id == info.Id && Name == info.Name;
    public override int GetHashCode() => HashCode.Combine(Id, Name);
}
public class ModifierInfo
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }

    public override bool Equals(object? obj) => obj is ModifierInfo info &&
                                                Id == info.Id && Name == info.Name && Category == info.Category;
    public override int GetHashCode() => HashCode.Combine(Id, Name, Category);
}

public enum ArtifactSize
{
    Original,
    Small,
    Medium,
    Large,
}

