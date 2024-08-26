   using System.Collections.Generic;
using ServiceStack;

namespace BlazorDiffusion.ServiceModel;

[ValidateIsAdmin]
public class MigrateOldArtifacts : IGet, IReturn<MigrateOldArtifactsResponse>
{
    public int? Limit { get; set; }
}
public class MigrateOldArtifactsResponse
{
    public List<string> Results { get; set; } = [];
    public List<string> Failed { get; set; } = [];
    public ResponseStatus? ResponseStatus { get; set; }
}