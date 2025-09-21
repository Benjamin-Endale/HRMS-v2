using System;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Backend.Data;
using HRMS.Backend.Models;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendanceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AttendanceController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/attendance
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendanceDto>>> GetAll()
        {
            var list = await _context.Attendances
                .AsNoTracking()
                .Select(a => new AttendanceDto
                {
                    Id = a.Id,
                    EmployeeId = a.EmployeeId,
                    TenantId = a.TenantId,
                    AttendanceDate = a.AttendanceDate,
                    ClockIn = a.ClockIn,
                    ClockOut = a.ClockOut,
                    Status = a.Status,
                    Location = a.Location,
                    ShiftName = a.ShiftName,
                    Source = a.Source,
                    IpAddress = a.IpAddress,
                    ExceptionNote = a.ExceptionNote,
                    TotalHours = a.ClockIn.HasValue && a.ClockOut.HasValue
                        ? (a.ClockOut.Value - a.ClockIn.Value).TotalHours
                        : (double?)null
                })
                .ToListAsync();

            return Ok(list);
        }

        // GET: api/attendance/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<AttendanceDto>> GetById(Guid id)
        {
            var a = await _context.Attendances.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (a == null) return NotFound();

            return Ok(new AttendanceDto
            {
                Id = a.Id,
                EmployeeId = a.EmployeeId,
                TenantId = a.TenantId,
                AttendanceDate = a.AttendanceDate,
                ClockIn = a.ClockIn,
                ClockOut = a.ClockOut,
                Status = a.Status,
                Location = a.Location,
                ShiftName = a.ShiftName,
                Source = a.Source,
                IpAddress = a.IpAddress,
                ExceptionNote = a.ExceptionNote,
                TotalHours = a.ClockIn.HasValue && a.ClockOut.HasValue
                    ? (a.ClockOut.Value - a.ClockIn.Value).TotalHours
                    : (double?)null
            });
        }

        // POST: api/attendance
        [HttpPost]
        public async Task<ActionResult<AttendanceDto>> Create([FromBody] AttendanceCreateUpdateDto input)
        {

            if (input == null) return BadRequest("Body required.");
            if (input.EmployeeId == Guid.Empty) return BadRequest("EmployeeId is required.");

            // Load employee for org/tenant linkage
            var emp = await _context.Employees.AsNoTracking()
                         .FirstOrDefaultAsync(e => e.EmployeeID == input.EmployeeId);
            if (emp == null) return BadRequest("Employee not found.");

            var settings = await GetSettingsAsync(emp.TenantId, emp.OrganizationId);
            if (settings == null) return BadRequest("Org settings not found for employee’s org.");

            var tz = GetTimeZone(settings.TimeZone);
            var nowLocal = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, tz);
            var attDate = input.AttendanceDate?.Date ?? nowLocal.Date;

            var entity = new Attendance
            {
                Id = Guid.NewGuid(),
                EmployeeId = emp.EmployeeID,
                TenantId = emp.TenantId,
                AttendanceDate = attDate,
                ClockIn = input.ClockIn ?? nowLocal,
                Status = null, // computed later (optional)
                Location = input.Location,
                ShiftName = input.ShiftName,
                Source = input.Source,
                IpAddress = input.IpAddress,
                ExceptionNote = input.ExceptionNote
            };

            // Optional: set status on create based on clock-in
            entity.Status = ComputeStatus(entity, settings, hasApprovedLeave: false);

            _context.Attendances.Add(entity);
            await _context.SaveChangesAsync();

            var dto = new AttendanceDto
            {
                Id = entity.Id,
                EmployeeId = entity.EmployeeId,
                TenantId = entity.TenantId,
                AttendanceDate = entity.AttendanceDate,
                ClockIn = entity.ClockIn,
                ClockOut = entity.ClockOut,
                Status = entity.Status,
                Location = entity.Location,
                ShiftName = entity.ShiftName,
                Source = entity.Source,
                IpAddress = entity.IpAddress,
                ExceptionNote = entity.ExceptionNote,
                TotalHours = null
            };

            return CreatedAtAction(nameof(GetById), new { id = entity.Id }, dto);
        }

        // PUT: api/attendance/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] AttendanceCreateUpdateDto input)
        {
            var a = await _context.Attendances.FirstOrDefaultAsync(x => x.Id == id);
            if (a == null) return NotFound();

            var emp = await _context.Employees.AsNoTracking()
                         .FirstOrDefaultAsync(e => e.EmployeeID == a.EmployeeId);
            if (emp == null) return BadRequest("Employee not found.");

            var settings = await GetSettingsAsync(emp.TenantId, emp.OrganizationId);
            if (settings == null) return BadRequest("Org settings not found for employee’s org.");

            if (input.AttendanceDate.HasValue) a.AttendanceDate = input.AttendanceDate.Value.Date;
            if (input.ClockIn.HasValue) a.ClockIn = input.ClockIn;
            if (input.ClockOut.HasValue) a.ClockOut = input.ClockOut;

            a.Status = ComputeStatus(a, settings, hasApprovedLeave: false);
            a.Location = input.Location ?? a.Location;
            a.ShiftName = input.ShiftName ?? a.ShiftName;
            a.Source = input.Source ?? a.Source;
            a.IpAddress = input.IpAddress ?? a.IpAddress;
            a.ExceptionNote = input.ExceptionNote ?? a.ExceptionNote;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/attendance/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var a = await _context.Attendances.FindAsync(id);
            if (a == null) return NotFound();

            _context.Attendances.Remove(a);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // POST: api/attendance/clockin
        [HttpPost("clockin")]
        public async Task<ActionResult<AttendanceDto>> ClockIn([FromBody] ClockInDto input)
        {
            if (input == null) return BadRequest("Body required.");
            if (input.EmployeeId == Guid.Empty) return BadRequest("EmployeeId is required.");

            var emp = await _context.Employees.AsNoTracking()
                         .FirstOrDefaultAsync(e => e.EmployeeID == input.EmployeeId);
            if (emp == null) return BadRequest("Employee not found.");

            var settings = await GetSettingsAsync(emp.TenantId, emp.OrganizationId);
            if (settings == null) return BadRequest("Org settings not found for employee’s org.");

            var tz = GetTimeZone(settings.TimeZone);
            var nowLocal = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, tz);
            var date = input.AttendanceDate?.Date ?? nowLocal.Date;

            var existing = await _context.Attendances
                .FirstOrDefaultAsync(a => a.EmployeeId == emp.EmployeeID &&
                                          a.TenantId == emp.TenantId &&
                                          a.AttendanceDate == date);
            if (existing != null && existing.ClockIn.HasValue)
                return Conflict(new { message = "Already clocked in for today." });

            if (existing == null)
            {
                existing = new Attendance
                {
                    Id = Guid.NewGuid(),
                    EmployeeId = emp.EmployeeID,
                    TenantId = emp.TenantId,
                    AttendanceDate = date
                };
                _context.Attendances.Add(existing);
            }

            existing.ClockIn = input.ClockIn ?? nowLocal;
            existing.Status = ComputeStatus(existing, settings, hasApprovedLeave: false);
            existing.Location = input.Location ?? existing.Location;
            existing.ShiftName = input.ShiftName ?? existing.ShiftName;
            existing.Source = input.Source ?? existing.Source;
            existing.IpAddress = input.IpAddress ?? existing.IpAddress;
            existing.ExceptionNote = input.ExceptionNote ?? existing.ExceptionNote;

            await _context.SaveChangesAsync();

            return Ok(new AttendanceDto
            {
                Id = existing.Id,
                EmployeeId = existing.EmployeeId,
                TenantId = existing.TenantId,
                AttendanceDate = existing.AttendanceDate,
                ClockIn = existing.ClockIn,
                ClockOut = existing.ClockOut,
                Status = existing.Status,
                Location = existing.Location,
                ShiftName = existing.ShiftName,
                Source = existing.Source,
                IpAddress = existing.IpAddress,
                ExceptionNote = existing.ExceptionNote,
                TotalHours = null
            });
        }

        // PATCH: api/attendance/{id}/clockout
        [HttpPatch("{id:guid}/clockout")]
        public async Task<ActionResult<AttendanceDto>> ClockOut(Guid id, [FromBody] ClockOutDto input)
        {
            var a = await _context.Attendances.FirstOrDefaultAsync(x => x.Id == id);
            if (a == null) return NotFound();

            var emp = await _context.Employees.AsNoTracking()
                         .FirstOrDefaultAsync(e => e.EmployeeID == a.EmployeeId);
            if (emp == null) return BadRequest("Employee not found.");

            var settings = await GetSettingsAsync(emp.TenantId, emp.OrganizationId);
            if (settings == null) return BadRequest("Org settings not found for employee’s org.");

            var tz = GetTimeZone(settings.TimeZone);
            var nowLocal = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, tz);

            a.ClockOut = input.ClockOut ?? nowLocal;
            a.Status = ComputeStatus(a, settings, hasApprovedLeave: false);

            await _context.SaveChangesAsync();

            return Ok(new AttendanceDto
            {
                Id = a.Id,
                EmployeeId = a.EmployeeId,
                TenantId = a.TenantId,
                AttendanceDate = a.AttendanceDate,
                ClockIn = a.ClockIn,
                ClockOut = a.ClockOut,
                Status = a.Status,
                Location = a.Location,
                ShiftName = a.ShiftName,
                Source = a.Source,
                IpAddress = a.IpAddress,
                ExceptionNote = a.ExceptionNote,
                TotalHours = a.ClockIn.HasValue && a.ClockOut.HasValue
                    ? (a.ClockOut.Value - a.ClockIn.Value).TotalHours
                    : (double?)null
            });
        }

        // ===== Helpers =====

        private async Task<OrgSetting?> GetSettingsAsync(Guid tenantId, Guid organizationId)
        {
            return await _context.OrgSettings.AsNoTracking()
                .FirstOrDefaultAsync(s => s.TenantId == tenantId && s.OrganizationId == organizationId);
        }

        private static TimeZoneInfo GetTimeZone(string tzId)
        {
            try
            {
                return TimeZoneInfo.FindSystemTimeZoneById(string.IsNullOrWhiteSpace(tzId) ? "UTC" : tzId);
            }
            catch
            {
                return TimeZoneInfo.Utc;
            }
        }

        private static string ComputeStatus(Attendance a, OrgSetting s, bool hasApprovedLeave)
        {
            if (hasApprovedLeave) return "On Leave";

            // No clock-in yet: possibly Absent (policy) or Unknown
            if (!a.ClockIn.HasValue)
                return s.AbsentIfNoClockIn ? "Absent" : "Unknown";

            // Lateness
            var clockInLocal = a.ClockIn.Value;
            var workStart = clockInLocal.Date + s.WorkDayStart;
            var lateAfter = workStart.AddMinutes(s.LateAfterMinutes);

            var isLate = clockInLocal > lateAfter;

            // Half-day / full-day using hours worked (if clock-out known)
            if (a.ClockOut.HasValue)
            {
                var hours = (a.ClockOut.Value - a.ClockIn.Value).TotalHours;

                if (hours < Math.Max(0.1, s.HalfDayUnderHours)) // under threshold -> Half Day
                    return isLate ? "Late (Half Day)" : "Half Day";

                // Full day
                return isLate ? "Late (Present)" : "Present";
            }

            // No clock-out yet, but already late
            return isLate ? "Late" : "Present";
        }
    }

    // ====== DTOs used by this controller (align with your project’s namespace if needed) ======
    public sealed class AttendanceDto
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid TenantId { get; set; }
        public DateTime? AttendanceDate { get; set; }
        public DateTime? ClockIn { get; set; }
        public DateTime? ClockOut { get; set; }
        public string? Status { get; set; }
        public string? Location { get; set; }
        public string? ShiftName { get; set; }
        public string? Source { get; set; }
        public string? IpAddress { get; set; }
        public string? ExceptionNote { get; set; }
        public double? TotalHours { get; set; }
    }

    public sealed class AttendanceCreateUpdateDto
    {
        public Guid EmployeeId { get; set; }
        public DateTime? AttendanceDate { get; set; }
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
        public Guid EmployeeId { get; set; }
        public DateTime? AttendanceDate { get; set; }
        public DateTime? ClockIn { get; set; }
        public string? Status { get; set; }
        public string? Location { get; set; }
        public string? ShiftName { get; set; }
        public string? Source { get; set; }
        public string? IpAddress { get; set; }
        public string? ExceptionNote { get; set; }
    }

    public sealed class ClockOutDto
    {
        public DateTime? ClockOut { get; set; }
    }
}
