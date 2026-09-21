using ErrorOr;
using MediatR;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorVerification.Commands
{
    public class InsertCreatorVerificationCommand : IRequest<ErrorOr<StatusResponse>>
    {
        public int VId { get; set; }
        public int CreatorId { get; set; }
        public string? PrimaryPlatform { get; set; }
        public string? ChannelURL { get; set; }
        public string? EstimatedAnnualIncome { get; set; }
        public int KYCStatus { get; set; }        
    }
}
