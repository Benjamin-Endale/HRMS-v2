using HRMS.Backend.Data;
using HRMS.Backend.DTOs;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ApplicantController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicantController(AppDbContext context)
        {
            _context = context;
        }

        // ==================================
        // CREATE - Add New Applicant
        // ==================================
        [HttpPost]
        public async Task<IActionResult> CreateApplicant([FromBody] ApplicantDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if Job exists
            if (dto.JobId.HasValue)
            {
                var jobExists = await _context.Jobs.AnyAsync(j => j.Id == dto.JobId.Value);
                if (!jobExists)
                    return BadRequest(new { message = "Invalid Job ID" });
            }

            var applicant = new Applicant
            {
                Id = Guid.NewGuid(),
                JobId = dto.JobId,
                Name = dto.Name,
                Email = dto.Email,
                Phone = dto.Phone,
                ResumeUrl = dto.ResumeUrl,
                Source = dto.Source,
                Notes = dto.Notes,
                Fordepartment = dto.Fordepartment,
                ContactInformation = dto.ContactInformation,
                Appliedfor = dto.Appliedfor,
                Applications = dto.Applications,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Applicants.Add(applicant);
            await _context.SaveChangesAsync();

            var totalApplicant = await _context.Applicants.CountAsync();

            // Return display-like JSON
            var displayJson = new
            {
                applicant.Id,
                applicant.Fordepartment,
                applicant.ContactInformation,
                applicant.Appliedfor,
                ApplicationsSubmittedDate = applicant.CreatedAt
            };

            var ApplicantJson = new
            {
                displayJson = displayJson,
                totalApplicant = totalApplicant


            };

            return Ok(ApplicantJson);
        }


        // ==================================
        // READ - Get All Applicants
        // ==================================
        [HttpGet]
        public async Task<IActionResult> GetAllApplicants()
        {
            var applicants = await _context.Applicants
                .Include(a => a.Job)
                .OrderByDescending(a => a.CreatedAt)
                .Select(a => new
                {
                    a.Id,
                    a.Name,
                    a.Email,
                    a.Phone,
                    a.ResumeUrl,
                    a.Status,
                    a.Source,
                    a.Notes,
                    JobTitle = a.Job != null ? a.Job.JobTitle : "N/A"
                })
                .ToListAsync();

            return Ok(applicants);
        }

        // ==================================
        // READ - Get Applicant by ID
        // ==================================
        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetApplicantById(Guid id)
        {
            var applicant = await _context.Applicants
                .Include(a => a.Job)
                .Where(a => a.Id == id)
                .Select(a => new
                {
                    a.Id,
                    a.Name,
                    a.Email,
                    a.Phone,
                    a.ResumeUrl,
                    a.Status,
                    a.Source,
                    a.Notes,
                    JobTitle = a.Job != null ? a.Job.JobTitle : "N/A"
                })
                .FirstOrDefaultAsync();

            if (applicant == null)
                return NotFound(new { message = "Applicant not found" });

            return Ok(applicant);
        }

        // ==================================
        // UPDATE - Update Applicant Info
        // ==================================
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateApplicant(Guid id, [FromBody] ApplicantDTO dto)
        {
            var applicant = await _context.Applicants.FindAsync(id);
            if (applicant == null)
                return NotFound(new { message = "Applicant not found" });

            applicant.JobId = dto.JobId ?? applicant.JobId;
            applicant.Name = dto.Name ?? applicant.Name;
            applicant.Email = dto.Email ?? applicant.Email;
            applicant.Phone = dto.Phone ?? applicant.Phone;
            applicant.ResumeUrl = dto.ResumeUrl ?? applicant.ResumeUrl;
            applicant.Source = dto.Source ?? applicant.Source;
            applicant.Notes = dto.Notes ?? applicant.Notes;
            applicant.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return Ok(applicant);
        }

        // ==================================
        // DELETE - Remove Applicant
        // ==================================
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteApplicant(Guid id)
        {
            var applicant = await _context.Applicants.FindAsync(id);
            if (applicant == null)
                return NotFound(new { message = "Applicant not found" });

            _context.Applicants.Remove(applicant);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Applicant deleted successfully" });
        }

        // Display: Fordepartment, ContactInformation, Appliedfor, Applications submitted date
        [HttpGet("display")]
        public async Task<IActionResult> GetApplicantsDisplay()
        {
            var applicants = await _context.Applicants
                .Select(a => new
                {
                    a.Name,
                    a.Fordepartment,
                    a.ContactInformation,
                    a.Appliedfor,
                    ApplicationsSubmittedDate = a.CreatedAt
                })
                .ToListAsync();

            return Ok(applicants);
        }

        // Download resume (get ResumeUrl)
        [HttpGet("{id:guid}/resume")]
        public async Task<IActionResult> GetResumeUrl(Guid id)
        {
            var applicant = await _context.Applicants.FindAsync(id);
            if (applicant == null)
                return NotFound(new { message = "Applicant not found." });

            return Ok(new { ResumeUrl = applicant.ResumeUrl });
        }

        // Total Applicants
        [HttpGet("total")]
        public async Task<IActionResult> GetTotalApplicants()
        {
            var total = await _context.Applicants.CountAsync();
            return Ok(new { TotalApplicants = total });
        }

        // GET: api/applicants/search
        [HttpGet("search")]
        public async Task<IActionResult> GetApplicantsByNameAndPosition(
            [FromQuery] string? name,
            [FromQuery] string? position)
        {
            if (string.IsNullOrWhiteSpace(name) && string.IsNullOrWhiteSpace(position))
                return BadRequest("Provide either a name or a position.");

            var query = _context.Applicants.AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                var nameLower = name.Trim().ToLower();
                query = query.Where(a =>
                    (a.Name ?? "").ToLower().Contains(nameLower));
            }

            if (!string.IsNullOrWhiteSpace(position))
            {
                var posLower = position.Trim().ToLower();
                query = query.Where(a =>
                    !string.IsNullOrEmpty(a.Appliedfor) && a.Appliedfor.ToLower().Contains(posLower));
            }

            var applicants = await query
                .Select(a => new
                {
                    a.Id,
                    a.Fordepartment,
                    a.ContactInformation,
                    a.Appliedfor,
                    ApplicationsSubmittedDate = a.CreatedAt
                })
                .ToListAsync();

            if (!applicants.Any())
                return NotFound("No applicants found for the given criteria.");

            return Ok(applicants);
        }


    }
}
