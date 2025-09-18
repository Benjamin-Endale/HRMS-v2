// Models/Organization.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.Models
{
    public class Organization
    {
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? OrgCode { get; set; }

        [MaxLength(255)]
        public string? Domain { get; set; }

        [Required, MaxLength(100)]
        public string Industry { get; set; } = string.Empty;

        [Required, MaxLength(200)]
        public string Location { get; set; } = string.Empty;

        [Required, MaxLength(500)]
        public string LogoUrl { get; set; } = string.Empty;

        // NEW: lives here now (moved from Tenant)
        [MaxLength(2048)]
        public string? IpRestrictions { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Tenant Tenant { get; set; } = null!;
        public ICollection<Department> Departments { get; set; } = new List<Department>();
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public ICollection<LeaveType> LeaveTypes { get; set; } = new List<LeaveType>();
        public ICollection<Announcement> Announcements { get; set; } = new List<Announcement>();
    }
}
