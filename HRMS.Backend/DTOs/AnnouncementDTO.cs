namespace HRMS.Backend.DTOs
{
    public class AnnouncementDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Destination { get; set; } = string.Empty;
        public string Categories { get; set; } = string.Empty;
        public string Announcementcontent { get; set; } = string.Empty;

        public Guid? DepartmentID { get; set; }
        public Guid TenantID { get; set; }
        public Guid OrganizationID { get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? Credit { get; set; }
        public bool IsActive { get; set; }
    }
}
