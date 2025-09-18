using System;

namespace HRMS.Backend.Models
{
    public class Asset
    {
        public Guid Id { get; set; }
        public Guid OrganizationId { get; set; }
        public Guid TenantId { get; set; }

        // optional assignee – GUID (matches Employee.EmployeeID)
        public Guid? EmployeeId { get; set; }

        public string AssetName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime? IssuedOn { get; set; }
        public DateTime? ReturnedOn { get; set; }
        public string ConditionNotes { get; set; } = string.Empty;
        public string? AssetTag { get; set; }
        public string Category { get; set; } = string.Empty;

        // navigations
        public Organization Organization { get; set; } = null!;
        public Tenant Tenant { get; set; } = null!;
        public Employee? Employee { get; set; }
    }
}
