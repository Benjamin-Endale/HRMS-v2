using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Backend.Data;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/orgsettings")]
    [Produces("application/json")]
    public class OrgSettingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrgSettingsController(AppDbContext context) => _context = context;

        // GET: /api/orgsettings?tenantId=...&organizationId=...
        [HttpGet]
        public async Task<ActionResult<OrgSettingViewDto>> GetByScope([FromQuery] Guid tenantId, [FromQuery] Guid organizationId)
        {
            if (tenantId == Guid.Empty || organizationId == Guid.Empty)
                return BadRequest("tenantId and organizationId are required.");

            var s = await _context.OrgSettings
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.TenantId == tenantId && x.OrganizationId == organizationId);

            if (s == null) return NotFound();

            return Ok(ToViewDto(s));
        }

        // GET: /api/orgsettings/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<OrgSettingViewDto>> GetById(Guid id)
        {
            var s = await _context.OrgSettings.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (s == null) return NotFound();
            return Ok(ToViewDto(s));
        }

        // POST: /api/orgsettings  (upsert by tenant + organization)
        [HttpPost]
        public async Task<ActionResult<OrgSettingViewDto>> Upsert([FromBody] OrgSettingUpsertDto input)
        {
            // Basic validation
            if (!ModelState.IsValid) return ValidationProblem(ModelState);
            if (input.TenantId == Guid.Empty)
                ModelState.AddModelError(nameof(input.TenantId), "TenantId is required.");
            if (input.OrganizationId == Guid.Empty)
                ModelState.AddModelError(nameof(input.OrganizationId), "OrganizationId is required.");

            // Parse times like "09:00"
            if (!TryParseTime(input.WorkDayStart, out var start))
                ModelState.AddModelError(nameof(input.WorkDayStart), "WorkDayStart must be HH:mm (e.g., 09:00).");
            if (!TryParseTime(input.WorkDayEnd, out var end))
                ModelState.AddModelError(nameof(input.WorkDayEnd), "WorkDayEnd must be HH:mm (e.g., 17:00).");

            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            // Ensure tenant & org exist (optional but nice)
            var tenantExists = await _context.Tenants.AnyAsync(t => t.Id == input.TenantId);
            if (!tenantExists) return BadRequest($"Tenant {input.TenantId} not found.");
            var orgExists = await _context.Organizations.AnyAsync(o => o.Id == input.OrganizationId && o.TenantId == input.TenantId);
            if (!orgExists) return BadRequest($"Organization {input.OrganizationId} not found for tenant {input.TenantId}.");

            var existing = await _context.OrgSettings
                .FirstOrDefaultAsync(x => x.TenantId == input.TenantId && x.OrganizationId == input.OrganizationId);

            if (existing == null)
            {
                var s = new OrgSetting
                {
                    Id = Guid.NewGuid(),
                    TenantId = input.TenantId,
                    OrganizationId = input.OrganizationId,
                    TimeZone = input.TimeZone?.Trim() ?? "UTC",
                    WorkDayStart = start,                 // assumes TimeSpan on your model
                    WorkDayEnd = end,                     // assumes TimeSpan on your model
                    LateAfterMinutes = input.LateAfterMinutes,
                    HalfDayUnderHours = input.HalfDayUnderHours,
                    AbsentIfNoClockIn = input.AbsentIfNoClockIn,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };

                _context.OrgSettings.Add(s);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = s.Id }, ToViewDto(s));
            }
            else
            {
                existing.TimeZone = input.TimeZone?.Trim() ?? existing.TimeZone;
                existing.WorkDayStart = start;
                existing.WorkDayEnd = end;
                existing.LateAfterMinutes = input.LateAfterMinutes;
                existing.HalfDayUnderHours = input.HalfDayUnderHours;
                existing.AbsentIfNoClockIn = input.AbsentIfNoClockIn;
                existing.UpdatedAt = DateTime.UtcNow;

                await _context.SaveChangesAsync();
                return Ok(ToViewDto(existing));
            }
        }

        private static bool TryParseTime(string? hhmm, out TimeSpan result)
        {
            if (string.IsNullOrWhiteSpace(hhmm))
            {
                result = default;
                return false;
            }
            // Accept "09:00" or "9:00"
            return TimeSpan.TryParseExact(hhmm.Trim(), new[] { @"hh\:mm", @"h\:mm" }, CultureInfo.InvariantCulture, out result);
        }

        private static OrgSettingViewDto ToViewDto(OrgSetting s) =>
            new OrgSettingViewDto(
                s.Id,
                s.TenantId,
                s.OrganizationId,
                s.TimeZone,
                s.WorkDayStart.ToString(@"hh\:mm"),
                s.WorkDayEnd.ToString(@"hh\:mm"),
                s.LateAfterMinutes,
                s.HalfDayUnderHours,
                s.AbsentIfNoClockIn
            );
    }

    // DTOs kept in this file to avoid new files; rename/move if you prefer
    public sealed class OrgSettingUpsertDto
    {
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid OrganizationId { get; set; }

        // IANA TZ like "Africa/Addis_Ababa"
        [Required, MaxLength(100)]
        public string TimeZone { get; set; } = "UTC";

        // "HH:mm" strings -> stored as TimeSpan on the entity
        [Required] public string WorkDayStart { get; set; } = "09:00";
        [Required] public string WorkDayEnd { get; set; } = "17:00";

        [Range(0, 240)] public int LateAfterMinutes { get; set; } = 10;
        [Range(1, 12)] public int HalfDayUnderHours { get; set; } = 4;

        public bool AbsentIfNoClockIn { get; set; } = true;
    }

    public record OrgSettingViewDto(
        Guid Id,
        Guid TenantId,
        Guid OrganizationId,
        string TimeZone,
        string WorkDayStart,
        string WorkDayEnd,
        int LateAfterMinutes,
        int HalfDayUnderHours,
        bool AbsentIfNoClockIn
    );
}
