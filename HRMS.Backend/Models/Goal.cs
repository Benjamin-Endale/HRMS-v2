using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    public class Goal
    {
        [Key]
        public Guid Id { get; set; }  // Changed from int to Guid

        [Required]
        public Guid EmployeeID { get; set; }
        public Employee? Employee { get; set; }

        [Required]
        public Guid OrganizationID { get; set; }
        public Organization? Organization { get; set; }

        [Required]
        public Guid TenantID { get; set; }
        public Tenant? Tenant { get; set; }

        [Required, MaxLength(255)]
        public string GoalTitle { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Priority { get; set; } = "Normal";

        [MaxLength(50)]
        public string Status { get; set; } = "Inprogress";

        [DataType(DataType.Date)]
        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
