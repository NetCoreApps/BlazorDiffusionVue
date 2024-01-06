using System;
using System.Data;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using ServiceStack;
using ServiceStack.OrmLite;
using BlazorDiffusion.ServiceModel;

namespace BlazorDiffusion.ServiceInterface;

public class AppUserQuotas
{
    static HashSet<string> UnrestrictedRoles =
    [
        AppRoles.Admin,
        AppRoles.Moderator
    ];

    Dictionary<string, int> DailyRoleQuotas { get; } = new()
    {
        [AppRoles.Creator] = 320,
    };

    const int DefaultDailyQuota = 160; //80

    /// <summary>
    /// Future:
    /// Square    = 1 credit    (1024 x 1024)  0.4
    /// Portrait  = 3 credits   (768  x 1344)  1.1
    /// Landscape = 3 credits   (1344 x 768)   1.1
    /// 
    /// Steps: 
    ///   50   = * 1
    ///   100  = * 2
    ///   150  = * 3
    /// </summary>
    public int CalculateCredits(ImageGeneration request) => request.Images *
        (request.Width > 1024
            ? 3
            : request.Height > 1024
                ? 3
                : 1);

    // 12 credits = 4x Images x 3 credits (Portrait)
    public string ToRequestDetails(ImageGeneration request) => $"{CalculateCredits(request)} credits = {request.Images}x Images x " +
        (request.Width > 1024
            ? "3 credits (Landscape)"
            : request.Height > 1024
                ? "3 credits (Portrait)"
                : "1 credit (Square)");

    public async Task<QuotaError?> ValidateQuotaAsync(IDbConnection db, ImageGeneration request, int userId, ICollection<string> userRoles)
    {
        var requestCredits = CalculateCredits(request);
        var quotaError = await ValidateQuotaAsync(db, requestCredits, userId, userRoles);
        if (quotaError != null)
        {
            quotaError.RequestedDetails = ToRequestDetails(request);
        }
        return quotaError;
    }

    public int? GetDailyQuota(ICollection<string> userRoles)
    {
        if (userRoles.Any(x => UnrestrictedRoles.Contains(x)))
            return null;

        var dailyQuota = DefaultDailyQuota;
        foreach (var role in userRoles)
        {
            if (DailyRoleQuotas.TryGetValue(role, out var roleQuota) && roleQuota > dailyQuota)
                dailyQuota = roleQuota;
        }
        return dailyQuota;
    }

    public async Task<int> GetCreditsUsedAsync(IDbConnection db, int userId, DateTime since)
    {
        var creditsUsed = await db.ScalarAsync<int>(db.From<Artifact>()
            .Join<Creative>((x,y) => x.CreativeId == y.Id)
            .Where<Creative>(x => x.OwnerId == userId && x.CreatedDate >= since)
            .Select(x => new {
                Credits = Sql.Sum(x.Width > 512
                    ? 3
                    : x.Height > 512
                        ? 3
                        : 1)
            }));
        return creditsUsed;
    }

    async Task<QuotaError?> ValidateQuotaAsync(IDbConnection db, int requestedCredits, int userId, ICollection<string> userRoles)
    {
        var dailyQuota = GetDailyQuota(userRoles);
        if (dailyQuota == null)
            return null;

        var startOfDay = DateTime.UtcNow.Date;
        var creditsUsed = await GetCreditsUsedAsync(db, userId, since:startOfDay);

        if (creditsUsed + requestedCredits > dailyQuota)
        {
            var timeRemaining = startOfDay.AddDays(1) - DateTime.UtcNow;
            var ret = new QuotaError
            {
                ErrorCode = AppErrors.QuotaExceeded,
                Message = "Daily Quota Exceeded",
                TimeRemaining = timeRemaining,
                CreditsUsed = creditsUsed,
                CreditsRequested = requestedCredits,
                DailyQuota = dailyQuota.Value,
                CreditsRemaining = dailyQuota.Value - creditsUsed,
            };
            return ret;
        }

        return null;
    }
}

public static class AppUserQuotasUtils
{
    public static HttpError ToHttpError(this QuotaError error, ResponseStatus status) => 
        new(status, System.Net.HttpStatusCode.TooManyRequests) {
            Headers = {
                ["Retry-After"] = error.TimeRemaining.TotalSeconds.ToString(),
            }
        };
}
