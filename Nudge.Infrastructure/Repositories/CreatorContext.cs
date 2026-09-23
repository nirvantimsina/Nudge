// Nudge.Infrastructure/Services/CreatorContext.cs
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Infrastructure.Services;

public class CreatorContext : ICreatorContext
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CreatorContext(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    private ClaimsPrincipal? User => _httpContextAccessor.HttpContext?.User;

    public int CreatorId
    {
        get
        {
            var claim = User?.FindFirst("creatorid")?.Value;
            return int.TryParse(claim, out var id) ? id : 0;
        }
    }

    public int UserId
    {
        get
        {
            var claim = User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return int.TryParse(claim, out var id) ? id : 0;
        }
    }

    public bool IsAuthenticated => CreatorId > 0;
}