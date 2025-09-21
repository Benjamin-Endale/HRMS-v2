using HRMS.Backend.Data;
using HRMS.Backend.Models;
using HRMS.Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : ControllerBase
    {
        private readonly AppDbContext _context;

        public JobController(AppDbContext context)
        {
            _context = context;
        }

        // CREATE Job
        [HttpPost]
        public async Task<IActionResult> CreateJob([FromBody] JobDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var job = new Job
            {
                Id = Guid.NewGuid(), // Generate new GUID
                JobTitle = dto.JobTitle,
                DepartmentID = dto.DepartmentID,
                TenantID = dto.TenantID,
                Location = dto.Location,
                JobType = dto.JobType,
                SalaryRange = dto.SalaryRange,
                ApplicationDeadline = dto.ApplicationDeadline,
                JobDescription = dto.JobDescription,
                Requirement = dto.Requirement,
                ClosingDate = dto.ClosingDate
            };


            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            //  Get updated active jobs count after posting
            var today = DateTime.UtcNow.Date;
            var activeJobsCount = await _context.Jobs
                .Where(j => j.ClosingDate.HasValue && j.ClosingDate >= today)
                .CountAsync();

            // Return the same JSON as GetActiveJobs
            var jobJson = new
            {
                JobTitle = job.JobTitle,
                Department = job.DepartmentID,
                Location = job.Location,
                ApplicationDeadline = job.ApplicationDeadline

                
            };

            var jobsjoson = new
            {
                jobJson = jobJson,
                Jobs = job,

                ActiveJobsCount = activeJobsCount

            };

            return Ok(jobsjoson);
        }

        // READ All Jobs
        [HttpGet]
        public async Task<IActionResult> GetJobs()
        {
            var jobs = await _context.Jobs.ToListAsync();
            return Ok(jobs);
        }

        // READ Job by ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetJobById(Guid id)
        {
            var job = await _context.Jobs.FindAsync(id);
            if (job == null) return NotFound();
            return Ok(job);
        }

        // UPDATE Job
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateJob(Guid id, [FromBody] JobDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var job = await _context.Jobs.FindAsync(id);
            if (job == null) return NotFound();

            job.JobTitle = dto.JobTitle;
            job.DepartmentID = dto.DepartmentID;
            job.TenantID = dto.TenantID;
            job.Location = dto.Location;
            job.JobType = dto.JobType;
            job.SalaryRange = dto.SalaryRange;
            job.ApplicationDeadline = dto.ApplicationDeadline;
            job.JobDescription = dto.JobDescription;
            job.Requirement = dto.Requirement;
            job.ClosingDate = dto.ClosingDate;



            await _context.SaveChangesAsync();

            //  Get updated active jobs count after posting
            var today = DateTime.UtcNow.Date;
            var activeJobsCount = await _context.Jobs
                .Where(j => j.ClosingDate.HasValue && j.ClosingDate >= today)
                .CountAsync();

            var jobJsonadmin = new
            {
                JobTitle = job.JobTitle,
                Department = job.DepartmentID,
                Location = job.Location,
                ApplicationDeadline = job.ApplicationDeadline


            };

            var jobsjoson = new
            {
                jobJsonadmin = jobJsonadmin,
                Jobs = job,

                ActiveJobsCount = activeJobsCount

            };

            return Ok(jobsjoson);
        }

        // DELETE Job
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            var job = await _context.Jobs.FindAsync(id);
            if (job == null) return NotFound();

            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Job deleted successfully" });
        }

        // GET: api/job/active
        [HttpGet("active")]
        public async Task<IActionResult> GetActiveJobs()
        {
            var today = DateTime.UtcNow.Date;

            var activeJobs = await _context.Jobs
                .Where(j => j.ClosingDate.HasValue && j.ClosingDate >= today)
                .OrderBy(j => j.ClosingDate)
                .Select(j => new
                {
                    JobTitle = j.JobTitle,
                    Department = j.DepartmentID,
                    Location = j.Location,
                    ApplicationDeadline = j.ApplicationDeadline
                })
                .ToListAsync();

            if (activeJobs.Count == 0)
                return NotFound(new { message = "No active jobs available." });

            return Ok(activeJobs);
        }

        // GET: api/job/active/count
        [HttpGet("active/count")]
        public async Task<IActionResult> GetActiveJobsCount()
        {
            var today = DateTime.UtcNow.Date;

            var activeJobsCount = await _context.Jobs
                .CountAsync(j => j.ClosingDate.HasValue && j.ClosingDate >= today);

            return Ok(new { activeJobs = activeJobsCount });
        }




    }
}
