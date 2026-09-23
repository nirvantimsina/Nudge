using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nudge.Application.Features.Auth.Commands.Login;
using Nudge.Application.Features.Auth.Commands.SignUp;
using Nudge.Application.Features.Auth.Queries.GetMenuList;
using Nudge.Application.Models.Auth.Response;
using Nudge.Presentation.Extensions; // <-- Use extension methods
using Nudge.Shared.Wrappers;
using System.Security.Claims;

namespace Nudge.Presentation.Controllers
{
    [ApiController]
    public class AuthController(
        IMediator mediator, 
        ILogger<AuthController> logger,
        IWebHostEnvironment env) : ApiBaseController
    {
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginCommand command)
        {
            logger.LogInformation("Login attempt for user: {UserName}", command.UserName);
            var result = await mediator.Send(command);

            if (result.Success && result.Data is LoginResponse loginData && !string.IsNullOrEmpty(loginData.Token))
            {
                Response.SetAuthCookie(loginData.Token, env);
            }

            return HandleResponse(result);
        }

        [HttpPost("SignUp")]
        [AllowAnonymous]
        public async Task<IActionResult> SignUp([FromBody] SignUpCommand command)
        {
            var result = await mediator.Send(command);

            if (result.Success && result.Data is LoginResponse signUpData && !string.IsNullOrEmpty(signUpData.Token))
            {
                Response.SetAuthCookie(signUpData.Token, env);
            }

            return HandleResponse(result);
        }

        [HttpPost("Logout")]
        [AllowAnonymous] // Allows clearing the cookie even if token has already expired
        public IActionResult Logout()
        {
            Response.ClearAuthCookie(env);
            return Ok(ApiResponse.Ok(message: "Logged out successfully."));
        }

        [HttpGet("Me")]
        public IActionResult GetCurrentUserSession()
        {
            return Ok(ApiResponse<object>.Ok(new
            {
                userId = CurrentUserId,
                userName = CurrentUserName,
                roleId = CurrentRoleId,
                creatorId = CurrentCreatorId, // Reads "creatorid" claim from ApiBaseController
                permissions = CurrentPermissions
            }));
        }

        [HttpGet("MenuList")]
        public async Task<IActionResult> MenuList()
        {
            if (CurrentRoleId == 0)
                return Unauthorized(ApiResponse.Fail("Invalid or missing Role ID in token."));

            var result = await mediator.Send(new GetMenuListQuery { RoleId = CurrentRoleId });
            return HandleResponse(result);
        }
    }
}