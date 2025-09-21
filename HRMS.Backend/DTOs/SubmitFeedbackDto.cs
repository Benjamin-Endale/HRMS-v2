namespace HRMS.Backend.DTOs
{
    // Employee submits feedback
    public class SubmitFeedbackDto
    {
        public Guid RequestFeedbackId { get; set; }   // Which request this feedback is for
        public Guid ReviewerId { get; set; }          // The employee giving feedback
        public string Feedback { get; set; } = string.Empty;
    }
}
