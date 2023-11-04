using ServiceStack;
using ServiceStack.Data;
using System.IO;

namespace BlazorDiffusion.Tests;

public class TestConfig
{
    public static IDbConnectionFactory ResolveDbFactory()
    {
        var hostDir = Path.GetFullPath(GetHostDir());
        Directory.SetCurrentDirectory(hostDir);
        return new ConfigureDb().ConfigureAndResolve<IDbConnectionFactory>(
            hostDir: hostDir,
            setHostDir:false);
    }
    public static string GetHostDir() => "../../../../BlazorDiffusion";
}
