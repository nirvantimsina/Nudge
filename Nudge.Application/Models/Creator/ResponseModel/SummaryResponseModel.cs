namespace Nudge.Application.Models.Creator.ResponseModel;

public class CreatorSummaryResponseModel
{
    public long CreatorId { get; set; }
    public long UserId { get; set; }
    public string Username { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? FullName { get; set; }
    public string? AvatarPhotoUrl { get; set; }

    public bool IsStep1Completed { get; set; }
    public bool IsStep2Completed { get; set; }
    public bool IsStep3Completed { get; set; }
    public bool IsStep4Completed { get; set; }

    public int CurrentKycStep { get; set; }
    public int KycCompletionPercentage { get; set; }
    public int KycStatusCode { get; set; }
    public string KycStatus { get; set; } = "pending";
    public bool IsVerified { get; set; }
    public string? RejectionReason { get; set; }
    public DateTime? VerifiedAt { get; set; }

    public int UnreadNotificationsCount { get; set; }
}