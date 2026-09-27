using Nudge.Domain.Models;

namespace Nudge.Application.Models.Loom.ResponseModel;

public class LoomLinkResponseModel : StatusResponse
{
    public string? Avatar { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Slug { get; set; }
    public string? CategoryName { get; set; }
    public bool IsVerified { get; set; }
    public List<LoomLinkItem> LinksJson { get; set; } = new();
}

public class LoomLinkItem
{
    public string? Link { get; set; }
    public string? Title { get; set; }
    public int IconId { get; set; }
    public int DisplayOrder { get; set; }
}