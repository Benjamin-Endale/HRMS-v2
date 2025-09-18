using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using HRMS.Backend.Data;
using HRMS.Backend.DTOs;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/employees")]
    [Produces("application/json")]
    public class EmployeesController : ControllerBase
    {
        private readonly AppDbContext _context;
        public EmployeesController(AppDbContext context) => _context = context;

        // POST: api/employees
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EmployeeCreateDto dto)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            // Basic FK existence checks
            var tenantExists = await _context.Tenants.AnyAsync(t => t.Id == dto.TenantId);
            if (!tenantExists) return BadRequest($"Tenant {dto.TenantId} not found.");

            var org = await _context.Organizations.AsNoTracking()
                                 .FirstOrDefaultAsync(o => o.Id == dto.OrganizationId && o.TenantId == dto.TenantId);
            if (org is null) return BadRequest("Organization not found in the specified tenant.");

            if (dto.DepartmentId.HasValue)
            {
                var deptOk = await _context.Departments.AnyAsync(d =>
                    d.Id == dto.DepartmentId.Value &&
                    d.OrganizationId == dto.OrganizationId &&
                    d.TenantId == dto.TenantId);
                if (!deptOk) return BadRequest("Department not found in the specified organization/tenant.");
            }

            var roleExists = await _context.Roles.AnyAsync(r => r.Id == dto.RoleId);
            if (!roleExists) return BadRequest($"Role {dto.RoleId} not found.");

            // Uniqueness checks (per tenant)
            var emailClash = await _context.Employees.AnyAsync(e => e.TenantId == dto.TenantId && e.Email == dto.Email);
            if (emailClash) return Conflict(new { message = "Email already exists in tenant." });

            // Username unique per tenant
            var username = dto.Username.Trim();
            var usernameClash = await _context.Employees.AnyAsync(e => e.TenantId == dto.TenantId && e.Username == username);
            if (usernameClash) return Conflict(new { message = "Username already exists in tenant." });

            // EmployeeCode: generate if null/empty; ensure uniqueness per tenant
            var employeeCode = string.IsNullOrWhiteSpace(dto.EmployeeCode)
                ? await GenerateUniqueEmployeeCodeAsync(dto.TenantId, dto.FirstName, dto.LastName)
                : dto.EmployeeCode!.Trim().ToUpperInvariant();

            if (!string.IsNullOrWhiteSpace(dto.EmployeeCode))
            {
                var codeClash = await _context.Employees.AnyAsync(e => e.TenantId == dto.TenantId && e.EmployeeCode == employeeCode);
                if (codeClash) return Conflict(new { message = "Employee code already exists in tenant." });
            }

            var entity = new Employee
            {
                EmployeeID = Guid.NewGuid(),
                TenantId = dto.TenantId,
                OrganizationId = dto.OrganizationId,
                DepartmentId = dto.DepartmentId,      // nullable OK
                RoleId = dto.RoleId,

                FirstName = dto.FirstName.Trim(),
                LastName = dto.LastName.Trim(),
                DateOfBirth = dto.DateOfBirth,
                Gender = dto.Gender.Trim(),
                Nationality = dto.Nationality.Trim(),
                MaritalStatus = dto.MaritalStatus.Trim(),

                Email = dto.Email.Trim(),
                PhoneNumber = dto.PhoneNumber.Trim(),
                Address = dto.Address.Trim(),
                EmergencyContactName = dto.EmergencyContactName.Trim(),
                EmergencyContactNumber = dto.EmergencyContactNumber.Trim(),

                JobTitle = dto.JobTitle.Trim(),
                EmploymentType = dto.EmploymentType.Trim(),
                EmployeeEducationStatus = dto.EmployeeEducationStatus.Trim(),
                PhotoUrl = dto.PhotoUrl.Trim(),
                // If JoiningDate is null, use current UTC date as default
                HireDate = dto.HireDate == default ? DateTime.UtcNow : dto.HireDate,

                EmployeeCode = employeeCode,
                Username = username,
                PasswordHash = HashPassword(dto.Password),

                BankDetails = string.IsNullOrWhiteSpace(dto.BankDetails) ? "{}" : dto.BankDetails,
                CustomFields = string.IsNullOrWhiteSpace(dto.CustomFields) ? "{}" : dto.CustomFields,
                BenefitsEnrollment = dto.BenefitsEnrollment,
                ShiftDetails = dto.ShiftDetails,

                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Employees.Add(entity);
            await _context.SaveChangesAsync();

            // Fetch the created employee along with department and role details
            var createdEmployee = await _context.Employees
                .Where(e => e.EmployeeID == entity.EmployeeID)
                .Include(e => e.Department)  // Include Department if it exists
                .Include(e => e.Role)        // Include Role
                .AsNoTracking()
                .Select(e => new
                {
                    e.EmployeeID,
                    EmployeeName = $"{e.FirstName} {e.LastName}",
                    Department = e.Department != null ? e.Department.DepartmentName : null, // Null if no department
                    RoleName = e.Role.Name
                })
                .FirstOrDefaultAsync();

            return CreatedAtAction(nameof(GetById), new { id = entity.EmployeeID }, createdEmployee);
        }


        // DELETE: api/employees/{id}
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var e = await _context.Employees.FindAsync(id);
            if (e == null) return NotFound();

            _context.Employees.Remove(e);
            await _context.SaveChangesAsync();
            return NoContent();
        }


        // GET: api/employees/{id}
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var e = await _context.Employees.AsNoTracking().FirstOrDefaultAsync(x => x.EmployeeID == id);
            if (e == null) return NotFound();
            return Ok(e); // or map to a read DTO if you prefer
        }

        // PUT: api/employees/{id}
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] EmployeeUpdateDto dto)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);
            if (id != dto.EmployeeId) return BadRequest("Employee ID mismatch.");

            var e = await _context.Employees.FirstOrDefaultAsync(x => x.EmployeeID == id);
            if (e is null) return NotFound();

            // FK existence checks (same as create)
            var org = await _context.Organizations.AsNoTracking()
                         .FirstOrDefaultAsync(o => o.Id == dto.OrganizationId && o.TenantId == dto.TenantId);
            if (org is null) return BadRequest("Organization not found in the specified tenant.");

            if (dto.DepartmentId.HasValue)
            {
                var deptOk = await _context.Departments.AnyAsync(d =>
                    d.Id == dto.DepartmentId.Value &&
                    d.OrganizationId == dto.OrganizationId &&
                    d.TenantId == dto.TenantId);
                if (!deptOk) return BadRequest("Department not found in the specified organization/tenant.");
            }

            var roleExists = await _context.Roles.AnyAsync(r => r.Id == dto.RoleId);
            if (!roleExists) return BadRequest($"Role {dto.RoleId} not found.");

            // Uniqueness checks on change
            if (!string.Equals(e.Email, dto.Email, StringComparison.OrdinalIgnoreCase))
            {
                var emailClash = await _context.Employees.AnyAsync(x =>
                    x.TenantId == dto.TenantId && x.Email == dto.Email && x.EmployeeID != e.EmployeeID);
                if (emailClash) return Conflict(new { message = "Email already exists in tenant." });
            }

            var newUsername = dto.Username.Trim();
            if (!string.Equals(e.Username, newUsername, StringComparison.Ordinal))
            {
                var usernameClash = await _context.Employees.AnyAsync(x =>
                    x.TenantId == dto.TenantId && x.Username == newUsername && x.EmployeeID != e.EmployeeID);
                if (usernameClash) return Conflict(new { message = "Username already exists in tenant." });
            }

            string? newCode = dto.EmployeeCode;
            if (string.IsNullOrWhiteSpace(newCode))
            {
                // keep existing; if empty, generate
                if (string.IsNullOrWhiteSpace(e.EmployeeCode))
                    e.EmployeeCode = await GenerateUniqueEmployeeCodeAsync(dto.TenantId, dto.FirstName, dto.LastName);
            }
            else
            {
                newCode = newCode.Trim().ToUpperInvariant();
                if (!string.Equals(e.EmployeeCode, newCode, StringComparison.Ordinal))
                {
                    var codeClash = await _context.Employees.AnyAsync(x =>
                        x.TenantId == dto.TenantId && x.EmployeeCode == newCode && x.EmployeeID != e.EmployeeID);
                    if (codeClash) return Conflict(new { message = "Employee code already exists in tenant." });
                    e.EmployeeCode = newCode;
                }
            }

            // Apply changes
            e.TenantId = dto.TenantId;
            e.OrganizationId = dto.OrganizationId;
            e.DepartmentId = dto.DepartmentId;
            e.RoleId = dto.RoleId;

            e.Username = newUsername;
            if (!string.IsNullOrWhiteSpace(dto.Password))
                e.PasswordHash = HashPassword(dto.Password);

            e.FirstName = dto.FirstName.Trim();
            e.LastName = dto.LastName.Trim();
            e.DateOfBirth = dto.DateOfBirth;
            e.Gender = dto.Gender.Trim();
            e.Nationality = dto.Nationality.Trim();
            e.MaritalStatus = dto.MaritalStatus.Trim();

            e.Email = dto.Email.Trim();
            e.PhoneNumber = dto.PhoneNumber.Trim();
            e.Address = dto.Address.Trim();
            e.EmergencyContactName = dto.EmergencyContactName.Trim();
            e.EmergencyContactNumber = dto.EmergencyContactNumber.Trim();

            e.JobTitle = dto.JobTitle.Trim();
            e.EmploymentType = dto.EmploymentType.Trim();
            e.EmployeeEducationStatus = dto.EmployeeEducationStatus.Trim();
            e.PhotoUrl = dto.PhotoUrl.Trim();
            e.HireDate = dto.HireDate;

            e.BankDetails = string.IsNullOrWhiteSpace(dto.BankDetails) ? "{}" : dto.BankDetails;
            e.CustomFields = string.IsNullOrWhiteSpace(dto.CustomFields) ? "{}" : dto.CustomFields;
            e.BenefitsEnrollment = dto.BenefitsEnrollment;
            e.ShiftDetails = dto.ShiftDetails;

            e.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return NoContent();
        }
        // GET by department
        [HttpGet("by-department/{tenantId}/{departmentId}")]
        public async Task<ActionResult<object>> GetByDepartment(Guid tenantId, Guid departmentId)
        {
            if (tenantId == Guid.Empty || departmentId == Guid.Empty)
                return BadRequest("tenantId and departmentId are required.");

            // Get total employees in department
            var totalEmployeesInDepartment = await _context.Employees
                .AsNoTracking()
                .Where(e => e.TenantId == tenantId && e.DepartmentId == departmentId)
                .CountAsync();

            // Get count of new hires in the department for the current month
            var newHiresInDepartment = await _context.Employees
                .AsNoTracking()
                .Where(e => e.TenantId == tenantId && e.DepartmentId == departmentId && e.HireDate.Month == DateTime.UtcNow.Month && e.HireDate.Year == DateTime.UtcNow.Year)
                .CountAsync();

            var employees = await _context.Employees
                .AsNoTracking()
                .Where(e => e.TenantId == tenantId && e.DepartmentId == departmentId)
                .OrderBy(e => e.LastName).ThenBy(e => e.FirstName)
                .Select(e => new EmployeeListDto
                {
                    EmployeeID = e.EmployeeID,
                    TenantId = e.TenantId,
                    OrganizationId = e.OrganizationId,
                    DepartmentId = e.DepartmentId,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Email = e.Email,
                    EmployeeCode = e.EmployeeCode,
                    JobTitle = e.JobTitle
                })
                .ToListAsync();

            return Ok(new
            {
                TotalEmployeesInDepartment = totalEmployeesInDepartment,
                NewHiresThisMonth = newHiresInDepartment,
                Employees = employees
            });
        }

        //get employee by employee code
        [HttpGet("by-employee-code/{tenantId}/{employeeCode}")]
        public async Task<ActionResult<EmployeeDetailDto>> GetByEmployeeCode(Guid tenantId, string employeeCode)
        {
            if (tenantId == Guid.Empty || string.IsNullOrWhiteSpace(employeeCode))
                return BadRequest("tenantId and employeeCode are required.");

            var employee = await _context.Employees
                .AsNoTracking()
                .Where(e => e.TenantId == tenantId && e.EmployeeCode == employeeCode)
                .Select(e => new EmployeeDetailDto
                {
                    EmployeeID = e.EmployeeID,
                    TenantId = e.TenantId,
                    OrganizationId = e.OrganizationId,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Email = e.Email,
                    EmployeeCode = e.EmployeeCode,
                    JobTitle = e.JobTitle,
                    DepartmentId = e.DepartmentId
                })
                .FirstOrDefaultAsync();

            if (employee == null)
                return NotFound($"Employee with code {employeeCode} not found.");

            return Ok(employee);
        }
        //get total employees in a tenant
        [HttpGet("total-employees/{tenantId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetAll(Guid tenantId)
        {
            if (tenantId == Guid.Empty)
                return BadRequest("tenantId is required.");

            var totalEmployees = await _context.Employees
                .AsNoTracking()
                .Where(e => e.TenantId == tenantId)
                .CountAsync();

            var employees = await _context.Employees
                .AsNoTracking()
                .Where(e => e.TenantId == tenantId)
                .OrderBy(e => e.LastName).ThenBy(e => e.FirstName)
                .Select(e => new
                {
                    e.EmployeeID,
                    e.FirstName,
                    e.LastName,
                    e.Email,
                    e.EmployeeCode,
                    e.OrganizationId,
                    e.DepartmentId,
                    e.TenantId,
                    e.RoleId
                })
                .ToListAsync();

            return Ok(new { TotalEmployees = totalEmployees, Employees = employees });
        }


        // Helper method for hashing the password
        private static string HashPassword(string password)
        {
            var data = Encoding.UTF8.GetBytes(password);
            var hash = SHA256.HashData(data);
            return Convert.ToHexString(hash);
        }

        // Helper method for generating a unique employee code
        private async Task<string> GenerateUniqueEmployeeCodeAsync(Guid tenantId, string firstName, string lastName)
        {
            var basePart = new string($"{firstName}{lastName}".Where(char.IsLetterOrDigit).ToArray()).ToUpperInvariant();
            if (basePart.Length < 4) basePart = (basePart + "XXXX").Substring(0, 4);
            else basePart = basePart.Substring(0, Math.Min(6, basePart.Length));

            string candidate;
            var rnd = RandomNumberGenerator.Create();
            do
            {
                var bytes = new byte[2];
                rnd.GetBytes(bytes);
                var suffix = (BitConverter.ToUInt16(bytes, 0) % 900 + 100);
                candidate = $"{basePart}-{suffix}";
            }
            while (await _context.Employees.AnyAsync(e => e.TenantId == tenantId && e.EmployeeCode == candidate));

            return candidate;
        }
    }
}
