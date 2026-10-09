using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.CreatorSetup.Commands.CreateCreator;

public class CreateCreatorCommandHandler : IRequestHandler<CreateCreatorCommand, ErrorOr<CreateCreatorResultDto>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public CreateCreatorCommandHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<CreateCreatorResultDto>> Handle(CreateCreatorCommand request, CancellationToken cancellationToken)
    {
        var userId = _context.UserId;
        if (userId <= 0)
        {
            return Error.Unauthorized("Creator.Unauthenticated", "User must be authenticated to create a creator account.");
        }

        var parameters = new
        {
            p_userid = userId,
            p_slug = request.Slug,
            p_name = request.Name,
            p_categoryid = request.CategoryId,
            p_bio = request.Bio,
            p_description = request.Description
        };

        const string sql = @"
            SELECT 
                creator_id AS CreatorId,
                slug AS Slug,
                name AS Name,
                status AS Status,
                msg AS Msg
            FROM creator.fn_create_creator(
                @p_userid,
                @p_slug,
                @p_name,
                @p_categoryid,
                @p_bio,
                @p_description
            );";

        var result = await _repo.QueryFirstOrDefaultAsync<CreateCreatorDbRow>(
            sql,
            parameters,
            commandType: CommandType.Text,
            cancellationToken: cancellationToken);

        if (result is null || result.CreatorId <= 0)
        {
            return Error.Failure("Creator.CreationFailed", result?.Msg ?? "Failed to create creator profile.");
        }

        return new CreateCreatorResultDto(result.CreatorId, result.Slug, result.Name);
    }

    private sealed class CreateCreatorDbRow
    {
        public int CreatorId { get; set; }
        public string Slug { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Msg { get; set; } = string.Empty;
    }
}
