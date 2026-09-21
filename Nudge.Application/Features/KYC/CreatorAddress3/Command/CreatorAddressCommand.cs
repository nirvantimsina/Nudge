using ErrorOr;
using MediatR;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorAddress.Commands
{
    public class InsertCreatorAddressCommand : IRequest<ErrorOr<StatusResponse>>
    {
        public int AddressId { get; set; }
        public int CreatorId { get; set; }
        public string? PermDistrict { get; set; }
        public string? PermMunicipality { get; set; }
        public int PermWardNo { get; set; }
        public string? CurrentAddressLine { get; set; }
    }
}
