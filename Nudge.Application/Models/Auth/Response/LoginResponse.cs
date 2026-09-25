using Nudge.Domain.Models;

namespace Nudge.Application.Models.Auth.Response;

public class LoginResponse : StatusResponse
{
    public string? Token { get; set; }
    public string? UserName { get; set; }
    public string? Name { get; set; }
    public string? RoleName { get; set; }
    public int RoleId { get; set; }
    public List<string> Permissions { get; set; } = [];
    public List<MenuListResponseModel> MenuList { get; set; } = [];
    public int CreatoId { get; set; }
}




