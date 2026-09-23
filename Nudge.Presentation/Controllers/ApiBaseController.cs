using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Nudge.Shared.Wrappers;
using ErrorOr;

namespace Nudge.Presentation.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ApiBaseController : ControllerBase
    {
        protected int CurrentUserId
        {
            get
            {
                var claimValue = User.FindFirstValue(ClaimTypes.NameIdentifier);
                return int.TryParse(claimValue, out var id) ? id : 0;
            }
        }

        protected string CurrentUserName => User.FindFirstValue(ClaimTypes.Name) ?? string.Empty;

        protected int CurrentRoleId
        {
            get
            {
                // Checks standard Role claim first, then matches "roleId" from JWTHelper
                var claimValue = User.FindFirstValue(ClaimTypes.Role) 
                              ?? User.FindFirstValue("roleId")
                              ?? User.FindFirstValue("RoleId");

                return int.TryParse(claimValue, out var roleId) ? roleId : 0;
            }
        }

        protected int CurrentCreatorId
        {
            get
            {
                // Matches "creatorid" emitted in your JWTHelper
                var claimValue = User.FindFirstValue("creatorid") 
                              ?? User.FindFirstValue("creatorId")
                              ?? User.FindFirstValue("CreatorId");

                return int.TryParse(claimValue, out var creatorId) ? creatorId : 0;
            }
        }

        protected IEnumerable<string> CurrentPermissions =>
            User.FindAll("permission").Select(c => c.Value);

        protected IActionResult HandleResponse(ApiResponse result)
        {
            if (result == null)
            {
                return StatusCode(500, ApiResponse.Fail("An unexpected error occurred!"));
            }

            return result.Success ? Ok(result) : BadRequest(result);
        }

        protected IActionResult HandleErrorOr<T>(ErrorOr<T> result)
        {
            return result.Match<IActionResult>(
                data => Ok(ApiResponse<T>.Ok(data)),
                errors => {
                    var firstError = errors.First();
                    return firstError.Type == ErrorType.NotFound 
                        ? NotFound(ApiResponse.Fail(firstError.Description, firstError.Code))
                        : BadRequest(ApiResponse.Fail(firstError.Description, firstError.Code));
                }
            );
        }
    }
}