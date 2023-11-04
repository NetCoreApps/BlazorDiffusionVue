using Microsoft.AspNetCore.Identity;
using ServiceStack;
using ServiceStack.DataAnnotations;
using System;

namespace BlazorDiffusion.ServiceModel;

// Add profile data for application users by adding properties to the ApplicationUser class
[Alias("AspNetUsers")]
public class AppUser : IdentityUser<int>
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? DisplayName { get; set; }
    public string? ProfileUrl { get; set; }
    [Input(Type = "file"), UploadTo("avatars")]
    public string? Avatar { get; set; } //overrides ProfileUrl
    public string? Handle { get; set; }
    public int? RefId { get; set; }
    public string RefIdStr { get; set; } = Guid.NewGuid().ToString();
    public bool IsArchived { get; set; }
    public DateTime? ArchivedDate { get; set; }
    public string? LastLoginIp { get; set; }
    public DateTime? LastLoginDate { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime ModifiedDate { get; set; } = DateTime.UtcNow;
}

[Alias("AspNetRoles")]
public class AppRole : IdentityRole<int>
{
    public AppRole() {}
    public AppRole(string roleName) : base(roleName) {}
}
