using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    // Read model (what you return from the API)
    public sealed class LeaveDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid TenantId { get; set; }
        public Guid LeaveTypeId { get; set; }
        public Guid? ApprovedBy { get; set; }

        public DateTime StartDate { get; set; }       // date-only in DB
        public DateTime EndDate { get; set; }         // date-only in DB
        public string Status { get; set; } = "Pending";
        public string? Reason { get; set; }
        public DateTime AppliedOn { get; set; }       // set by server when created
        public string? ManagerComment { get; set; }
    }

    // Create request (client -> server)
    public sealed class CreateLeaveRequest
    {
        [Required] public Guid EmployeeId { get; set; }
        [Required] public Guid LeaveTypeId { get; set; }
        [Required] public DateTime StartDate { get; set; }
        [Required] public DateTime EndDate { get; set; }

        public string? Reason { get; set; }
        // TenantId is derived on the server from the Employee (no need to send it)
        // Status defaults to "Pending" on create
    }

    // Update request (edit before approval; Id comes from route)
    public sealed class UpdateLeaveRequest
    {
        [Required] public Guid LeaveTypeId { get; set; }
        [Required] public DateTime StartDate { get; set; }
        [Required] public DateTime EndDate { get; set; }
        public string? Reason { get; set; }
        public string? Status { get; set; } // optional; validate/normalize in controller if you use fixed values
    }

    // Decision request (approve/reject by a manager)
    public sealed class DecideLeaveRequest
    {
        [Required] public Guid ApprovedBy { get; set; } // manager's EmployeeID (Guid)
        [Required] public string Status { get; set; } = "Approved"; // e.g., Approved/Rejected
        public string? ManagerComment { get; set; }
    }
}
