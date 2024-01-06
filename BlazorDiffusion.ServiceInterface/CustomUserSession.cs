using System.Threading.Tasks;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Identity;
using ServiceStack;
using ServiceStack.Web;
using BlazorDiffusion.ServiceModel;

namespace BlazorDiffusion.ServiceInterface;

// Add any additional metadata properties you want to store in the Users Typed Session
public class CustomUserSession : AuthUserSession
{
    public string? Handle { get; set; }
    public string? Avatar { get; set; }

    public int GetUserId() => UserAuthId.ToInt();

    public override void PopulateFromClaims(IRequest httpReq, ClaimsPrincipal principal)
    {
        Handle = principal.FindFirstValue(JwtClaimTypes.NickName);
        Avatar = principal.FindFirstValue(JwtClaimTypes.Picture);
    }
}

public class AdditionalUserClaimsPrincipalFactory(
    UserManager<AppUser> userManager,
    RoleManager<AppRole> roleManager,
    IOptions<IdentityOptions> optionsAccessor)
    : UserClaimsPrincipalFactory<AppUser, AppRole>(userManager, roleManager, optionsAccessor)
{
    public override async Task<ClaimsPrincipal> CreateAsync(AppUser user)
    {
        var principal = await base.CreateAsync(user);
        var identity = (ClaimsIdentity)principal.Identity!;

        var claims = new List<Claim>();
        if (user.Handle != null)
            claims.Add(new Claim(JwtClaimTypes.NickName, user.Handle));
        if (user.Avatar != null)
            claims.Add(new Claim(JwtClaimTypes.Picture, user.Avatar));

        identity.AddClaims(claims);
        return principal;
    }
}
