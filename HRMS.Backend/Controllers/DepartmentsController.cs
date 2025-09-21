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
                InitialEmployeeCount = dto.ParentDepartmentId == null || dto.ParentDepartmentId == Guid.Empty
                    ? dto.InitialEmployeeCount   // only for main departments
                    : null,
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
                InitialEmployeeCount = dto.ParentDepartmentId == null || dto.ParentDepartmentId == Guid.Empty
                    ? dto.InitialEmployeeCount   // only for main departments
                    : null,
                ParentDepartmentId = department.ParentDepartmentId
            };

            //return CreatedAtAction(nameof(GetDepartmentById), new { id = department.Id }, created);
            // ============================
            // NEW: EXTRA RESPONSE DATA
            // ============================
            if (dto.ParentDepartmentId == null || dto.ParentDepartmentId == Guid.Empty)
            {
                // MAIN DEPARTMENT CREATED

                // Get all sub-department IDs recursively
                var allDeptIds = await GetAllSubDepartmentIds(department.Id);
                allDeptIds.Add(department.Id);

                // Total employees under department & sub-departments
                var totalEmployees = await _context.Employees
                    .CountAsync(e => e.DepartmentId.HasValue && allDeptIds.Contains(e.DepartmentId.Value));

                // New hires in the last 30 days
                var newHires = await _context.Employees
                    .Where(e => e.DepartmentId.HasValue &&
                                allDeptIds.Contains(e.DepartmentId.Value) &&
                                e.HireDate >= DateTime.UtcNow.AddDays(-30))
                    .Select(e => new
                    {
                        EmployeeName = (e.FirstName + " " + e.LastName).Trim(),
                        e.JobTitle,
                        e.PhoneNumber,
                        e.HireDate
                    })
                    .ToListAsync();


                return Ok(new
                {
                    message = "Main department created successfully",
                    Id = department.Id,
                    departmentName = department.DepartmentName,
                    departmentHeadName = created.DepartmentHeadName ?? "No Head Assigned",
                    totalEmployees = totalEmployees,
                    newHires = newHires
                });

            }
            else
            {
                // SUB-DEPARTMENT CREATED
                var employees = await _context.Employees
                    .Where(e => e.DepartmentId == department.Id)
                    .Select(e => new
                    {
                        EmployeeName = (e.FirstName + " " + e.LastName).Trim(),
                        Position = e.JobTitle,                     // alias JobTitle as Position
                        DepartmentName = e.Department!.DepartmentName, // navigation property
                        e.PhoneNumber
                    })
                    .ToListAsync();

                return Ok(new
                {
                    message = "Sub-department created successfully",
                    subDepartment = created.DepartmentName,
                    employees = employees
                });
            }
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


            // Only allow InitialEmployeeCount for main departments
            if (existing.ParentDepartmentId != null && existing.ParentDepartmentId != Guid.Empty && dto.InitialEmployeeCount.HasValue)
            {
                return BadRequest(new
                {
                    message = "Sub-departments cannot have an initial employee count. It will always be null."
                });
            }

            // Only allow InitialEmployeeCount for main departments
            existing.InitialEmployeeCount = existing.ParentDepartmentId == null || existing.ParentDepartmentId == Guid.Empty
                ? dto.InitialEmployeeCount   // main department can be updated
                : null;                      // sub-department must always be null
            existing.ParentDepartmentId = dto.ParentDepartmentId;

            await _context.SaveChangesAsync();
            // ============================
            // EXTRA RESPONSE DATA
            // ============================
            var allDeptIds = await GetAllSubDepartmentIds(existing.Id);
            allDeptIds.Add(existing.Id);

            var totalEmployees = await _context.Employees
                .CountAsync(e => e.DepartmentId.HasValue && allDeptIds.Contains(e.DepartmentId.Value));

            var newHires = await _context.Employees
                .Where(e => e.DepartmentId.HasValue &&
                            allDeptIds.Contains(e.DepartmentId.Value) &&
                            e.HireDate >= DateTime.UtcNow.AddDays(-30))
                .Select(e => new
                {
                    EmployeeName = (e.FirstName + " " + e.LastName).Trim(),
                    Position = e.JobTitle,
                    e.PhoneNumber,
                    e.HireDate
                })
                .ToListAsync();

            return Ok(new
            {
                message = "Department updated successfully",
                departmentId = existing.Id,
                departmentName = existing.DepartmentName,
                totalEmployees = totalEmployees,
                newHires = newHires
            });
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

        // ===================================
        // Recursive Get All Sub-Department IDs
        // ===================================
        private async Task<List<Guid>> GetAllSubDepartmentIds(Guid parentId)
        {
            var subDepartments = await _context.Departments
                .Where(d => d.ParentDepartmentId == parentId)
                .Select(d => d.Id)
                .ToListAsync();

            var allIds = new List<Guid>(subDepartments);

            foreach (var subId in subDepartments)
            {
                var childIds = await GetAllSubDepartmentIds(subId);
                allIds.AddRange(childIds);
            }

            return allIds;
        }


        //List of department names
        [HttpGet("all-department-names")]
        public async Task<IActionResult> GetAllDepartmentNames()
        {
            var departmentNames = await _context.Departments
                .Select(d => d.DepartmentName)
                .ToListAsync();

            return Ok(departmentNames);
        }

        //List of subdepartment 
        [HttpGet("subdepartment-names")]
        public async Task<IActionResult> GetAllSubDepartmentNames()
        {
            var subDepartmentNames = await _context.Departments
                .Where(d => d.ParentDepartmentId != null)
                .Select(d => d.DepartmentName)
                .ToListAsync();

            return Ok(subDepartmentNames);
        }


        //// GET: api/departments/employees-by-department?name=DepartmentName
        //[HttpGet("employees-by-department")]
        //public async Task<IActionResult> GetEmployeesByDepartmentName(string name)
        //{
        //    // Find the department by name
        //    var department = await _context.Departments
        //        .FirstOrDefaultAsync(d => d.DepartmentName == name /*&& d.ParentDepartmentId == null*/);

        //    if (department == null)
        //        return NotFound($"Department '{name}' not found.");

        //    // Get employees in this main department
        //    var employees = await _context.Employees
        //        .Where(e => e.DepartmentId == department.Id)
        //        .Select(e => new
        //        {
        //            e.EmployeeID,
        //            EmployeeName = (e.FirstName + " " + e.LastName).Trim(),
        //            e.JobTitle,
        //            DepartmentName = department.DepartmentName,
        //            e.PhoneNumber
        //        })
        //        .ToListAsync();

        //    return Ok(employees);
        //}

        //// GET: api/departments/employees-by-subdepartment?name=SubDepartmentName
        //[HttpGet("employees-by-subdepartment")]
        //public async Task<IActionResult> GetEmployeesBySubDepartmentName(string name)
        //{
        //    // Find the subdepartment by name
        //    var subDepartment = await _context.Departments
        //        .FirstOrDefaultAsync(d => d.DepartmentName == name && d.ParentDepartmentId != null);

        //    if (subDepartment == null)
        //        return NotFound($"Subdepartment '{name}' not found.");

        //    // Get employees in this subdepartment
        //    var employees = await _context.Employees
        //        .Where(e => e.DepartmentId == subDepartment.Id)
        //        .Select(e => new
        //        {
        //            e.EmployeeID,
        //            EmployeeName = (e.FirstName + " " + e.LastName).Trim(),
        //            e.JobTitle,
        //            DepartmentName = subDepartment.DepartmentName,
        //            e.PhoneNumber
        //        })
        //        .ToListAsync();

        //    return Ok(employees);
        //}

        // GET: api/departments/employees/search
        [HttpGet("employees/search")]
        public async Task<IActionResult> GetEmployeesByNameAndDepartment([FromQuery] string? employeeName, [FromQuery] string? departmentName)
        {
            if (string.IsNullOrWhiteSpace(employeeName) && string.IsNullOrWhiteSpace(departmentName))
                return BadRequest("Provide either an employee name or a department name.");

            var query = _context.Employees.AsQueryable();

            if (!string.IsNullOrWhiteSpace(employeeName))
            {
                var nameLower = employeeName.Trim().ToLower();
                query = query.Where(e =>
                    (e.FirstName + " " + e.LastName).ToLower().Contains(nameLower));
            }

            if (!string.IsNullOrWhiteSpace(departmentName))
            {
                var deptLower = departmentName.Trim().ToLower();
                query = query.Where(e =>
                    e.Department != null &&
                    e.Department.DepartmentName.ToLower().Contains(deptLower));
            }

            var employees = await query
                .Select(e => new
                {
                    e.EmployeeID,
                    EmployeeName = (e.FirstName + " " + e.LastName).Trim(),
                    e.JobTitle,
                    DepartmentName = e.Department != null ? e.Department.DepartmentName : "N/A",
                    e.PhoneNumber
                })
                .ToListAsync();

            if (!employees.Any())
                return NotFound("No employees found for the given criteria.");

            return Ok(employees);
        }

        // GET: api/departments/employees/sub/search
        [HttpGet("employees/sub/search")]
        public async Task<IActionResult> GetEmployeesByNameAndSubDepartment([FromQuery] string? employeeName, [FromQuery] string? subDepartmentName)
        {
            if (string.IsNullOrWhiteSpace(employeeName) && string.IsNullOrWhiteSpace(subDepartmentName))
                return BadRequest("Provide either an employee name or a sub-department name.");

            var query = _context.Employees
                .Include(e => e.Department)  // ensure navigation property is loaded
                .Where(e => e.Department != null && e.Department.ParentDepartmentId != null); // only sub-departments

            if (!string.IsNullOrWhiteSpace(employeeName))
            {
                var nameLower = employeeName.Trim().ToLower();
                query = query.Where(e => (e.FirstName + " " + e.LastName).ToLower().Contains(nameLower));
            }

            if (!string.IsNullOrWhiteSpace(subDepartmentName))
            {
                var deptLower = subDepartmentName.Trim().ToLower();
                query = query.Where(e => e.Department.DepartmentName.ToLower().Contains(deptLower));
            }

            var employees = await query
                .Select(e => new
                {
                    e.EmployeeID,
                    EmployeeName = (e.FirstName + " " + e.LastName).Trim(),
                    e.JobTitle,
                    DepartmentName = e.Department != null ? e.Department.DepartmentName : "N/A",
                    e.PhoneNumber
                })
                .ToListAsync();

            if (!employees.Any())
                return NotFound("No employees found for the given criteria.");

            return Ok(employees);
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
        public int? InitialEmployeeCount { get; set; }
        public Guid? ParentDepartmentId { get; set; }
    }

    public sealed class DepartmentCreateUpdateDto
    {
        public Guid OrganizationId { get; set; }
        public string DepartmentName { get; set; } = null!;
        public Guid? DepartmentHeadId { get; set; } // optional
        public string? DepartmentCode { get; set; }
        public int? InitialEmployeeCount { get; set; }
        public Guid? ParentDepartmentId { get; set; }
    }
}
