using System;

namespace HRMS.Backend.DTOs
{
    public class UpdateLeaveStatusDto
    {
        public string Status { get; set; } = string.Empty;
        public Guid EmployeeId { get; set; }// "Approved" or "Rejected"
        public string? ManagerComment { get; set; }          // Optional comment
    }
}
