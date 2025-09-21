using HRMS.Backend.DTOs;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Backend.Data;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly AppDbContext _db;

        public FeedbackController(AppDbContext db)
        {
            _db = db;
        }

        // POST: api/feedback/submit
        [HttpPost("submit")]
        public async Task<IActionResult> SubmitFeedback([FromBody] SubmitFeedbackDto dto)
        {
            // Validate request
            var request = await _db.RequestFeedbacks
                .Include(r => r.Employee)     // load employee
                .Include(r => r.Department)   // load department
                .FirstOrDefaultAsync(r => r.Id == dto.RequestFeedbackId);




            if (request == null)
                return NotFound("RequestFeedback not found.");

            var reviewer = await _db.Employees
                .FirstOrDefaultAsync(e => e.EmployeeID == dto.ReviewerId);



            if (reviewer == null)
                return NotFound("Reviewer not found.");

            // Check reviewer is from the same department as request
            if (request.DepartmentId != null && reviewer.DepartmentId != request.DepartmentId)
            {
                return BadRequest("Reviewer is not part of the required department for this feedback request.");
            }

            // Prevent self-feedback
            if (request.EmployeeId == dto.ReviewerId)
            {
                return BadRequest("You cannot submit feedback for yourself.");
            }



            // Create feedback response
            var response = new FeedbackResponse
            {
                RequestFeedbackId = dto.RequestFeedbackId,
                ReviewerId = dto.ReviewerId,
                Feedback = dto.Feedback,
                SubmittedAt = DateTime.UtcNow
            };

            _db.FeedbackResponses.Add(response);
            await _db.SaveChangesAsync();

            return Ok(new
            {
                message = "Feedback submitted successfully.",
                EmployeeId = request.EmployeeId,
                employeeName = request.Employee != null
                    ? $"{request.Employee.FirstName} {request.Employee.LastName}"
                    : null,
                departmentName = request.Department?.DepartmentName,
                ReviewerId = response.ReviewerId,
                reviewerName = $"{reviewer.FirstName} {reviewer.LastName}",
                submittedAt = response.SubmittedAt,
                feedback = response.Feedback
            });


        }
    }
}
