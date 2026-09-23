using ErrorOr;
using MediatR;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorAddress.Commands.Insert
{
    public class InsertCreatorAddressCommand : IRequest<ErrorOr<StatusResponse>>
    {
        public string? PermDistrict { get; set; }
        public string? PermMunicipality { get; set; }
        public int PermWardNo { get; set; }
        public string? CurrentAddressLine { get; set; }
        public string? CurrentDistrict { get; set; }
        public int CurrentWard { get; set; }
        public string? Longitude { get; set; }
        public string? Latitude { get; set; }
    }
}
