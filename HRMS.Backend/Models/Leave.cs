using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    public class Leave
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }                  // keep Guid for consistency (or keep your current PK if needed)

        [Column("employee_id")]
        public Guid EmployeeId { get; set; }          // CHANGED: int -> Guid
        public Employee Employee { get; set; } = null!;

        [Column("tenant_id")]
        public Guid TenantId { get; set; }            // CHANGED: int -> Guid
        public Tenant Tenant { get; set; } = null!;

        [Column("leave_type_id")]
        public Guid LeaveTypeId { get; set; }          // keep int if LeaveType.Id is still int
        public LeaveType LeaveType { get; set; } = null!;

        [Column("start_date")]
        public DateTime StartDate { get; set; }

        [Column("end_date")]
        public DateTime EndDate { get; set; }

        [Column("status"), MaxLength(50)]
        public string? Status { get; set; }

        [Column("approved_by")]
        public Guid? ApprovedBy { get; set; }         // CHANGED: int? -> Guid?
        public Employee? Approver { get; set; }       // make sure this navigation exists

        [Column("reason")]
        public string? Reason { get; set; }

        [Column("applied_on")]
        public DateTime AppliedOn { get; set; }

        [Column("manager_comment")]
        public string? ManagerComment { get; set; }


        public DateTime? UpdatedAt { get; set; }

    }
}
