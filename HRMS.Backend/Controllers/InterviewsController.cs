using HRMS.Backend.Data;
using HRMS.Backend.DTOs;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InterviewsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public InterviewsController(AppDbContext context)
        {
            _context = context;
        }

        //  1. Schedule (Create) Interview
        [HttpPost]
        public async Task<IActionResult> ScheduleInterview([FromBody] InterviewDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.ApplicantId == Guid.Empty)
                return BadRequest(new { message = "ApplicantId is required." });

            if (string.IsNullOrWhiteSpace(dto.Type))
                return BadRequest(new { message = "Interview Type is required." });

            if (dto.ScheduledDate.HasValue && dto.ScheduledDate.Value < DateTime.UtcNow)
                return BadRequest(new { message = "ScheduledDate cannot be in the past." });

            var interview = new Interview
            {
                Id = dto.Id == Guid.Empty ? Guid.NewGuid() : dto.Id,
                ApplicantId = dto.ApplicantId,
                InterviewerId = dto.InterviewerId,
                Mode = dto.Type,
                ScheduledDate = dto.ScheduledDate,
                LocationUrl = dto.LocationUrl,
                MeetingUrl = dto.MeetingUrl,
                InterviewNote = dto.InterviewNote,
                ScheduledOn = DateTime.UtcNow
            };

            _context.Interviews.Add(interview);
            await _context.SaveChangesAsync();

            var today = DateTime.UtcNow.Date;

            // Get today's interview count
            var todayCount = await _context.Interviews
                .Where(i => i.ScheduledDate.HasValue && i.ScheduledDate.Value.Date == today)
                .CountAsync();

            // Return latest scheduled interview with selected details
            var latestInterview = await _context.Interviews
                .Include(i => i.Applicant)
                .Include(i => i.Interviewer)
                .Where(i => i.Id == interview.Id)
                .Select(i => new
                {
                    i.Applicant.Name,
                    i.Applicant.Appliedfor,
                    InterviewerName = i.Interviewer != null
                        ? i.Interviewer.FirstName + " " + i.Interviewer.LastName
                        : "Not Assigned",
                    Type = i.Mode,
                    Status = i.Status,
                    ScheduledDate = i.ScheduledDate
                })
                .FirstOrDefaultAsync();

            return Ok(new
            {
                Message = "Interview scheduled successfully.",
                TodayInterviewsCount = todayCount,
                Interview = latestInterview
            });
        }


        //  2. Edit Interview
        [HttpPut("{id}")]
        public async Task<IActionResult> EditInterview(Guid id, [FromBody] InterviewDTO dto)
        {
            var interview = await _context.Interviews.FindAsync(id);
            if (interview == null)
                return NotFound(new { message = "Interview not found" });

            interview.InterviewerId = dto.InterviewerId;
            interview.Mode = dto.Type;
            interview.ScheduledDate = dto.ScheduledDate;
            interview.LocationUrl = dto.LocationUrl;
            interview.MeetingUrl = dto.MeetingUrl;
            interview.InterviewNote = dto.InterviewNote;
            interview.ScheduledOn = DateTime.UtcNow;

            _context.Interviews.Update(interview);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Interview updated successfully." });
        }

        //  3. Delete Interview
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInterview(Guid id)
        {
            var interview = await _context.Interviews.FindAsync(id);
            if (interview == null)
                return NotFound(new { message = "Interview not found" });

            _context.Interviews.Remove(interview);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Interview deleted successfully." });
        }

        //  4. Get All Interviews
        [HttpGet]
        public async Task<IActionResult> GetAllInterviews()
        {
            var interviews = await _context.Interviews
                .Include(i => i.Applicant)
                .Include(i => i.Interviewer)
                .Select(i => new InterviewDTO
                {
                    Id = i.Id,
                    ApplicantId = i.ApplicantId,
                    ApplicantName = i.Applicant.Name,
                    Position = i.Applicant.Appliedfor,
                    InterviewerId = i.InterviewerId,
                    InterviewerName = i.Interviewer != null
                        ? i.Interviewer.FirstName + " " + i.Interviewer.LastName
                        : "Not Assigned",
                    Type = i.Mode,
                    Status = i.Status,
                    ScheduledDate = i.ScheduledDate,
                    LocationUrl = i.LocationUrl,
                    MeetingUrl = i.MeetingUrl,
                    InterviewNote = i.InterviewNote
                }).ToListAsync();

            return Ok(interviews);
        }

        // 5. Get Today's Interviews Count
        [HttpGet("today/count")]
        public async Task<IActionResult> GetTodayInterviewsCount()
        {
            var today = DateTime.UtcNow.Date;

            var count = await _context.Interviews
                .Where(i => i.ScheduledDate.HasValue && i.ScheduledDate.Value.Date == today)
                .CountAsync();

            return Ok(new
            {
                Message = $"Today's Interviews Count = {count}"
            });
        }
    }
}
