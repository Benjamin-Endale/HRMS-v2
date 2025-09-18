namespace HRMS.Backend.Models
{
    public class TenantSetting
    {
        public Guid Id { get; set; }
        public Guid TenantId { get; set; }

        // jsonb -> nvarchar(max). Make it non-null by default.
        public string Settings { get; set; } = "{}";

        public int Version { get; set; } = 1;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Tenant Tenant { get; set; } = null!;
    }
}
