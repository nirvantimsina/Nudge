using System.Data;
using ErrorOr;
using MediatR;
using Nudge.Application.Common.Extensions;
using Nudge.Application.Common.Interfaces;
using Nudge.Domain.Models;

namespace Nudge.Application.Features.KYC.CreatorDocs.Commands.Update;

public record UpdateCreatorDocsCommand(
    string? CitizenshipId,
    string? CitizenshipIssuedDistrict,
    string? CitizenshipIssuedDate,
    string? NID,
    string? PassportId,
    DateTime? PassportExpiryDate,
    string? PANNumber,
    string? AvatarPhotoURL,
    string? IdFrontProofURL,
    string? IdBackProofURL,
    string? PanDocumentURL
) : IRequest<ErrorOr<StatusResponse>>;

public class UpdateCreatorDocsCommandHandler : IRequestHandler<UpdateCreatorDocsCommand, ErrorOr<StatusResponse>>
{
    private readonly IGenericRepository _repo;
    private readonly ICreatorContext _context;

    public UpdateCreatorDocsCommandHandler(IGenericRepository repo, ICreatorContext context)
    {
        _repo = repo;
        _context = context;
    }

    public async Task<ErrorOr<StatusResponse>> Handle(UpdateCreatorDocsCommand request, CancellationToken cancellationToken)
    {
        const string SQL = @"
            select * from kyc.update_creator_docs(
            @p_creatorid,
            @p_citizenshipid,
            @p_citizenshipissueddistrict,
            @p_citizenshipissueddate,
            @p_nid,
            @p_passportid,
            @p_passportexpirydate,
            @p_pannumber,
            @p_avatarphotourl,
            @p_idfrontproofurl,
            @p_idbackproofurl,
            @p_pandocumenturl
            )";

        var Params = new {
            p_creatorid = _context.CreatorId,
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
            SQL,
            Params,
            commandType: CommandType.Text
        );

        return result.ToDbResult();
    }
}