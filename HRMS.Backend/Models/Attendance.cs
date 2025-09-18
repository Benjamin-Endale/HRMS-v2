using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    [Table("attendance")]
    public class Attendance
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Composite FK -> Employee (EmployeeID, TenantId)
        [Required]
        [Column("employee_id")]
        public Guid EmployeeId { get; set; }

        [Required]
        [Column("tenant_id")]
        public Guid TenantId { get; set; }

        // We store as datetime(date) in SQL; controller will make sure date portion is used
        [Required]
        [Column("attendance_date", TypeName = "date")]
        public DateTime AttendanceDate { get; set; }

        [Column("clock_in")]
        public DateTime? ClockIn { get; set; }

        [Column("clock_out")]
        public DateTime? ClockOut { get; set; }

        [MaxLength(50)]
        [Column("status")]
        public string? Status { get; set; }  // e.g., Present, Absent, Late, etc.

        [Column("location")]
        public string? Location { get; set; }

        [Column("shift_name")]
        public string? ShiftName { get; set; }

        [Column("source")]
        public string? Source { get; set; }  // e.g., Web, Mobile, Kiosk

        [MaxLength(45)]
        [Column("ip_address")]
        public string? IpAddress { get; set; } // IPv4/IPv6

        [Column("exception_note")]
        public string? ExceptionNote { get; set; }

        // Navs
        public Employee Employee { get; set; } = null!;
        public Tenant Tenant { get; set; } = null!;
    }
}
