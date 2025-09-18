using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    [Table("org_settings")]
    public class OrgSetting
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid TenantId { get; set; }

        [Required]
        public Guid OrganizationId { get; set; }

        // IANA TZ name like "Africa/Addis_Ababa"
        [Required, MaxLength(100)]
        public string TimeZone { get; set; } = "UTC";

        // Stored as TimeSpan in DB (e.g., 09:00, 17:00)
        [Required]
        public TimeSpan WorkDayStart { get; set; } = new(9, 0, 0);

        [Required]
        public TimeSpan WorkDayEnd { get; set; } = new(17, 0, 0);

        // Attendance rules
        [Range(0, 240)]
        public int LateAfterMinutes { get; set; } = 10;

        [Range(1, 12)]
        public int HalfDayUnderHours { get; set; } = 4;

        public bool AbsentIfNoClockIn { get; set; } = true;

        // Timestamps
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigations (optional)
        public Tenant Tenant { get; set; } = null!;
        public Organization Organization { get; set; } = null!;
    }
}
