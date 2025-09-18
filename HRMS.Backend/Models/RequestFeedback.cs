using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    public class RequestFeedback
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();  // Changed to GUID

        [Required(ErrorMessage = "EmployeeID is required.")]
        public Guid EmployeeId { get; set; }
        public Employee Employee { get; set; }

        [Required(ErrorMessage = "FeedbackDeadline is required.")]
        [DataType(DataType.Date)]
        public DateTime FeedbackDeadline { get; set; }

        [Required(ErrorMessage = "FeedbackSources is required.")]
        [MaxLength(255, ErrorMessage = "FeedbackSources cannot exceed 255 characters.")]
        public string FeedbackSources { get; set; }

        [Required(ErrorMessage = "InstructionReviewers is required.")]
        [MaxLength(500, ErrorMessage = "InstructionReviewers cannot exceed 500 characters.")]
        public string InstructionReviewers { get; set; }
    }
}
