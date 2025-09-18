using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.Models
{
    public class Applicant
    {
        public Guid Id { get; set; }  // Changed from int to GUID

        // FK -> Jobs(Id)
        public Guid? JobId { get; set; }       // Changed from int? to Guid?
        public Job? Job { get; set; } = null!;

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

        public string? Notes { get; set; } // nvarchar(max)

        public string? ContactInformation { get; set; }

        public string? Appliedfor { get; set; }

        public string? Applications { get; set; }

        public string? Fordepartment { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Interview>? Interviews { get; set; } = new List<Interview>();
    }
}
