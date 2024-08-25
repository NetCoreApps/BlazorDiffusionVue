using System.IO;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.Text;
using ServiceStack.Jobs;

namespace BlazorDiffusion.Tests;

public class JobTests
{
    IDbConnectionFactory ResolveDbFactory() => new ConfigureDb().ConfigureAndResolve<IDbConnectionFactory>();

    [Test]
    public void Dump_ScheduledTasks()
    {
        var hostDir = "../../../../BlazorDiffusion";
        var jobsPath = Path.GetFullPath(Path.Combine(hostDir, "App_Data/jobs/jobs.db"));

        var dbFactory = ResolveDbFactory();
        dbFactory.RegisterConnection("jobs.db", 
            $"DataSource={jobsPath};Cache=Shared", SqliteDialect.Provider);
        using var db = dbFactory.OpenDbConnection("jobs.db");

        var rows = db.Select<ScheduledTask>();
        rows.PrintDump();
    }
    
}