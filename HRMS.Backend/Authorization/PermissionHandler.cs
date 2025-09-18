using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace HRMS.Backend.Security
{
	public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
	{
		protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
		{
			var userPerms = context.User.Claims.Where(c => c.Type == "perm").Select(c => c.Value).ToHashSet();
			if (requirement.AnyOf.Any(p => userPerms.Contains(p) || userPerms.Contains("*")))
				context.Succeed(requirement);

			return Task.CompletedTask;
		}
	}
}
