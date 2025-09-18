using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    public class GoalDto
    {
        [Required]
        public Guid? EmployeeID { get; set; }

        [Required]
        public Guid? OrganizationID { get; set; }

        [Required]
        public Guid? TenantID { get; set; }

        [Required, MaxLength(255)]
        public string GoalTitle { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [MaxLength(50)]
        public string Priority { get; set; } = "Normal";

        [MaxLength(50)]
        public string Status { get; set; } = "Inprogress";

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
