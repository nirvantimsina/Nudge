using Nudge.Domain.Models;

namespace Nudge.Application.Models.KYC.ResponseModel;

public class CreatorAddressResponseModel : StatusResponse
{
    public string PermDistrict { get; set; } = string.Empty;
    public string PermMunicipality { get; set; } = string.Empty;
    public int PermWardNo { get; set; }
    public string CurrentAddressLine { get; set; } = string.Empty;
    public string? CurrentDistrict { get; set; }
    public int? CurrentWard { get; set; }
    public string? Longitude { get; set; }
    public string? Latitude { get; set; }
}