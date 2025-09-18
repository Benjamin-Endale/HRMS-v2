using HRMS.Backend.Data;
using HRMS.Backend.DTOs;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerformanceReviewController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PerformanceReviewController(AppDbContext context)
        {
            _context = context;
        }

        // Allowed reviewer IDs mapped to role names
        private static readonly Dictionary<Guid, string> ReviewerRoles = new()
        {
            { Guid.Parse("00000000-0000-0000-0000-000000000001"), "SuperAdmin" },
            { Guid.Parse("00000000-0000-0000-0000-000000000002"), "TenantHR" },
            { Guid.Parse("00000000-0000-0000-0000-000000000004"), "Manager" },
            { Guid.Parse("00000000-0000-0000-0000-000000000005"), "SubManager" }
        };

        // =============================
        // 1. CREATE
        // =============================

        [HttpPost]
        public async Task<IActionResult> CreatePerformanceReview([FromBody] PerformanceReviewDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //  Validate reviewer role from ROLES table
            var reviewerRole = await _context.Roles
                .FirstOrDefaultAsync(r => r.Id == dto.ReviewerId);

            if (reviewerRole == null)
                return BadRequest(new { message = "Reviewer role not found" });

            //  Check if employee exists
            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => e.EmployeeID == dto.EmployeeId);

            if (employee == null)
                return BadRequest(new { message = "Employee not found" });


            //  Calculate Rating Automatically (Average of 5 fields)
            double rating = (dto.TechnicalSkill + dto.Communication + dto.Leadership + dto.Innovation + dto.Teamwork) / 5.0;

            //  Create new performance review
            var review = new PerformanceReview
            {
                Id = dto.Id,
                EmployeeId = dto.EmployeeId,
                ReviewerId = dto.ReviewerId,
                ReviewType = dto.ReviewType,
                TechnicalSkill = dto.TechnicalSkill,
                Communication = dto.Communication,
                Leadership = dto.Leadership,
                Innovation = dto.Innovation,
                Teamwork = dto.Teamwork,
                Rating = rating,
                OverallFeedback = dto.OverallFeedback,
                ReviewCycle = dto.ReviewCycle,
                ReviewPeriodStart = dto.ReviewPeriodStart,
                ReviewPeriodEnd = dto.ReviewPeriodEnd ?? dto.ReviewPeriodStart.AddMonths(3)
            };



            _context.PerformanceReviews.Add(review);
            await _context.SaveChangesAsync();

            //  Return Response with Employee Name, Review Type & Calculated Rating
            var response = new
            {
                EmployeeName = $"{employee.FirstName} {employee.LastName}",
                ReviewType = review.ReviewType,
                Rating = review.Rating
            };

            return Ok(response);
            //return Ok(new { message = "Performance review created successfully" });
        }




        // =========================================
        // GET ALL Performance Reviews
        // =========================================
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reviews = await _context.PerformanceReviews
                .Include(r => r.Employee)
                .Select(r => new
                {
                    r.Id,
                    EmployeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                    r.ReviewType,
                    r.Rating
                })
                .ToListAsync();

            return Ok(reviews);
        }

        // =========================================
        // GET Performance Review by ID
        // =========================================
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var review = await _context.PerformanceReviews
                .Include(r => r.Employee)
                .Where(r => r.Id == id)
                .Select(r => new
                {
                    r.Id,
                    EmployeeName = r.Employee.FirstName + " " + r.Employee.LastName,
                    r.ReviewType,
                    r.Rating,
                    r.TechnicalSkill,
                    r.Communication,
                    r.Leadership,
                    r.Innovation,
                    r.Teamwork
                })
                .FirstOrDefaultAsync();

            if (review == null)
                return NotFound(new { message = "Performance review not found" });

            return Ok(review);
        }

        // =========================================
        // UPDATE Performance Review
        // =========================================
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] PerformanceReview dto)
        {
            // Find the existing review
            var review = await _context.PerformanceReviews
                .Include(r => r.Employee)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (review == null)
                return NotFound(new { message = "Performance review not found" });

            // Update fields
            review.ReviewType = dto.ReviewType;
            review.TechnicalSkill = dto.TechnicalSkill;
            review.Communication = dto.Communication;
            review.Leadership = dto.Leadership;
            review.Innovation = dto.Innovation;
            review.Teamwork = dto.Teamwork;

            //  Recalculate average rating
            review.Rating = (dto.TechnicalSkill + dto.Communication + dto.Leadership + dto.Innovation + dto.Teamwork) / 5.0;

            // Save changes
            _context.PerformanceReviews.Update(review);
            await _context.SaveChangesAsync();

            //  Return EmployeeName, ReviewType & Rating in response
            return Ok(new
            {
                EmployeeName = $"{review.Employee.FirstName} {review.Employee.LastName}",
                review.ReviewType,
                review.Rating,
                message = "Performance review updated successfully"
            });
        }


        // =========================================
        // DELETE Performance Review
        // =========================================
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var review = await _context.PerformanceReviews.FindAsync(id);

            if (review == null)
                return NotFound(new { message = "Performance review not found" });

            _context.PerformanceReviews.Remove(review);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Performance review deleted successfully" });
        }
    }
}
