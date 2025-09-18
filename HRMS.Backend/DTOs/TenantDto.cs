using System;

namespace HRMS.Backend.DTOs
{
    // Read model
    public class TenantDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string? Domain { get; set; }
        public string? Industry { get; set; }
        public string? Location { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        // Extras
        public string AdminFirstName { get; set; } = string.Empty;
        public string AdminLastName { get; set; } = string.Empty;
        public string AdminEmail { get; set; } = string.Empty;
        public string AdminPhone { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;
        public string TimeZone { get; set; } = string.Empty;

        public bool EmployeeManagement { get; set; }
        public bool AttendanceTracking { get; set; }
        public bool LeaveManagement { get; set; }
        public bool Recruitment { get; set; }
        public bool PerformanceManagement { get; set; }
        public bool TrainingDevelopment { get; set; }

        public bool EnableSSO { get; set; }
        public string SSOProvider { get; set; } = string.Empty;
        public string? IpRestrictions { get; set; }
        public bool RequireTwoFactorAuth { get; set; }
        public string PasswordPolicy { get; set; } = "8+ chars, mixed case, numbers";
        public int SessionTimeout { get; set; }
        public bool EnableAuditLogging { get; set; }

        public string DefaultExportFormat { get; set; } = "CSV";
        public string BackupFrequency { get; set; } = "Daily";
        public int DataRetentionYears { get; set; }
        public bool DataEncryptionAtRest { get; set; }
    }

    // Create
    public class CreateTenantDto
    {
        public string Name { get; set; } = string.Empty;

        public string? Domain { get; set; }
        public string? Industry { get; set; }
        public string? Location { get; set; }

        // Extras
        public string AdminFirstName { get; set; } = string.Empty;
        public string AdminLastName { get; set; } = string.Empty;
        public string AdminEmail { get; set; } = string.Empty;
        public string AdminPhone { get; set; } = string.Empty;

        public string Country { get; set; } = string.Empty;
        public string TimeZone { get; set; } = string.Empty;

        public bool EmployeeManagement { get; set; }
        public bool AttendanceTracking { get; set; }
        public bool LeaveManagement { get; set; }
        public bool Recruitment { get; set; }
        public bool PerformanceManagement { get; set; }
        public bool TrainingDevelopment { get; set; }

        public bool EnableSSO { get; set; }
        public string SSOProvider { get; set; } = string.Empty;
        public string? IpRestrictions { get; set; }
        public bool RequireTwoFactorAuth { get; set; }
        public string PasswordPolicy { get; set; } = "8+ chars, mixed case, numbers";
        public int SessionTimeout { get; set; } = 60;
        public bool EnableAuditLogging { get; set; } = true;

        public string DefaultExportFormat { get; set; } = "CSV";
        public string BackupFrequency { get; set; } = "Daily";
        public int DataRetentionYears { get; set; } = 5;
        public bool DataEncryptionAtRest { get; set; } = true;
    }

    // Update
    public class UpdateTenantDto : CreateTenantDto
    {
        public Guid Id { get; set; }
    }
}
