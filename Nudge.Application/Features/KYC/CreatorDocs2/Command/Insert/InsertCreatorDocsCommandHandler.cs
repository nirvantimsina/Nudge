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
        private readonly ICreatorContext _context;
    
        public CreatorDocsCommandHandler(IGenericRepository repo, ICreatorContext context)
        {
            _repo = repo;
            _context = context;
        }

public async Task<ErrorOr<StatusResponse>> Handle(
    InsertCreatorDocsCommand request, 
    CancellationToken cancellationToken)
{
    var parameters = new
    {
        p_creatorid = _context.CreatorId,
        p_citizenshipid = request.CitizenshipId,
        p_citizenshipissueddistrict = request.CitizenshipIssuedDistrict,
        p_citizenshipissueddate = request.CitizenshipIssuedDate, // string, DateTime?, or DateOnly?
        p_nid = request.Nid,
        p_passportid = request.PassportId,
        p_passportexpirydate = request.PassportExpiryDate,       // null, string, DateTime?, or DateOnly?
        p_pannumber = request.PanNumber,
        p_avatarphotourl = request.AvatarPhotoUrl,
        p_idfrontproofurl = request.IdFrontProofUrl,
        p_idbackproofurl = request.IdBackProofUrl,
        p_pandocumenturl = request.PanDocumentUrl
    };

    const string sql = @"
        SELECT * FROM kyc.insert_creator_docs(
            @p_creatorid::integer,
            @p_citizenshipid::varchar,
            @p_citizenshipissueddistrict::varchar,
            @p_citizenshipissueddate::date,
            @p_nid::varchar,
            @p_passportid::varchar,
            @p_passportexpirydate::date,
            @p_pannumber::varchar,
            @p_avatarphotourl::text,
            @p_idfrontproofurl::text,
            @p_idbackproofurl::text,
            @p_pandocumenturl::text
        );";

    var result = await _repo.QueryFirstOrDefaultAsync<StatusResponse>(
        sql,
        parameters,
        commandType: CommandType.Text
    );

    return result.ToDbResult();
}
    }
}