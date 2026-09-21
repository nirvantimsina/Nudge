using MediatR;
using System.Data;
using Nudge.Shared.Wrappers;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.CreatorSetup.Commands.CreatorDetails;

public class CreatorDetailsCommandHandler : IRequestHandler<CreatorDetailsCommand, ApiResponse>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public CreatorDetailsCommandHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ApiResponse> Handle(CreatorDetailsCommand request, CancellationToken cancellationToken)
    {
        var Params = new
        {
            p_userid = _context.UserId,
            p_platform = request.Platform,
            p_username = request.UserName,
            p_link = request.Link
        };

        await _repo.ExecuteAsync(
            "select creator.insert_creator_details(@p_userid, p_platform, p_username, p_link)",
            Params,
            commandType: CommandType.Text
        );

        return ApiResponse.Ok();
    }
}