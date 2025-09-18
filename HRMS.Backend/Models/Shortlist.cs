using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    [Table("shortlists")]
    public class Shortlist
    {
        [Key]
        public Guid ShortlistID { get; set; } = Guid.NewGuid();

        // Keep reference to original Job
        [Required]
        public Guid JobID { get; set; }
        public Job Job { get; set; } = null!;

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [EmailAddress, MaxLength(255)]
        public string? Email { get; set; }

        [MaxLength(50)]
        public string? Phone { get; set; }

        [MaxLength(2083)]
        public string? ResumeUrl { get; set; }

        public string? Notes { get; set; }

        [MaxLength(100)]
        public string? position { get; set; }

        // Status: Shortlisted or Not
        [MaxLength(50)]
        public string Status { get; set; } = "Shortlist";

        public DateTime ShortlistedOn { get; set; } = DateTime.UtcNow;
    }
}
