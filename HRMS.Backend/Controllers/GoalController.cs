using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Backend.Data;
using HRMS.Backend.Models;
using HRMS.Backend.DTOs;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GoalController(AppDbContext context)
        {
            _context = context;
        }

        // CRUD Operations for Goals

        // READ All Goals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Goal>>> GetGoals()
        {
            var goals = await _context.Goals.ToListAsync();
            return Ok(goals);
        }

        // READ Goal by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Goal>> GetGoalById(Guid id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null)
                return NotFound(new { message = "Goal not found" });

            return Ok(goal);
        }

        // GET Distinct Categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            var categories = await _context.Goals
                .Select(a => a.Category)
                .Distinct()
                .ToListAsync();

            return Ok(categories);
        }


        // CREATE Goal
        [HttpPost]
        public async Task<ActionResult<Goal>> CreateGoal([FromBody] GoalDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var goal = new Goal
            {
                Id = Guid.NewGuid(),
                EmployeeID = dto.EmployeeID!.Value,
                OrganizationID = dto.OrganizationID!.Value,
                TenantID = dto.TenantID!.Value,
                GoalTitle = dto.GoalTitle,
                Category = dto.Category,
                Priority = dto.Priority,
                Status = dto.Status,
                DueDate = dto.DueDate,
                Description = dto.Description
            };

            _context.Goals.Add(goal);
            await _context.SaveChangesAsync();

            // Get the goal details for response
            var goalDetails = await _context.Goals
                .Where(g => g.Id == goal.Id)
                .Select(g => new
                {
                    EmployeeName = g.Employee.FirstName + " " + g.Employee.LastName,
                    GoalTitle = g.GoalTitle,
                    Category = g.Category,
                    Priority = g.Priority,
                    DueDate = g.DueDate,
                    Status = g.Status,
                    Description = g.Description
                })
                .FirstOrDefaultAsync();

            // Get active goals count
            var activeGoalsCount = await _context.Goals
                .Where(g => g.Status == "Active")
                .CountAsync();

            return Ok(new
            {
                Goal = goalDetails,
                ActiveGoals = activeGoalsCount
            });
            //return CreatedAtAction(nameof(GetGoalById), new { id = goal.Id }, goal);
        }


        // UPDATE Goal
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGoal(Guid id, [FromBody] GoalDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var existingGoal = await _context.Goals.FindAsync(id);
            if (existingGoal == null)
                return NotFound(new { message = "Goal not found" });

            existingGoal.EmployeeID = dto.EmployeeID!.Value;
            existingGoal.OrganizationID = dto.OrganizationID!.Value;
            existingGoal.TenantID = dto.TenantID!.Value;
            existingGoal.GoalTitle = dto.GoalTitle;
            existingGoal.Category = dto.Category;
            existingGoal.Priority = dto.Priority;
            existingGoal.Status = dto.Status;
            existingGoal.DueDate = dto.DueDate;
            existingGoal.Description = dto.Description;

            _context.Goals.Update(existingGoal);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Goal updated successfully" });
        }


        // DELETE Goal
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGoal(Guid id)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null)
                return NotFound(new { message = "Goal not found" });

            _context.Goals.Remove(goal);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Goal deleted successfully" });
        }


       
        // GET Goal Details by ID
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetGoalDetailsById(Guid id)
        {
            var goal = await _context.Goals
                .Where(g => g.Id == id)
                .Select(g => new
                {
                    EmployeeName = g.Employee.FirstName + " " + g.Employee.LastName,
                    GoalTitle = g.GoalTitle,
                    Category = g.Category,
                    Priority = g.Priority,
                    DueDate = g.DueDate,
                    Status = g.Status,
                    Description = g.Description
                })
                .FirstOrDefaultAsync();

            if (goal == null)
                return NotFound(new { message = "Goal not found" });

            return Ok(goal);
        }

        // GET Active Goal Count
        [HttpGet("active/count")]
        public async Task<IActionResult> GetActiveGoalCount()
        {
            var activeGoalsCount = await _context.Goals
                .Where(g => g.Status == "Active")
                .CountAsync();

            return Ok(new { ActiveGoals = activeGoalsCount });
        }
    }
}
