namespace HRMS.Backend.Models
{
    public class AuditLog
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid TenantId { get; set; }

        public string Action { get; set; } = string.Empty;
        public string Module { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public string IpAddress { get; set; } = string.Empty;
        public string Details { get; set; } = "{}";

        public Employee Employee { get; set; } = null!;
        public Tenant Tenant { get; set; } = null!;
    }
}
