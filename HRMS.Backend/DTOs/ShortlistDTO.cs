using System;

namespace HRMS.Backend.DTOs
{
    public class ShortlistDTO
    {
        public Guid ShortlistID { get; set; }
        public Guid JobID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? ResumeUrl { get; set; }
        public string? Notes { get; set; }
        public string? position { get; set; }
        public string Status { get; set; } = "Shortlist";
        public DateTime ShortlistedOn { get; set; }
    }
}
