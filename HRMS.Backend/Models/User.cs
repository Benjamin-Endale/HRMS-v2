using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Models
{
    [Table("users")]
    [Index(nameof(Username), IsUnique = true)]
    [Index(nameof(NormalizedUsername), IsUnique = true)]
    public class User
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Column("full_name"), Required, MaxLength(200)]
        public string FullName { get; set; } = string.Empty;

        [Column("email"), MaxLength(255)]
        public string? Email { get; set; }

        // Case-insensitive search/uniqueness; keep in sync in controller/service
        [Column("normalized_email"), MaxLength(255)]
        public string? NormalizedEmail { get; set; }

        [Column("phone_number"), MaxLength(50)]
        public string? PhoneNumber { get; set; }

        [Column("username"), Required, MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        // Case-insensitive comparisons; always store e.g. ToUpperInvariant()
        [Column("normalized_username"), Required, MaxLength(100)]
        public string NormalizedUsername { get; set; } = string.Empty;

        // === Secure password storage ===
        // PBKDF2/Argon2 hash and salt stored as raw bytes (preferred)
        [Column("password_hash"), Required]
        public byte[] PasswordHash { get; set; } = Array.Empty<byte>();

        [Column("password_salt"), Required]
        public byte[] PasswordSalt { get; set; } = Array.Empty<byte>();

        // Optional display label; real permissions should come from Role/EmployeeRole tables
        [Column("role"), MaxLength(50)]
        public string Role { get; set; } = "User";

        // Multi-tenant scope (optional)
        [Column("tenant_id")]
        public Guid? TenantId { get; set; }
        public Tenant? Tenant { get; set; }

        [Column("organization_id")]
        public Guid? OrganizationId { get; set; }
        public Organization? Organization { get; set; }

        // Optional link to HR employee profile
        [Column("employee_id")]
        public Guid? EmployeeId { get; set; }
        public Employee? Employee { get; set; }

        // Account state / security
        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        [Column("access_failed_count")]
        public int AccessFailedCount { get; set; } = 0;

        [Column("lockout_end_utc")]
        public DateTime? LockoutEndUtc { get; set; }

        [Column("email_confirmed")]
        public bool EmailConfirmed { get; set; } = false;

        [Column("phone_confirmed")]
        public bool PhoneNumberConfirmed { get; set; } = false;

        [Column("two_factor_enabled")]
        public bool TwoFactorEnabled { get; set; } = false;

        // Store an encrypted/hashed TOTP secret if you enable 2FA
        [Column("tfa_secret")]
        public string? TfaSecret { get; set; }

        // Bump whenever sensitive info changes (password, 2FA, etc.)
        [Column("security_stamp"), Required, MaxLength(64)]
        public string SecurityStamp { get; set; } = Guid.NewGuid().ToString("N");

        [Column("last_login_utc")]
        public DateTime? LastLoginUtc { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; }

        // Optimistic concurrency token
        [Timestamp]
        [Column("row_version")]
        public byte[]? RowVersion { get; set; }

        // 2FA fields
        public string? OtpCode { get; set; }
        public DateTime? OtpExpiryUtc { get; set; }


    }
}
