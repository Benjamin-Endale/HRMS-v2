using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace HRMS.Backend.Security
{
	public class PermissionRequirement : IAuthorizationRequirement
	{
		public IReadOnlyCollection<string> AnyOf { get; }
		public PermissionRequirement(params string[] anyOf) => AnyOf = anyOf;
	}
}
