using System;

namespace HRMS.Backend.DTOs
{
    public class CreateUserRequest
    {
        public string FullName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
        public string? Username { get; set; }

        // SuperAdmin => null; Admin/others => required
        public Guid? OrganizationId { get; set; }
    }
}
