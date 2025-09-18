using System;

namespace HRMS.Backend.Models
{
    public class RefreshToken
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }

        // Opaque random string; rotate on every refresh
        public string Token { get; set; } = string.Empty;

        // Link to the access token's JTI (to detect reuse)
        public string JwtId { get; set; } = string.Empty;

        public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
        public DateTime ExpiresAtUtc { get; set; }
        public DateTime? RevokedAtUtc { get; set; }
        public string? ReplacedByToken { get; set; }
        public string? IpAddress { get; set; }
        public string? UserAgent { get; set; }

        public bool IsActive => RevokedAtUtc == null && DateTime.UtcNow <= ExpiresAtUtc;

        // nav
        public User User { get; set; } = null!;
    }
}
