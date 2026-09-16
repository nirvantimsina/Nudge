using System.Text.Json;
using Nudge.Domain.Models;

namespace Nudge.Application.Models.Public.Creators.ResponseModel;

public class CreatorCardResponseModel : StatusResponse
{
    public int ID { get; set; }
    public string? Slug { get; set; }
    public string? Name { get; set; }
    public string? FirstName { get; set; }
    public string? Bio { get; set; }
    public string? Avatar { get; set; }
    public bool IsVerified { get; set; }

    public string? Tiers { get; set; }
    public string? Recent_Nudge { get; set; }

    public object ToFrontendPayload()
    {
        return new
        {
            id = this.ID.ToString(),
            slug = this.Slug,
            name = this.Name,
            firstname = this.FirstName,
            bio = this.Bio,
            avatar = this.Avatar,
            isverified = this.IsVerified,
            tiers = string.IsNullOrEmpty(this.Tiers) ? new object[] {} : JsonSerializer.Deserialize<object>(this.Tiers),
            recentNudge = string.IsNullOrEmpty(this.Recent_Nudge) ? new object[] {} : JsonSerializer.Deserialize<object>(this.Recent_Nudge)
        };
    }
}