using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    // Admin sends request
    public class RequestFeedbackDto
    {
        public Guid EmployeeId { get; set; }
        public DateTime FeedbackDeadline { get; set; }
        public string FeedbackSources { get; set; } = string.Empty;
        public Guid? DepartmentId { get; set; }
        public string InstructionReviewers { get; set; } = string.Empty;
    }
}
