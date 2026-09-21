using ErrorOr;
using MediatR;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorDocs.Commands
{
    public class InsertCreatorDocsCommand : IRequest<ErrorOr<StatusResponse>>
    {
        public int? CreatorId { get; set; }
        public string? CitizenshipId { get; set; }
        public string? CitizenshipIssuedDistrict { get; set; }
        public string? CitizenshipIssuedDate { get; set; }
        public string? NID { get; set; }
        public string? PassportId { get; set; }
        public DateTime? PassportExpiryDate { get; set; }
        public string? PANNumber { get; set; }
        public string? AvatarPhotoURL { get; set; }
        public string? IdFrontProofURL { get; set; }
        public string? IdBackProofURL { get; set; }
        public string? PanDocumentURL { get; set; }
    }
}
