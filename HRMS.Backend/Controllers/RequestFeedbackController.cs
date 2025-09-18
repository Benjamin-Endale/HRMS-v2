//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using HRMS.Backend.Data;
//using HRMS.Backend.DTOs;
//using HRMS.Backend.Models;

//namespace HRMS.Backend.Controllers
//{
//    [ApiController]
//    [Route("api/[controller]")]
//    public class RequestFeedbackController : ControllerBase
//    {
//        private readonly AppDbContext _context;

//        public RequestFeedbackController(AppDbContext context)
//        {
//            _context = context;
//        }

//        // ============================
//        // CREATE Request Feedback
//        // ============================
//        [HttpPost]
//        public async Task<ActionResult<RequestFeedback>> CreateRequestFeedback([FromBody] RequestFeedbackDto dto)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            // Check if Employee exists
//            var employeeExists = await _context.Employees.AnyAsync(e => e.EmployeeID == dto.EmployeeId);
//            if (!employeeExists)
//                return BadRequest(new { message = "Employee does not exist" });

//            var feedback = new RequestFeedback
//            {
//                EmployeeId = dto.EmployeeId,
//                FeedbackDeadline = dto.FeedbackDeadline,
//                FeedbackSources = dto.FeedbackSources,
//                InstructionReviewers = dto.InstructionReviewers
//            };

//            _context.RequestFeedbacks.Add(feedback);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction(nameof(GetRequestFeedbackById), new { id = feedback.Id }, feedback);
//        }

//        // ============================
//        // GET Feedback by ID
//        // ============================
//        [HttpGet("{id}")]
//        public async Task<ActionResult<RequestFeedback>> GetRequestFeedbackById(Guid id)
//        {
//            var feedback = await _context.RequestFeedbacks.FindAsync(id);

//            if (feedback == null)
//                return NotFound(new { message = "Feedback not found" });

//            return Ok(feedback);
//        }


//    }
//}
