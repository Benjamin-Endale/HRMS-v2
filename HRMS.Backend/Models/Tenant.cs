// Models/Tenant.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    [Table("tenants")]
    public class Tenant
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Column("tenant_name"), Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        // NOW REQUIRED
        [Column("domain"), Required, MaxLength(255)]
        public string Domain { get; set; } = string.Empty;

        [Column("industry"), MaxLength(100)]
        public string? Industry { get; set; }

        [Column("location"), MaxLength(200)]
        public string? Location { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Extras (unchanged)
        public string AdminFirstName { get; set; } = string.Empty;
        public string AdminLastName { get; set; } = string.Empty;
        public string AdminEmail { get; set; } = string.Empty;
        public string AdminPhone { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;
        public string TimeZone { get; set; } = string.Empty;

        public bool EmployeeManagement { get; set; } = true;
        public bool AttendanceTracking { get; set; } = false;
        public bool LeaveManagement { get; set; } = false;
        public bool Recruitment { get; set; } = false;
        public bool PerformanceManagement { get; set; } = false;
        public bool TrainingDevelopment { get; set; } = false;

        public bool EnableSSO { get; set; } = false;
        public string SSOProvider { get; set; } = string.Empty;
        public bool RequireTwoFactorAuth { get; set; } = false;
        public string PasswordPolicy { get; set; } = "8+ chars, mixed case, numbers";
        public int SessionTimeout { get; set; } = 60;
        public bool EnableAuditLogging { get; set; } = true;

        public bool EmailNotifications { get; set; } = true;
        public bool PushNotifications { get; set; } = false;
        public bool CriticalAlertsOnly { get; set; } = false;

        public string DefaultExportFormat { get; set; } = "CSV";
        public string BackupFrequency { get; set; } = "Daily";
        public int DataRetentionYears { get; set; } = 5;
        public bool DataEncryptionAtRest { get; set; } = true;

        // Navigations
        public ICollection<Organization> Organizations { get; set; } = new List<Organization>();
        public ICollection<Department> Departments { get; set; } = new List<Department>();
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
        public ICollection<Role> Roles { get; set; } = new List<Role>();
        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Announcement> Announcements { get; set; } = new List<Announcement>();
    }
}
