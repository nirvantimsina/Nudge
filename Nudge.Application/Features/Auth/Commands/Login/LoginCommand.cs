using ErrorOr;
using MediatR;
using Nudge.Application.Models.Auth.Response;
using Nudge.Shared.Wrappers;

namespace Nudge.Application.Features.Auth.Commands.Login
{
    public class LoginCommand : IRequest<ErrorOr<LoginResponse>>
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
    }
}
