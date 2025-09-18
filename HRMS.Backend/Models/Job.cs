using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    [Table("jobs")]
    public class Job
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }  // Changed from int to Guid

        [Required(ErrorMessage = "Job title is required")]
        [MaxLength(255, ErrorMessage = "Job title cannot exceed 255 characters")]
        public string JobTitle { get; set; } = string.Empty;

        public Guid? DepartmentID { get; set; }
        public Department? Department { get; set; }

        [Required(ErrorMessage = "Tenant ID is required")]
        public Guid TenantID { get; set; }
        public Tenant Tenant { get; set; } = null!;

        [MaxLength(255, ErrorMessage = "Location cannot exceed 255 characters")]
        public string Location { get; set; } = string.Empty;

        [MaxLength(100, ErrorMessage = "Job type cannot exceed 100 characters")]
        public string JobType { get; set; } = string.Empty;

        [MaxLength(100, ErrorMessage = "Salary range cannot exceed 100 characters")]
        public string SalaryRange { get; set; } = string.Empty;

        public DateTime? ApplicationDeadline { get; set; }

        [Required(ErrorMessage = "Job description is required")]
        public string JobDescription { get; set; } = string.Empty;

        [Required(ErrorMessage = "Requirement is required")]
        public string Requirement { get; set; } = string.Empty;

        public DateTime? ClosingDate { get; set; }

        //public ICollection<Shortlist>? Shortlists { get; set; } = new List<Shortlist>();
        public ICollection<Applicant>? Applicants { get; set; } = new List<Applicant>();
    }
}
