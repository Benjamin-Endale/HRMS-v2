using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Backend.Data;
using HRMS.Backend.Models;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/departments")]
    [Produces("application/json")]
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DepartmentsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/departments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DepartmentDto>>> GetDepartments()
        {
            var departments = await _context.Departments
                .AsNoTracking()
                .Include(d => d.DepartmentHead) // so we can safely read name
                .Select(d => new DepartmentDto
                {
                    Id = d.Id,
                    OrganizationId = d.OrganizationId,
                    TenantId = d.TenantId,
                    DepartmentName = d.DepartmentName,
                    DepartmentHeadId = d.DepartmentHeadId, // may be null
                    DepartmentHeadName = d.DepartmentHead != null
                        ? (d.DepartmentHead.FirstName + " " + d.DepartmentHead.LastName).Trim()
                        : string.Empty,
                    DepartmentCode = d.DepartmentCode,
                    InitialEmployeeCount = d.InitialEmployeeCount,
                    ParentDepartmentId = d.ParentDepartmentId
                })
                .ToListAsync();

            return Ok(departments);
        }

        // GET: api/departments/{id}
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<DepartmentDto>> GetDepartmentById(Guid id)
        {
            var d = await _context.Departments
                .AsNoTracking()
                .Include(x => x.DepartmentHead)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (d == null) return NotFound();

            var dto = new DepartmentDto
            {
                Id = d.Id,
                OrganizationId = d.OrganizationId,
                TenantId = d.TenantId,
                DepartmentName = d.DepartmentName,
                DepartmentHeadId = d.DepartmentHeadId, // may be null
                DepartmentHeadName = d.DepartmentHead != null
                    ? (d.DepartmentHead.FirstName + " " + d.DepartmentHead.LastName).Trim()
                    : string.Empty,
                DepartmentCode = d.DepartmentCode,
                InitialEmployeeCount = d.InitialEmployeeCount,
                ParentDepartmentId = d.ParentDepartmentId
            };

            return Ok(dto);
        }

        // POST: api/departments
        [HttpPost]
        public async Task<ActionResult<DepartmentDto>> CreateDepartment(DepartmentCreateUpdateDto dto)
        {
            // Required fields
            if (string.IsNullOrWhiteSpace(dto.DepartmentName))
                ModelState.AddModelError(nameof(dto.DepartmentName), "Department name is required.");

            // Load org (derive tenant)
            var org = await _context.Organizations.AsNoTracking()
                          .FirstOrDefaultAsync(o => o.Id == dto.OrganizationId);
            if (org == null)
                ModelState.AddModelError(nameof(dto.OrganizationId), "Organization not found.");

            // Parent validation (same org)
            if (dto.ParentDepartmentId.HasValue && dto.ParentDepartmentId.Value != Guid.Empty)
            {
                var parent = await _context.Departments.AsNoTracking()
                    .FirstOrDefaultAsync(p => p.Id == dto.ParentDepartmentId.Value);
                if (parent == null)
                    ModelState.AddModelError(nameof(dto.ParentDepartmentId), "Parent department not found.");
                else if (org != null && parent.OrganizationId != org.Id)
                    ModelState.AddModelError(nameof(dto.ParentDepartmentId), "Parent must be in the same organization.");
            }

            // Head is OPTIONAL now — validate only if provided
            if (dto.DepartmentHeadId.HasValue && org != null)
            {
                var head = await _context.Employees.AsNoTracking()
                    .FirstOrDefaultAsync(e => e.EmployeeID == dto.DepartmentHeadId.Value);
                if (head == null)
                {
                    ModelState.AddModelError(nameof(dto.DepartmentHeadId), "Department head employee not found.");
                }
                else
                {
                    if (head.TenantId != org.TenantId)
                        ModelState.AddModelError(nameof(dto.DepartmentHeadId), "Department head must belong to the same tenant.");
                    if (head.OrganizationId != org.Id)
                        ModelState.AddModelError(nameof(dto.DepartmentHeadId), "Department head must belong to the same organization.");

                    // Optional: require certain roles for head
                    // var hasRequiredRole = await _context.EmployeeRoles
                    //     .Include(er => er.Role)
                    //     .AnyAsync(er =>
                    //         er.EmployeeId == head.EmployeeID &&
                    //         er.TenantId == head.TenantId &&
                    //         (er.Role.Name == "Manager" || er.Role.Name == "HRAdmin"));
                    // if (!hasRequiredRole)
                    //     ModelState.AddModelError(nameof(dto.DepartmentHeadId), "Department head must have either the 'Manager' or 'HRAdmin' role.");
                }
            }

            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            // Generate DepartmentCode if missing
            string? deptCode = dto.DepartmentCode;
            if (string.IsNullOrWhiteSpace(deptCode))
            {
                deptCode = await GenerateUniqueDeptCodeAsync(org!.Id, dto.DepartmentName);
            }
            else
            {
                deptCode = deptCode.Trim().ToUpperInvariant();
                var exists = await _context.Departments
                    .AnyAsync(d => d.OrganizationId == org!.Id && d.DepartmentCode == deptCode);
                if (exists)
                    return Conflict(new { message = $"Department code '{deptCode}' already exists in this organization." });
            }

            var department = new Department
            {
                Id = Guid.NewGuid(),
                OrganizationId = org!.Id,
                TenantId = org.TenantId,
                DepartmentName = dto.DepartmentName.Trim(),
                DepartmentCode = deptCode,
                DepartmentHeadId = dto.DepartmentHeadId, // may be null
                InitialEmployeeCount = dto.InitialEmployeeCount,
                ParentDepartmentId = dto.ParentDepartmentId
            };

            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            var created = new DepartmentDto
            {
                Id = department.Id,
                OrganizationId = department.OrganizationId,
                TenantId = department.TenantId,
                DepartmentName = department.DepartmentName,
                DepartmentHeadId = department.DepartmentHeadId,
                DepartmentHeadName = department.DepartmentHeadId.HasValue
                    ? (await _context.Employees
                        .Where(e => e.EmployeeID == department.DepartmentHeadId.Value)
                        .Select(e => (e.FirstName + " " + e.LastName).Trim())
                        .FirstOrDefaultAsync()) ?? string.Empty
                    : string.Empty,
                DepartmentCode = department.DepartmentCode,
                InitialEmployeeCount = department.InitialEmployeeCount,
                ParentDepartmentId = department.ParentDepartmentId
            };

            return CreatedAtAction(nameof(GetDepartmentById), new { id = department.Id }, created);
        }

        // PUT: api/departments/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateDepartment(Guid id, DepartmentCreateUpdateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.DepartmentName))
                ModelState.AddModelError(nameof(dto.DepartmentName), "Department name is required.");

            var existing = await _context.Departments.FirstOrDefaultAsync(d => d.Id == id);
            if (existing == null) return NotFound();

            var org = await _context.Organizations.AsNoTracking()
                .FirstOrDefaultAsync(o => o.Id == dto.OrganizationId);
            if (org == null)
                ModelState.AddModelError(nameof(dto.OrganizationId), "Organization not found.");

            if (dto.ParentDepartmentId.HasValue && dto.ParentDepartmentId.Value == id)
                ModelState.AddModelError(nameof(dto.ParentDepartmentId), "A department cannot be its own parent.");

            if (dto.ParentDepartmentId.HasValue && dto.ParentDepartmentId.Value != Guid.Empty)
            {
                var parent = await _context.Departments.AsNoTracking()
                    .FirstOrDefaultAsync(p => p.Id == dto.ParentDepartmentId.Value);
                if (parent == null)
                    ModelState.AddModelError(nameof(dto.ParentDepartmentId), "Parent department not found.");
                else if (org != null && parent.OrganizationId != org.Id)
                    ModelState.AddModelError(nameof(dto.ParentDepartmentId), "Parent must be in the same organization.");
            }

            // Head OPTIONAL — validate only if provided (or allow clearing to null)
            if (dto.DepartmentHeadId.HasValue && org != null)
            {
                var head = await _context.Employees.AsNoTracking()
                    .FirstOrDefaultAsync(e => e.EmployeeID == dto.DepartmentHeadId.Value);
                if (head == null)
                {
                    ModelState.AddModelError(nameof(dto.DepartmentHeadId), "Department head employee not found.");
                }
                else
                {
                    if (head.TenantId != org.TenantId)
                        ModelState.AddModelError(nameof(dto.DepartmentHeadId), "Department head must belong to the same tenant.");
                    if (head.OrganizationId != org.Id)
                        ModelState.AddModelError(nameof(dto.DepartmentHeadId), "Department head must belong to the same organization.");

                    // Optional role check as above
                }
            }

            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            // Department code
            string? deptCode = dto.DepartmentCode;
            if (string.IsNullOrWhiteSpace(deptCode))
            {
                // keep existing if present, otherwise generate
                deptCode = string.IsNullOrWhiteSpace(existing.DepartmentCode)
                    ? await GenerateUniqueDeptCodeAsync(org!.Id, dto.DepartmentName)
                    : existing.DepartmentCode;
            }
            else
            {
                deptCode = deptCode.Trim().ToUpperInvariant();
                var clash = await _context.Departments
                    .AnyAsync(d => d.OrganizationId == org!.Id && d.DepartmentCode == deptCode && d.Id != existing.Id);
                if (clash)
                    return Conflict(new { message = $"Department code '{deptCode}' already exists in this organization." });
            }

            // Apply updates
            existing.OrganizationId = org!.Id;
            existing.TenantId = org.TenantId;
            existing.DepartmentName = dto.DepartmentName.Trim();
            existing.DepartmentHeadId = dto.DepartmentHeadId; // may be null now
            existing.DepartmentCode = deptCode;
            existing.InitialEmployeeCount = dto.InitialEmployeeCount;
            existing.ParentDepartmentId = dto.ParentDepartmentId;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/departments/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteDepartment(Guid id)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(d => d.Id == id);
            if (department == null) return NotFound();

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // ----- helpers -----
        private Task<string> GenerateUniqueDeptCodeAsync(Guid orgId, string name)
        {
            // base from name
            var raw = new string((name ?? "DEPT").Where(char.IsLetterOrDigit).ToArray()).ToUpperInvariant();
            if (raw.Length < 3) raw = (raw + "XXX").Substring(0, 3);
            var baseCode = raw.Substring(0, Math.Min(6, raw.Length));

            return EnsureUniqueAsync(orgId, baseCode);
        }

        private async Task<string> EnsureUniqueAsync(Guid orgId, string baseCode)
        {
            string candidate;
            do
            {
                var suffix = RandomNumberGenerator.GetInt32(100, 1000); // 100-999
                candidate = $"{baseCode}-{suffix}";
            }
            while (await _context.Departments.AnyAsync(d => d.OrganizationId == orgId && d.DepartmentCode == candidate));

            return candidate;
        }
    }

    // ===== DTOs (GUID-based) =====
    public sealed class DepartmentDto
    {
        public Guid Id { get; set; }
        public Guid OrganizationId { get; set; }
        public Guid TenantId { get; set; }
        public string DepartmentName { get; set; } = null!;
        public Guid? DepartmentHeadId { get; set; } // now optional
        public string DepartmentHeadName { get; set; } = string.Empty;
        public string? DepartmentCode { get; set; }
        public int InitialEmployeeCount { get; set; }
        public Guid? ParentDepartmentId { get; set; }
    }

    public sealed class DepartmentCreateUpdateDto
    {
        public Guid OrganizationId { get; set; }
        public string DepartmentName { get; set; } = null!;
        public Guid? DepartmentHeadId { get; set; } // optional
        public string? DepartmentCode { get; set; }
        public int InitialEmployeeCount { get; set; }
        public Guid? ParentDepartmentId { get; set; }
    }
}
