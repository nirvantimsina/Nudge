using Nudge.Domain.Models;

namespace Nudge.Application.Models.KYC.ResponseModel.CreatorVerification;

public class CreatorVerificationResponseModel : StatusResponse
{
    public string? PrimaryPlatform { get; set; }
    public string? ChannelUrl { get; set; }
    public string? EstimatedAnnualIncome { get; set; }
}