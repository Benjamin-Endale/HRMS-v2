using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    public class PerformanceReview
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;

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

        [Range(1, 10)]
        public double Rating { get; set; }


        [Required]
        public string OverallFeedback { get; set; } = string.Empty;

        [MaxLength(50)]
        public string ReviewCycle { get; set; } = string.Empty;

        [Required]
        public DateTime ReviewPeriodStart { get; set; }

        public DateTime ReviewPeriodEnd { get; set; }
    }
}

