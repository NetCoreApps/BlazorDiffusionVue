using BlazorDiffusion.Data;
using BlazorDiffusion.Migrations;
using BlazorDiffusion.ServiceInterface;
using BlazorDiffusion.ServiceModel;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ProtoBuf.Meta;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.DataAnnotations;
using ServiceStack.OrmLite;
using SQLitePCL;
using static System.Formats.Asn1.AsnWriter;

[assembly: HostingStartup(typeof(BlazorDiffusion.ConfigureDbMigrations))]

namespace BlazorDiffusion;

// Code-First DB Migrations: https://docs.servicestack.net/ormlite/db-migrations
public class ConfigureDbMigrations : IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureAppHost(appHost => {
            var migrator = new Migrator(appHost.Resolve<IDbConnectionFactory>(), typeof(Migration1000).Assembly);
            AppTasks.Register("migrate", _ =>
            {
                var log = appHost.GetApplicationServices().GetRequiredService<ILogger<ConfigureDbMigrations>>();

                log.LogInformation("Running EF Migrations...");
                var scopeFactory = appHost.GetApplicationServices().GetRequiredService<IServiceScopeFactory>();
                using (var scope = scopeFactory.CreateScope())
                {
                    using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                    var dbJustCreated = dbContext.Database.EnsureCreated();
                    dbContext.Database.Migrate();

                    // Only seed users if DB was just created
                    if (!dbContext.Users.Any())
                    {
                        log.LogInformation("Adding Seed Users...");
                        AddSeedUsers(scope.ServiceProvider).Wait();
                    }
                }

                log.LogInformation("Running OrmLite Migrations...");
                migrator.Run();
            });
            AppTasks.Register("migrate.revert", args => migrator.Revert(args[0]));
            AppTasks.Register("migrate.users", _ => {
                var log = appHost.GetApplicationServices().GetRequiredService<ILogger<ConfigureDbMigrations>>();

                log.LogInformation("Running migrate.users...");
                var scopeFactory = appHost.GetApplicationServices().GetRequiredService<IServiceScopeFactory>();
                using var scope = scopeFactory.CreateScope();
                using var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
                using var db = scope.ServiceProvider.GetRequiredService<IDbConnectionFactory>().Open();
                var migrateUsers = db.Select(db.From<OldAppUser>().OrderBy(x => x.Id));

                log.LogInformation("Migrating {Count} Existing ServiceStack Users to Identity Auth Users...", migrateUsers.Count);
                MigrateExistingUsers(dbContext, scope.ServiceProvider, migrateUsers).Wait();
            });
            AppTasks.Run();

            using var db = migrator.DbFactory.OpenDbConnection();
            Scores.Load(db);
            using var dbAnalytics = migrator.DbFactory.OpenDbConnection(Databases.Analytics);
            Scores.LoadAnalytics(dbAnalytics);
        });

    private async Task AddSeedUsers(IServiceProvider services)
    {
        //initializing custom roles 
        var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        string[] allRoles = AppRoles.All;

        void assertResult(IdentityResult result)
        {
            if (!result.Succeeded)
                throw new Exception(result.Errors.First().Description);
        }

        async Task EnsureUserAsync(AppUser user, string password, string[]? roles = null)
        {
            var existingUser = await userManager.FindByEmailAsync(user.Email!);
            if (existingUser != null) return;

            await userManager!.CreateAsync(user, password);
            if (roles?.Length > 0)
            {
                var newUser = await userManager.FindByEmailAsync(user.Email!);
                assertResult(await userManager.AddToRolesAsync(user, roles));
            }
        }

        foreach (var roleName in allRoles)
        {
            var roleExist = await roleManager.RoleExistsAsync(roleName);
            if (!roleExist)
            {
                //create the roles and seed them to the database: Question 1
                assertResult(await roleManager.CreateAsync(new AppRole(roleName)));
            }
        }

        foreach (var user in Users.All)
        {
            var appUser = new AppUser
            {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                UserName = user.Email,
                Handle = user.Handle,
                Avatar = user.Avatar,
                EmailConfirmed = true,
            };
            await EnsureUserAsync(appUser, "p@55wOrd", user.Roles);
        }
    }

    private async Task MigrateExistingUsers(ApplicationDbContext dbContext, IServiceProvider services, 
        List<OldAppUser> migrateUsers, string tempPassword="p@55wOrd")
    {
        var userManager = services.GetRequiredService<UserManager<AppUser>>();
        var now = DateTime.UtcNow;

        foreach (var user in migrateUsers)
        {
            var appUser = new AppUser
            {
                Id = user.Id,
                UserName = user.Email,
                Email = user.Email,
                DisplayName = user.DisplayName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Handle = user.Handle,
                ProfileUrl = user.ProfileUrl,
                Avatar = user.Avatar,
                RefIdStr = user.RefIdStr ?? Guid.NewGuid().ToString(),
                LockoutEnabled = true,
                LockoutEnd = user.LockedDate != null ? now.AddYears(10) : now,
                LastLoginDate = user.LastLoginDate,
                LastLoginIp = user.LastLoginIp,
                CreatedDate = user.CreatedDate,
                ModifiedDate = user.ModifiedDate,
                EmailConfirmed = true,
            };
            await userManager.CreateAsync(appUser, tempPassword);
            if (user.PasswordHash != null)
            {
                // Update raw PasswordHash (which uses older ASP.NET Identity v2 format), after users successfully signs in
                // the password will be re-hashed using the latest ASP.NET Identity v3 implementation
                dbContext.Users
                    .Where(x => x.Id == user.Id)
                    .ExecuteUpdate(setters => setters.SetProperty(x => x.PasswordHash, user.PasswordHash));
            }
        }
    }

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
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string? ProfileUrl { get; set; }
        public string? Avatar { get; set; } //overrides ProfileUrl
        public string? LastLoginIp { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string RefIdStr { get; set; }
        public DateTime? LockedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}