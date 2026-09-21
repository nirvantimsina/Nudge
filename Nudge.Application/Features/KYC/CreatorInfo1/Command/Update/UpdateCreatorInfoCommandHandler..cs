using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorInfo.Commands.Update;

public class UpdateCreatorInfoCommand : IRequest<ErrorOr<StatusResponse>>
{
    public string FullName { get; set; } = string.Empty;
    public DateTime DobAd { get; set; }
    public string? DobBs { get; set; }
    public int? Gender { get; set; }
    public string? FatherName { get; set; }
    public string? MotherName { get; set; }
    public string? GrandfatherName { get; set; }
    public string? SpouseName { get; set; }
}

public class UpdateCreatorInfoCommandHandler : IRequestHandler<UpdateCreatorInfoCommand, ErrorOr<StatusResponse>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public UpdateCreatorInfoCommandHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<StatusResponse>> Handle(UpdateCreatorInfoCommand request, CancellationToken cancellationToken)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
            "SELECT * FROM kyc.update_creator_info(@p_creatorid, @p_fullname, @p_dobad, @p_dobbs, @p_gender, @p_fathername, @p_mothername, @p_grandfathername, @p_spousename);",
            new {
                p_creatorid = _context.CreatorId,
                p_fullname = request.FullName,
                p_dobad = request.DobAd,
                p_dobbs = request.DobBs,
                p_gender = request.Gender,
                p_fathername = request.FatherName,
                p_mothername = request.MotherName,
                p_grandfathername = request.GrandfatherName,
                p_spousename = request.SpouseName
            },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}
