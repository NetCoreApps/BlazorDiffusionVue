using NUnit.Framework;
using ServiceStack.OrmLite;
using ServiceStack;
using ServiceStack.Data;
using System.Runtime.Serialization;
using System.Collections.Generic;
using System;
using ServiceStack.DataAnnotations;
using ServiceStack.Auth;
using ServiceStack.Text;
using ServiceStack.Logging;
using System.IO;

namespace BlazorDiffusion.Tests;

[TestFixture, Explicit]
public class MigrateUsersTasks
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
        [Index(Unique = true)]
        public string? Handle { get; set; }
        [Index]
        public string Email { get; set; }
        public string? ProfileUrl { get; set; }
        public string? Avatar { get; set; } //overrides ProfileUrl
        public string? LastLoginIp { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string RefIdStr { get; set; }
        public DateTime? LockedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
    [Test]
    public void Migrate_AuthUsers_to_IdentityUsers()
    {
        //var hostDir = Path.GetFullPath(TestConfig.GetHostDir());
        //Directory.SetCurrentDirectory(hostDir);


        var dbFactory = TestConfig.ResolveDbFactory();
        using var db = dbFactory.Open();

        var existingEmails = db.ColumnDistinct<string>(db.From<ServiceModel.AppUser>().Select(x => x.Email));
        existingEmails.PrintDump();

        //var existingUsers = db.Select<ServiceModel.AppUser>();
        //existingUsers.PrintDump();

        //var remainingUsers = db.Select(db.From<AppUser>().Where(x => !existingEmails.Contains(x.Email)).OrderBy(x => x.Id));
        //$"Migrating {remainingUsers.Count} users".Print();
        //remainingUsers.PrintDump();
    }
}
