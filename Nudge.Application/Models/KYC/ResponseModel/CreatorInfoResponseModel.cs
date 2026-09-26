using Nudge.Domain.Models;

namespace Nudge.Application.Models.KYC.ResponseModel.CreatorInfo;

public class CreatorInfoResponseModel : StatusResponse
{
    public string FullName { get; set; } = null!;
    public DateOnly? DobAd { get; set; }
    public string? DobBs { get; set; }
    public int Gender { get; set; }
    public string? FatherName { get; set; }
    public string? MotherName { get; set; }
    public string? GrandfatherName { get; set; }
    public string? SpouseName { get; set; }
    public bool IsActive { get; set; }
}
