using Nudge.Domain.Models;

namespace Nudge.Application.Models.KYC.ResponseModel.CreatorDocs;

public class CreatorDocsResponseModel : StatusResponse
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
