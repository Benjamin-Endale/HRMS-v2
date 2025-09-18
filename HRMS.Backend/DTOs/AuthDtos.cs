using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    public class RegisterUserDto
    {
        [Required, MaxLength(120)] public string Username { get; set; } = string.Empty;
        [Required, EmailAddress, MaxLength(255)] public string Email { get; set; } = string.Empty;

        [Required, MinLength(8), MaxLength(128)]
        // client sends plain password; we hash server-side
        public string Password { get; set; } = string.Empty;

        public Guid? TenantId { get; set; }
        public Guid? OrganizationId { get; set; }
        public Guid? EmployeeId { get; set; } // optional link to Employee
        public Guid? RoleId { get; set; }     // optional default role at create time
    }

    public class LoginDto
    {
        [Required] public string UsernameOrEmail { get; set; } = string.Empty;
        [Required] public string Password { get; set; } = string.Empty;
        public string? TwoFactorCode { get; set; } // for TOTP (optional)
    }

    public class TokenResponseDto
    {
        public string AccessToken { get; set; } = string.Empty;
        public DateTime AccessTokenExpiresUtc { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiresUtc { get; set; }
    }

    public class RefreshRequestDto
    {
        [Required] public string RefreshToken { get; set; } = string.Empty;
    }

    public class ChangePasswordDto
    {
        [Required] public string CurrentPassword { get; set; } = string.Empty;
        [Required, MinLength(8), MaxLength(128)] public string NewPassword { get; set; } = string.Empty;
    }
}
