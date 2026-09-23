using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Models.KYC.ResponseModel.CreatorVerification;

namespace Nudge.Application.Features.KYC.CreatorVerification.Query.Get;

public class GetCreatorVerificationQuery : IRequest<ErrorOr<CreatorVerificationResponseModel>>;

public class GetCreatorVerificationQueryHandler : IRequestHandler<GetCreatorVerificationQuery, ErrorOr<CreatorVerificationResponseModel>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public GetCreatorVerificationQueryHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<CreatorVerificationResponseModel>> Handle(GetCreatorVerificationQuery request, CancellationToken token)
    {
        var result = await _repo.QueryFirstOrDefaultAsync<CreatorVerificationResponseModel>(
            "select * from kyc.get_kyc_verification_by_creatorid(@p_creatorid);",
            new { p_creatorid = _context.CreatorId },
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}