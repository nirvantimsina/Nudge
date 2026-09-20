// Nudge.Presentation/Extensions/AuthCookieExtensions.cs
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace Nudge.Presentation.Extensions;

public static class AuthCookieExtensions
{
    public const string CookieName = "nudge_auth_token";

    public static void SetAuthCookie(this HttpResponse response, string token, IWebHostEnvironment env)
    {
        var isDev = env.IsDevelopment();

        response.Cookies.Append(CookieName, token, new CookieOptions
        {
            HttpOnly = true,
            Secure = !isDev,
            SameSite = isDev ? SameSiteMode.Lax : SameSiteMode.None,
            Path = "/",
            Expires = DateTimeOffset.UtcNow.AddHours(8)
        });
    }

    public static void ClearAuthCookie(this HttpResponse response, IWebHostEnvironment env)
    {
        var isDev = env.IsDevelopment();

        response.Cookies.Delete(CookieName, new CookieOptions
        {
            HttpOnly = true,
            Secure = !isDev,
            SameSite = isDev ? SameSiteMode.Lax : SameSiteMode.None,
            Path = "/"
        });
    }
}