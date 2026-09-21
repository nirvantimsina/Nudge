using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Interfaces;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.Public.Creators.CreatorInfo.Commands.Update;

public record UpdateCreatorInfoCommand(
    int? CreatorId,
    string FullName,
    DateTime DobAd,
    string? DobBs,
    string? Gender,
    string? FatherName,
    string? MotherName,
    string? GrandfatherName,
    string? SpouseName
) : IRequest<ErrorOr<StatusResponse>>;

public class UpdateCreatorInfoCommandHandler : IRequestHandler<UpdateCreatorInfoCommand, ErrorOr<StatusResponse>>
{
    private readonly IGenericRepository _repo;

    public UpdateCreatorInfoCommandHandler(IGenericRepository repo)
    {
        _repo = repo;
    }

    public async Task<ErrorOr<StatusResponse>> Handle(UpdateCreatorInfoCommand request, CancellationToken cancellationToken)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
            "SELECT * FROM kyc.update_creator_info(@p_creatorid, @p_fullname, @p_dobad, @p_dobbs, @p_gender, @p_fathername, @p_mothername, @p_grandfathername, @p_spousename);",
            new {
                p_creatorid = request.CreatorId,
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
