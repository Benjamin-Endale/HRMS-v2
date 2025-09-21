using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Backend.Data;
using HRMS.Backend.DTOs;
using HRMS.Backend.Models;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RequestFeedbackController : ControllerBase
    {
        private readonly AppDbContext _context;

        public RequestFeedbackController(AppDbContext context)
        {
            _context = context;
        }


        // ============================================
        // 1. CREATE Request (Admin provides department name)
        // ============================================
        [HttpPost("create")]
        public async Task<IActionResult> CreateRequest([FromBody] RequestFeedbackDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Get employee including their department
            var employee = await _context.Employees
                .Include(e => e.Department) // include employee's department
                .FirstOrDefaultAsync(e => e.EmployeeID == dto.EmployeeId);

            if (employee == null)
                return NotFound(new { Message = "Employee not found." });

            //  Find department by name provided in FeedbackSources
            var department = await _context.Departments
                .FirstOrDefaultAsync(d => d.DepartmentName == dto.FeedbackSources);

            if (department == null)
                return NotFound(new { Message = $"Department '{dto.FeedbackSources}' not found." });

            //  Create request
            var request = new RequestFeedback
            {
                Id = Guid.NewGuid(),
                EmployeeId = employee.EmployeeID,
                Employee = employee,
                FeedbackDeadline = dto.FeedbackDeadline,
                FeedbackSources = department.DepartmentName,
                DepartmentId = department.Id,
                Department = department,
                InstructionReviewers = dto.InstructionReviewers,
            };

            _context.RequestFeedbacks.Add(request);
            await _context.SaveChangesAsync();

            //  Return response including employee's department name
            return CreatedAtAction(nameof(GetRequestById), new { id = request.Id }, new
            {
                request.Id,
                request.EmployeeId,
                EmployeeName = $"{employee.FirstName} {employee.LastName}",
                EmployeeDepartment = employee.Department?.DepartmentName, // employee's own department
                request.DepartmentId,
                request.FeedbackDeadline
            });
        }


        // ============================================
        // 2. GET Request By Id
        // ============================================
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetRequestById(Guid id)
        {
            var request = await _context.RequestFeedbacks
                .Include(r => r.Employee)
                    .ThenInclude(e => e.Department) // employee's department
                .Include(r => r.Department)      // department assigned for feedback
                .FirstOrDefaultAsync(r => r.Id == id);

            if (request == null)
                return NotFound();

            return Ok(new
            {
                request.Id,
                request.EmployeeId,
                EmployeeName = $"{request.Employee.FirstName} {request.Employee.LastName}",
                EmployeeDepartment = request.Employee.Department?.DepartmentName, // employee's department
                request.DepartmentId,
                request.FeedbackDeadline
            });
        }

    }
}
