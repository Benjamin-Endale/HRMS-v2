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
                    EmployeeName = g.Employee != null
                        ? g.Employee.FirstName + " " + g.Employee.LastName
                        : "Unknown",

                    GoalTitle = g.GoalTitle,
                    Category = g.Category,
                    Priority = g.Priority,
                    DueDate = g.DueDate,
                    Status = g.Status,
                    Description = g.Description,
                    GoalProcess = g.GoalProcess

                })
                .FirstOrDefaultAsync();

            var Employeegoal = new
            {
                GoalTitle = goal.GoalTitle,
                Category = goal.Category,
                Priority = goal.Priority,
                DueDate = goal.DueDate,
                Description = goal.Description,
                GoalProcess = goal.GoalProcess

            };

            // Get active goals count
            var activeGoalsCount = await _context.Goals
                .Where(g => g.Status == "InProgress")
                .CountAsync();

            return Ok(new
            {
                Goal = goalDetails,
                ActiveGoals = activeGoalsCount,
                Employeegoal = Employeegoal
            });
            //return CreatedAtAction(nameof(GetGoalById), new { id = goal.Id }, goal);
        }


        // UPDATE goal
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGoal(Guid id, [FromBody] GoalDto dto)
        {
            var goal = await _context.Goals
                .Include(g => g.Employee)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (goal == null)
                return NotFound(new { message = "Goal not found" });

            // Apply updates
            goal.GoalTitle = dto.GoalTitle;
            goal.Category = dto.Category;
            goal.Priority = dto.Priority;
            goal.DueDate = dto.DueDate;
            goal.Status = dto.Status;
            goal.Description = dto.Description;

            _context.Goals.Update(goal);
            await _context.SaveChangesAsync();

            //  Get the updated goal details
            var goalDetails = await _context.Goals
                .Where(g => g.Id == goal.Id)
                .Select(g => new
                {
                    EmployeeName = g.Employee != null
                        ? g.Employee.FirstName + " " + g.Employee.LastName
                        : "Unknown",

                    GoalTitle = g.GoalTitle,
                    Category = g.Category,
                    Priority = g.Priority,
                    DueDate = g.DueDate,
                    Status = g.Status,
                    Description = g.Description
                })
                .FirstOrDefaultAsync();

            //  Get active goals count
            var activeGoalsCount = await _context.Goals
                .Where(g => g.Status == "Active")
                .CountAsync();

            //  Return the same structure as in Create
            return Ok(new
            {
                Message = "Goal updated successfully.",
                Goal = goalDetails,
                ActiveGoals = activeGoalsCount
            });
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
                    EmployeeName = g.Employee != null
                        ? g.Employee.FirstName + " " + g.Employee.LastName
                        : "Unknown",

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


        // GET: api/goals/search
        [HttpGet("search")]
        public async Task<IActionResult> SearchGoals([FromQuery] string? goalTitle, [FromQuery] string? category)
        {
            if (string.IsNullOrWhiteSpace(goalTitle) && string.IsNullOrWhiteSpace(category))
                return BadRequest("Provide either a goal title or a category.");

            var query = _context.Goals.AsQueryable();

            if (!string.IsNullOrWhiteSpace(goalTitle))
            {
                var titleLower = goalTitle.Trim().ToLower();
                query = query.Where(g => g.GoalTitle.ToLower().Contains(titleLower));
            }

            if (!string.IsNullOrWhiteSpace(category))
            {
                var categoryLower = category.Trim().ToLower();
                query = query.Where(g => g.Category.ToLower().Contains(categoryLower));
            }

            var goals = await query
                .Include(g => g.Employee)
                .Select(g => new
                {
                    GoalId = g.Id,
                    GoalTitle = g.GoalTitle,
                    Category = g.Category,
                    Priority = g.Priority,
                    DueDate = g.DueDate,
                    Status = g.Status,
                    EmployeeName = g.Employee != null ? g.Employee.FirstName + " " + g.Employee.LastName : "Unknown",
                    Description = g.Description
                })
                .ToListAsync();

            if (!goals.Any())
                return NotFound("No goals found for the given criteria.");

            return Ok(goals);
        }

        // POST or PUT (update goal progress)
        [HttpPost("{id}/updateProgress")]
        public async Task<IActionResult> UpdateGoalProgress(Guid id, [FromBody] int newProgress)
        {
            var goal = await _context.Goals.FindAsync(id);
            if (goal == null) return NotFound();

            goal.GoalProcess = newProgress; // 0-100

            // Update status dynamically
            goal.Status = GetGoalStatus(goal.GoalProcess);

            await _context.SaveChangesAsync();

            // ---- Calculate Overall Progress After Update ----
            var totalGoals = await _context.Goals.CountAsync();
            var overallProgress = totalGoals > 0 ? await _context.Goals.AverageAsync(g => g.GoalProcess) : 0;

            //var completedGoals = await _context.Goals.CountAsync(g => g.GoalProcess >= 100);
            //var completionRate = totalGoals > 0 ? (completedGoals * 100.0) / totalGoals : 0;


            return Ok(new
            {
                UpdatedGoal = new
                {
                    goal.Id,
                    GoalProcess = goal.GoalProcess,
                    Status = goal.Status
                },
                Overall = new
                {
                    OverallProgress = overallProgress,
                    //CompletionRate = completionRate
                }
            });
        }

        // Helper method to compute status
        private string GetGoalStatus(int progress)
        {
            return progress >= 100 ? "Complete" : "InProgress";
        }


    }
}
