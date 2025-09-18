using HRMS.Backend.Data;
using HRMS.Backend.DTOs;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShortlistController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShortlistController(AppDbContext context)
        {
            _context = context;
        }

        // Get all shortlists
        [HttpGet]
        public async Task<IActionResult> GetAllShortlists()
        {
            var shortlists = await _context.Shortlists
                .Select(s => new
                {
                    s.ShortlistID,
                    s.position,
                    s.Name,
                    s.Status,
                    s.ShortlistedOn
                })
                .ToListAsync();

            return Ok(shortlists);
        }

        // Move applicant to shortlist & delete applicant
        [HttpPost("move/{applicantId}")]
        public async Task<IActionResult> MoveApplicantToShortlist(Guid applicantId)
        {
            var applicant = await _context.Applicants.FirstOrDefaultAsync(a => a.Id == applicantId);
            if (applicant == null)
                return NotFound(new { message = "Applicant not found." });

            if (!applicant.JobId.HasValue)
                return BadRequest(new { message = "Applicant must have a JobID." });

            var shortlist = new Shortlist
            {
                JobID = applicant.JobId.Value,
                Name = applicant.Name,
                Email = applicant.Email,
                Phone = applicant.Phone,
                ResumeUrl = applicant.ResumeUrl,
                Notes = applicant.Notes,
                Status = "Shortlist",
                ShortlistedOn = DateTime.UtcNow
            };

            _context.Shortlists.Add(shortlist);
            _context.Applicants.Remove(applicant);

            await _context.SaveChangesAsync();

            // Return the JSON structure as in GetAllShortlists
            var result = new
            {
                shortlist.ShortlistID,
                shortlist.position,
                shortlist.Name,
                shortlist.Status,
                shortlist.ShortlistedOn
            };

            return Ok(result);
            //return Ok(new { message = "Applicant moved to shortlist successfully." });
        }

        // Get shortlists by JobID
        [HttpGet("job/{jobId}")]
        public async Task<IActionResult> GetShortlistsByJob(Guid jobId)
        {
            var shortlists = await _context.Shortlists
                .Where(s => s.JobID == jobId)
                .Select(s => new ShortlistDTO
                {
                    ShortlistID = s.ShortlistID,
                    JobID = s.JobID,
                    Name = s.Name,
                    Email = s.Email,
                    Phone = s.Phone,
                    ResumeUrl = s.ResumeUrl,
                    Notes = s.Notes,
                    position = s.position,
                    Status = s.Status,
                    ShortlistedOn = s.ShortlistedOn
                })
                .ToListAsync();

            if (!shortlists.Any())
                return NotFound(new { message = "No shortlists found for this job." });

            return Ok(shortlists);
        }

        // DELETE: api/shortlist/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShortlist(Guid id)
        {
            var shortlist = await _context.Shortlists.FindAsync(id);
            if (shortlist == null)
                return NotFound(new { message = "Shortlist record not found." });

            _context.Shortlists.Remove(shortlist);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Shortlist record deleted successfully." });
        }
    }
}
