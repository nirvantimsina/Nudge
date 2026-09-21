using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorDocs.Commands
{
    public class InsertCreatorDocsCommand : IRequest<ErrorOr<StatusResponse>>
    {
        public string? CitizenshipId { get; set; }
        public string? CitizenshipIssuedDistrict { get; set; }
        public DateTime? CitizenshipIssuedDate { get; set; }
        public string? Nid { get; set; }
        public string? PassportId { get; set; }
        public DateTime? PassportExpiryDate { get; set; }
        public string? PanNumber { get; set; }
        public string? AvatarPhotoUrl { get; set; }
        public string? IdFrontProofUrl { get; set; }
        public string? IdBackProofUrl { get; set; }
        public string? PanDocumentUrl { get; set; }
    }
}
