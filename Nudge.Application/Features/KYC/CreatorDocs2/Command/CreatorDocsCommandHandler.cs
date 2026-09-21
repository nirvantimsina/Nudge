using MediatR;
using Nudge.Application.Interfaces;
using System.Data;
using Nudge.Domain.Models;
using ErrorOr;
using Nudge.Application.Common.Extensions;

namespace Nudge.Application.Features.KYC.CreatorDocs.Commands
{
    public class CreatorDocsCommandHandler : IRequestHandler<InsertCreatorDocsCommand, ErrorOr<StatusResponse>>
    {
        private readonly IGenericRepository _repo;

        public CreatorDocsCommandHandler(IGenericRepository repo)
        {
            _repo = repo;
        }

        public async Task<ErrorOr<StatusResponse>> Handle(InsertCreatorDocsCommand request, CancellationToken cancellationToken)
        {
            var Params = new
            {
                p_creatorid = request.CreatorId,
                p_citizenshipid = request.CitizenshipId,
                p_citizenshipissueddistrict = request.CitizenshipIssuedDistrict,
                p_citizenshipissueddate = request.CitizenshipIssuedDate,
                p_nid = request.NID,
                p_passportid = request.PassportId,
                p_passportexpirydate = request.PassportExpiryDate,
                p_pannumber = request.PANNumber,
                p_avatarphotourl = request.AvatarPhotoURL,
                p_idfrontproofurl = request.IdFrontProofURL,
                p_idbackproofurl = request.IdBackProofURL,
                p_pandocumenturl = request.PanDocumentURL
            };

            var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
                "select kyc.insert_creator_Docs(@p_creatorid, @p_citizenshipid, @p_citizenshipissueddistrict, @p_citizenshipissueddate, @p_nid, @p_passportid, @p_passportexpirydate, @p_pannumber, @p_avatarphotourl, @p_idfrontproofurl, @p_idbackproofurl, @p_pandocumenturl)",
                Params,
                commandType: CommandType.Text);

            return result.ToDbResult();
        }
    }
}