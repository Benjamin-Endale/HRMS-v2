using System;

namespace HRMS.Backend.DTOs
{
    public class LeaveRequestDto
    {
        public Guid LeaveID { get; set; }               // Updated to Guid
        public string EmployeeName { get; set; } = string.Empty;
        public string LeaveType { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string Reason { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
}
