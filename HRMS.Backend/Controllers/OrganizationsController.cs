using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Backend.Data;
using HRMS.Backend.Models;
using HRMS.Backend.DTOs;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/organizations")]
    [Route("api/organization")] // alias
    [Produces("application/json")]
    public class OrganizationsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public OrganizationsController(AppDbContext context) => _context = context;

        // GET: /api/organizations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrganizationDto>>> GetAll()
        {
            var orgs = await _context.Organizations
                .AsNoTracking()
                .Select(o => new OrganizationDto(
                    o.Id,
                    o.TenantId,
                    o.Name,
                    o.Domain ?? string.Empty,                  // Domain is required, no null-coalescing
                    o.Industry,
                    o.Location,
                    o.LogoUrl,
                    o.OrgCode ?? string.Empty, // OrgCode may be null
                    o.IpRestrictions
                ))
                .ToListAsync();

            return Ok(orgs);
        }

        // GET: /api/organizations/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<OrganizationDto>> GetById(Guid id)
        {
            var o = await _context.Organizations
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (o == null) return NotFound();

            return Ok(new OrganizationDto(
                o.Id,
                o.TenantId,
                o.Name,
                o.Domain ?? string.Empty,                     // Domain is required, no null-coalescing
                o.Industry,
                o.Location,
                o.LogoUrl,
                o.OrgCode ?? string.Empty,
                o.IpRestrictions
            ));
        }

        // POST: /api/organizations
        [HttpPost]
        [Consumes("application/json")]
        public async Task<ActionResult<OrganizationDto>> Create([FromBody] CreateOrganizationDto input)
        {
            // Treat whitespace as empty
            if (string.IsNullOrWhiteSpace(input.Domain))
                ModelState.AddModelError(nameof(input.Domain), "Domain can't be empty");
            if (string.IsNullOrWhiteSpace(input.Industry))
                ModelState.AddModelError(nameof(input.Industry), "Industry can't be empty");
            if (string.IsNullOrWhiteSpace(input.Location))
                ModelState.AddModelError(nameof(input.Location), "Location can't be empty");
            if (string.IsNullOrWhiteSpace(input.LogoUrl))
                ModelState.AddModelError(nameof(input.LogoUrl), "Logo URL can't be empty");
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var tenantExists = await _context.Tenants.AnyAsync(t => t.Id == input.TenantId);
            if (!tenantExists) return BadRequest($"Tenant {input.TenantId} not found.");

            // OrgCode: provided (normalized) or auto-generate unique per tenant
            var orgCode = string.IsNullOrWhiteSpace(input.OrgCode)
                ? await GenerateUniqueOrgCodeAsync(input.TenantId, input.Name)
                : input.OrgCode!.Trim().ToUpperInvariant();

            // If client supplied a code, ensure unique within tenant
            if (!string.IsNullOrWhiteSpace(input.OrgCode))
            {
                var clash = await _context.Organizations
                    .AnyAsync(o => o.TenantId == input.TenantId && o.OrgCode == orgCode);
                if (clash) return Conflict(new { message = $"org_code '{orgCode}' already exists for this tenant." });
            }

            var org = new Organization
            {
                Id = Guid.NewGuid(),
                TenantId = input.TenantId,
                Name = input.Name.Trim(),
                Domain = input.Domain.Trim(),   // REQUIRED
                Industry = input.Industry.Trim(),
                Location = input.Location.Trim(),
                LogoUrl = input.LogoUrl.Trim(),
                OrgCode = orgCode,
                IpRestrictions = string.IsNullOrWhiteSpace(input.IpRestrictions) ? null : input.IpRestrictions!.Trim(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Organizations.Add(org);
            await _context.SaveChangesAsync();

            var dto = new OrganizationDto(
                org.Id,
                org.TenantId,
                org.Name,
                org.Domain,
                org.Industry,
                org.Location,
                org.LogoUrl,
                org.OrgCode ?? string.Empty,
                org.IpRestrictions
            );

            return CreatedAtAction(nameof(GetById), new { id = org.Id }, dto);
        }

        // PUT: /api/organizations/{id}
        [HttpPut("{id:guid}")]
        [Consumes("application/json")]
        public async Task<IActionResult> Update(Guid id, [FromBody] UpdateOrganizationDto input)
        {
            if (id != input.Id) return BadRequest("Organization ID mismatch.");

            if (string.IsNullOrWhiteSpace(input.Domain))
                ModelState.AddModelError(nameof(input.Domain), "Domain can't be empty");
            if (string.IsNullOrWhiteSpace(input.Industry))
                ModelState.AddModelError(nameof(input.Industry), "Industry can't be empty");
            if (string.IsNullOrWhiteSpace(input.Location))
                ModelState.AddModelError(nameof(input.Location), "Location can't be empty");
            if (string.IsNullOrWhiteSpace(input.LogoUrl))
                ModelState.AddModelError(nameof(input.LogoUrl), "Logo URL can't be empty");
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var org = await _context.Organizations.FirstOrDefaultAsync(o => o.Id == id);
            if (org == null) return NotFound();

            if (org.TenantId != input.TenantId)
            {
                var tenantExists = await _context.Tenants.AnyAsync(t => t.Id == input.TenantId);
                if (!tenantExists) return BadRequest($"Tenant {input.TenantId} not found.");
                org.TenantId = input.TenantId;
            }

            org.Name = input.Name.Trim();
            org.Domain = input.Domain.Trim();   // REQUIRED
            org.Industry = input.Industry.Trim();
            org.Location = input.Location.Trim();
            org.LogoUrl = input.LogoUrl.Trim();

            if (!string.IsNullOrWhiteSpace(input.OrgCode))
            {
                var newCode = input.OrgCode.Trim().ToUpperInvariant();
                if (!string.Equals(newCode, org.OrgCode, StringComparison.Ordinal))
                {
                    var clash = await _context.Organizations
                        .AnyAsync(o => o.TenantId == org.TenantId && o.OrgCode == newCode && o.Id != org.Id);
                    if (clash) return Conflict(new { message = $"org_code '{newCode}' already exists for this tenant." });
                    org.OrgCode = newCode;
                }
            }

            org.IpRestrictions = string.IsNullOrWhiteSpace(input.IpRestrictions)
                ? null
                : input.IpRestrictions!.Trim();

            org.UpdatedAt = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: /api/organizations/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var org = await _context.Organizations
                .Include(o => o.Departments)
                .Include(o => o.Employees)
                .Include(o => o.LeaveTypes)
                .FirstOrDefaultAsync(o => o.Id == id);

            if (org == null) return NotFound();

            if (org.LeaveTypes?.Count > 0) _context.LeaveTypes.RemoveRange(org.LeaveTypes);
            if (org.Employees?.Count > 0) _context.Employees.RemoveRange(org.Employees);
            if (org.Departments?.Count > 0) _context.Departments.RemoveRange(org.Departments);

            _context.Organizations.Remove(org);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ===== Helpers =====
        private async Task<string> GenerateUniqueOrgCodeAsync(Guid tenantId, string name)
        {
            // Base from name: letters/digits only, upper, 3–6 chars
            var raw = new string((name ?? "ORG").Where(char.IsLetterOrDigit).ToArray()).ToUpperInvariant();
            if (raw.Length < 3) raw = (raw + "XXX").Substring(0, 3);
            var baseCode = raw.Substring(0, Math.Min(6, raw.Length));

            // Try random suffix until unique
            string candidate;
            do
            {
                var suffix = RandomNumberGenerator.GetInt32(100, 1000); // 100-999
                candidate = $"{baseCode}-{suffix}";
            }
            while (await _context.Organizations.AnyAsync(o => o.TenantId == tenantId && o.OrgCode == candidate));

            return candidate;
        }
    }
}
