namespace HRMS.Backend.DTOs
{
    public class InterviewDTO
    {
        public Guid Id { get; set; }      
        public Guid ShortlistId { get; set; }
        public string ApplicantName { get; set; } = string.Empty;
        public string Position { get; set; } = string.Empty;

        public Guid? InterviewerId { get; set; }   
        public string InterviewerName { get; set; } = string.Empty;

        public string Type { get; set; } = string.Empty;   // Online/Offline
        public string Status { get; set; } = "Scheduled";

        public DateTime? ScheduledDate { get; set; }
        public string? LocationUrl { get; set; }
        public string? MeetingUrl { get; set; }
        public string InterviewNote { get; set; } = string.Empty;
    }
}
