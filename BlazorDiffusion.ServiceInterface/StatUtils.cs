using ServiceStack;
using ServiceStack.Auth;
using ServiceStack.Web;
using System;
using BlazorDiffusion.ServiceModel;

namespace BlazorDiffusion;

public static class StatUtils
{
    public static T WithRequest<T>(this T stat, IRequest req) where T : StatBase
    {
        var userId = req.GetUserId();
        if (userId != null)
            stat.AppUserId = userId;

        stat.RawUrl = req.RawUrl;
        stat.RemoteIp = req.RemoteIp;
        stat.CreatedDate = DateTime.UtcNow;

        return stat;
    }
}
