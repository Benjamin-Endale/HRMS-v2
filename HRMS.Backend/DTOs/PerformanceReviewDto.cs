using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    public class PerformanceReviewDto
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // GUID ID

        [Required]
        public Guid EmployeeId { get; set; }  // GUID

        public Guid ReviewerId { get; set; }


        [Required, MaxLength(50)]
        public string ReviewType { get; set; } = string.Empty;

        [Range(1, 10)]
        public int TechnicalSkill { get; set; }

        [Range(1, 10)]
        public int Communication { get; set; }

        [Range(1, 10)]
        public int Leadership { get; set; }

        [Range(1, 10)]
        public int Innovation { get; set; }

        [Range(1, 10)]
        public int Teamwork { get; set; }

        [Required]
        public string OverallFeedback { get; set; } = string.Empty;

        [MaxLength(50)]
        public string ReviewCycle { get; set; } = string.Empty;

        [Required]
        public DateTime ReviewPeriodStart { get; set; }

        public DateTime? ReviewPeriodEnd { get; set; }
    }
}
