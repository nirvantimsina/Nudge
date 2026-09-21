using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorInfo.Commands.Insert
{
    public class InsertCreatorInfoCommand : IRequest<ErrorOr<StatusResponse>>
    {
        public int CreatorId { get; set; }
        public string? FullName { get; set; }
        public DateTime? DOBAD { get; set; }
        public string? DOBBS { get; set; }
        public int? Gender { get; set; }
        public string? FatherName { get; set; }
        public string? MotherName { get; set; }
        public string? GrandfatherName { get; set; }
        public string? SpouseName { get; set; }
    }
}
