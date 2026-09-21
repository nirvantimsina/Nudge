using MediatR;
using System.Data;
using Nudge.Domain.Models;
using ErrorOr;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;

namespace Nudge.Application.Features.KYC.CreatorDocs.Commands
{
    public class CreatorDocsCommandHandler : IRequestHandler<InsertCreatorDocsCommand, ErrorOr<StatusResponse>>
    {
        private readonly IGenericRepository _repo;
        private readonly ICreatorScopedRequest _scope;

        public CreatorDocsCommandHandler(IGenericRepository repo, ICreatorScopedRequest scope)
        {
            _repo = repo;
            _scope = scope;
        }

        public async Task<ErrorOr<StatusResponse>> Handle(InsertCreatorDocsCommand request, CancellationToken cancellationToken)
        {
            var Params = new
            {
                p_creatorid = _scope.CreatorId,
                p_citizenshipid = request.CitizenshipId,
                p_citizenshipissueddistrict = request.CitizenshipIssuedDistrict,
                p_citizenshipissueddate = request.CitizenshipIssuedDate,
                p_nid = request.NID,
                p_passportid = request.PassportId,
                p_passportexpirydate = request.PassportExpiryDate?.Date,
                p_pannumber = request.PANNumber,
                p_avatarphotourl = request.AvatarPhotoURL,
                p_idfrontproofurl = request.IdFrontProofURL,
                p_idbackproofurl = request.IdBackProofURL,
                p_pandocumenturl = request.PanDocumentURL
            };

            const string SQL = @"
            select * from kyc.insert_creator_Docs(
                @p_creatorid, 
                @p_citizenshipid, 
                @p_citizenshipissueddistrict, 
                @p_citizenshipissueddate, 
                @p_nid, 
                @p_passportid, 
                @p_passportexpirydate::date, 
                @p_pannumber, 
                @p_avatarphotourl, 
                @p_idfrontproofurl, 
                @p_idbackproofurl, 
                @p_pandocumenturl);
            ";

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                SQL,
                Params,
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}