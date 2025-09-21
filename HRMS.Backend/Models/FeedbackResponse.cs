using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    public class FeedbackResponse
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Link to the RequestFeedback
        [Required]
        public Guid RequestFeedbackId { get; set; }
        public RequestFeedback RequestFeedback { get; set; } = null!;

        // Reviewer (the employee who gives the feedback)
        [Required]
        public Guid ReviewerId { get; set; }
        public Employee Reviewer { get; set; } = null!;

        // The actual feedback response
        [Column("feedback")]
        public string? Feedback { get; set; }

        // When the feedback was given
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}
