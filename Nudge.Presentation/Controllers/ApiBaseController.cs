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

        protected string? CurrentUserName
        {
            get
            {
                var claimValue = User.FindFirstValue(ClaimTypes.Name);
                return claimValue ?? string.Empty;
            }
        }
        protected int CurrentRoleId
        {
            get
            {
                var claimValue = User.FindFirstValue(ClaimTypes.Role) 
                ?? User.FindFirstValue("roleid")
                ?? User.FindFirstValue("RoleId");
                return int.TryParse(claimValue, out var roleid) ? roleid : 0;
            }
        }
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
                    // You can map specific ErrorOr types to correct HTTP Status Codes here
                    return firstError.Type == ErrorType.NotFound 
                        ? NotFound(ApiResponse.Fail(firstError.Description, firstError.Code))
                        : BadRequest(ApiResponse.Fail(firstError.Description, firstError.Code));
                }
            );
        }
    }
}
