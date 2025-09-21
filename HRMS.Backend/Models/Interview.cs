namespace HRMS.Backend.Models
{
    public class Interview
    {
        public Guid Id { get; set; }
        public Guid ShortlistId { get; set; }
        public DateTime? ScheduledOn { get; set; }
        public int? Duration { get; set; }
        public DateTime? ScheduledDate { get; set; }

        public string? LocationUrl { get; set; }
        public string? MeetingUrl { get; set; }

        public Guid? InterviewerId { get; set; }
        public string InterviewNote { get; set; } = string.Empty;
        public string Status { get; set; } = "Scheduled";
        public string Mode { get; set; } = string.Empty;

        
        public Shortlist? Shortlist { get; set; }

        public Employee? Interviewer { get; set; }
    }
}

