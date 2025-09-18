using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    public sealed class AttendanceDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid TenantId { get; set; }
        public DateTime AttendanceDate { get; set; }
        public DateTime? ClockIn { get; set; }
        public DateTime? ClockOut { get; set; }
        public string? Status { get; set; }
        public string? Location { get; set; }
        public string? ShiftName { get; set; }
        public string? Source { get; set; }
        public string? IpAddress { get; set; }
        public string? ExceptionNote { get; set; }

        // convenience computed field (not stored)
        public double? TotalHours =>
            (ClockIn.HasValue && ClockOut.HasValue)
                ? (ClockOut.Value - ClockIn.Value).TotalHours
                : null;
    }

    public sealed class AttendanceCreateDto
    {
        [Required] public Guid EmployeeId { get; set; }
        [Required] public Guid TenantId { get; set; }

        // If omitted, controller will default to DateTime.UtcNow.Date
        public DateTime? AttendanceDate { get; set; }

        // Optional; you can create a row without an immediate clock-in
        public DateTime? ClockIn { get; set; }

        public string? Status { get; set; }
        public string? Location { get; set; }
        public string? ShiftName { get; set; }
        public string? Source { get; set; }
        public string? IpAddress { get; set; }
        public string? ExceptionNote { get; set; }
    }

    public sealed class AttendanceUpdateDto
    {
        [Required] public Guid Id { get; set; }

        [Required] public Guid EmployeeId { get; set; }
        [Required] public Guid TenantId { get; set; }
        [Required] public DateTime AttendanceDate { get; set; }

        public DateTime? ClockIn { get; set; }
        public DateTime? ClockOut { get; set; }
        public string? Status { get; set; }
        public string? Location { get; set; }
        public string? ShiftName { get; set; }
        public string? Source { get; set; }
        public string? IpAddress { get; set; }
        public string? ExceptionNote { get; set; }
    }

    public sealed class ClockInDto
    {
        [Required] public Guid EmployeeId { get; set; }
        [Required] public Guid TenantId { get; set; }
        public DateTime? AttendanceDate { get; set; }  // default today
        public DateTime? ClockIn { get; set; }         // default now (UTC)
        public string? Location { get; set; }
        public string? ShiftName { get; set; }
        public string? Source { get; set; }
        public string? IpAddress { get; set; }
        public string? ExceptionNote { get; set; }
    }

    public sealed class ClockOutDto
    {
        public DateTime? ClockOut { get; set; } // default now (UTC) if null
        public string? ExceptionNote { get; set; }
    }
}
