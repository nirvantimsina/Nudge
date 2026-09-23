using MediatR;
using ErrorOr;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Models.Creator.ResponseModel;
using System.Data;
namespace Nudge.Application.Features.Creator.Queries.GetSummary;

public record GetCreatorSummaryQuery : IRequest<ErrorOr<CreatorSummaryResponseModel>>;

public class GetCreatorSummaryQueryHandler : IRequestHandler<GetCreatorSummaryQuery, ErrorOr<CreatorSummaryResponseModel>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public GetCreatorSummaryQueryHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<CreatorSummaryResponseModel>> Handle(
        GetCreatorSummaryQuery request, 
        CancellationToken cancellationToken)
    {
        const string sql = @"
            SELECT 
                creatorid                   AS CreatorId,
                userid                      AS UserId,
                username                    AS Username,
                email                       AS Email,
                fullname                    AS FullName,
                avatarphotourl              AS AvatarPhotoUrl,
                is_step1_completed          AS IsStep1Completed,
                is_step2_completed          AS IsStep2Completed,
                is_step3_completed          AS IsStep3Completed,
                is_step4_completed          AS IsStep4Completed,
                current_kyc_step            AS CurrentKycStep,
                kyc_completion_percentage   AS KycCompletionPercentage,
                kycstatus_code              AS KycStatusCode,
                kyc_status                  AS KycStatus,
                is_verified                 AS IsVerified,
                rejectionreason             AS RejectionReason,
                verifiedat                  AS VerifiedAt,
                unread_notifications_count  AS UnreadNotificationsCount
            FROM kyc.vw_creator_profile_summary 
            WHERE creatorid = @CreatorId;";

        var summary = await _repo.QueryFirstOrDefaultAsync<CreatorSummaryResponseModel>(
            sql, 
            new { CreatorId = _context.CreatorId },
            commandType: CommandType.Text
        );

        if (summary is null)
        {
            return Error.NotFound(
                code: "Creator.NotFound", 
                description: $"Profile summary not found for Creator ID: {_context.CreatorId}"
            );
        }

        return summary;
    }
}