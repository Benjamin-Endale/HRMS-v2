using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    public class ApplicantDTO
    {
        // FK -> Jobs(Id)
        public Guid? JobId { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [EmailAddress, MaxLength(255)]
        public string? Email { get; set; }

        [MaxLength(50)]
        public string? Phone { get; set; }

        [MaxLength(2083)]
        public string? ResumeUrl { get; set; }

        [MaxLength(50)]
        public string Status { get; set; } = "Pending";

        [MaxLength(100)]
        public string? Source { get; set; }

        public string? Notes { get; set; }

        public string? ContactInformation { get; set; }

        public string? Appliedfor { get; set; }

        public string? Applications { get; set; }

        public string? Fordepartment { get; set; }
    }
}
