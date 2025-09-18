using System;

namespace HRMS.Backend.DTOs
{
    public class EmployeeLeaveRequestDto
    {
        public Guid EmployeeId { get; set; }     // matches Leave.EmployeeId
        public Guid LeaveTypeId { get; set; }    // matches Leave.LeaveTypeId
        public Guid TenantId { get; set; }       // matches Leave.TenantId
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Reason { get; set; }      // optional
    }
}
