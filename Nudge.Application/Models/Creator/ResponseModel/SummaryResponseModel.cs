namespace Nudge.Application.Models.Creator.ResponseModel;

public class CreatorSummaryResponseModel
{
    public string Username { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? FullName { get; set; }
    public string? AvatarPhotoUrl { get; set; }
    public int CurrentKycStep { get; set; }
    public int KycCompletionPercentage { get; set; }
    public string KycStatus { get; set; } = "draft";
    public int UnreadNotificationsCount { get; set; } = 5 ;
}