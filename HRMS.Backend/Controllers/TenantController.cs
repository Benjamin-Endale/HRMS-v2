// Controllers/TenantsController.cs
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HRMS.Backend.Models;
using HRMS.Backend.Data;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TenantsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TenantsController(AppDbContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> CreateTenant([FromBody] Tenant tenant)
        {
            if (string.IsNullOrWhiteSpace(tenant.Domain))
                ModelState.AddModelError(nameof(tenant.Domain), "Domain is required.");
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            if (tenant.Id == Guid.Empty)
                tenant.Id = Guid.NewGuid();

            _context.Tenants.Add(tenant);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTenantById), new { id = tenant.Id }, tenant);
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetTenantById(Guid id)
        {
            var tenant = await _context.Tenants.AsNoTracking().FirstOrDefaultAsync(t => t.Id == id);
            if (tenant == null) return NotFound();
            return Ok(tenant);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tenant>>> GetAll() =>
            Ok(await _context.Tenants.AsNoTracking().ToListAsync());

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Tenant body)
        {
            var t = await _context.Tenants.FirstOrDefaultAsync(x => x.Id == id);
            if (t is null) return NotFound();

            if (string.IsNullOrWhiteSpace(body.Domain))
                return BadRequest(new { message = "Domain is required." });

            t.Name = body.Name?.Trim() ?? t.Name;
            t.Domain = body.Domain.Trim(); // required
            t.Industry = body.Industry;
            t.Location = body.Location;
            t.AdminFirstName = body.AdminFirstName;
            t.AdminLastName = body.AdminLastName;
            t.AdminEmail = body.AdminEmail;
            t.AdminPhone = body.AdminPhone;
            t.Country = body.Country;
            t.TimeZone = body.TimeZone;
            t.EmployeeManagement = body.EmployeeManagement;
            t.AttendanceTracking = body.AttendanceTracking;
            t.LeaveManagement = body.LeaveManagement;
            t.Recruitment = body.Recruitment;
            t.PerformanceManagement = body.PerformanceManagement;
            t.TrainingDevelopment = body.TrainingDevelopment;
            t.EnableSSO = body.EnableSSO;
            t.SSOProvider = body.SSOProvider;
            t.RequireTwoFactorAuth = body.RequireTwoFactorAuth;
            t.PasswordPolicy = body.PasswordPolicy;
            t.SessionTimeout = body.SessionTimeout;
            t.EnableAuditLogging = body.EnableAuditLogging;
            t.EmailNotifications = body.EmailNotifications;
            t.PushNotifications = body.PushNotifications;
            t.CriticalAlertsOnly = body.CriticalAlertsOnly;
            t.DefaultExportFormat = body.DefaultExportFormat;
            t.BackupFrequency = body.BackupFrequency;
            t.DataRetentionYears = body.DataRetentionYears;
            t.DataEncryptionAtRest = body.DataEncryptionAtRest;

            t.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteTenant(Guid id)
        {
            var tenant = await _context.Tenants
                .Include(t => t.Organizations)
                .Include(t => t.Roles)
                .Include(t => t.Users)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (tenant == null) return NotFound();

            _context.Users.RemoveRange(tenant.Users);
            _context.Roles.RemoveRange(tenant.Roles);
            _context.Organizations.RemoveRange(tenant.Organizations);
            _context.Tenants.Remove(tenant);

            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
