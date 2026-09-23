using ErrorOr;
using MediatR;
using Nudge.Application.Models.Dashboard.ResponseModel;
using Nudge.Application.Common.Extensions;
using System.Data;
using Nudge.Application.Common.Interfaces;

public class GetDashboardQuery : IRequest<ErrorOr<DashboardResponseModel>>;

namespace Nudge.Application.Features.Dashboard.Queries.GetDashboard
{
    public class GetDashboardQueryHandler : IRequestHandler<GetDashboardQuery, ErrorOr<DashboardResponseModel>>
    {
        private readonly IGenericRepository _repo;
        private readonly ICreatorContext _context;

        public GetDashboardQueryHandler(IGenericRepository repo, ICreatorContext context)
        {
            _repo = repo;
            _context = context;
        }

        public async Task<ErrorOr<DashboardResponseModel>> Handle(GetDashboardQuery request, CancellationToken cancellationToken)
        {
            var result = await _repo.QueryFirstOrDefaultAsync<DashboardResponseModel>(
                "SELECT * FROM public.fn_dashboard(@p_userid);",
                new { p_userid = _context.UserId },
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}


