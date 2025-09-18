using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Backend.Data;
using HRMS.Backend.DTOs;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/training")]
    [Produces("application/json")]
    public class TrainingController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TrainingController(AppDbContext db) => _db = db;

        // ======== PROGRAMS ========

        // GET: /api/training/programs
        [HttpGet("programs")]
        public async Task<ActionResult<IEnumerable<TrainingListItemDto>>> GetPrograms()
        {
            var items = await _db.Trainings
                .AsNoTracking()
                .Select(p => new TrainingListItemDto(
                    p.Id,
                    p.Title,
                    p.Category,
                    p.Level,
                    p.DurationHours,
                    p.InstructorName,
                    p.Enrollments.Count(),
                    p.Enrollments.Any()
                        ? p.Enrollments.Count(e => e.CompletedOnUtc != null) * 100.0 / p.Enrollments.Count()
                        : 0.0
                ))
                .ToListAsync();

            return Ok(items);
        }

        // GET: /api/training/programs/{id}
        [HttpGet("programs/{id:guid}")]
        public async Task<ActionResult<TrainingProgramDto>> GetProgramById(Guid id)
        {
            var p = await _db.Trainings.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (p == null) return NotFound();

            return Ok(new TrainingProgramDto(
                p.Id, p.TenantId, p.OrganizationId, p.Title, p.Category, p.Level,
                p.DurationHours, p.InstructorName, p.MaxEnrollment,
                p.StartDateUtc, p.EndDateUtc, p.Description
            ));
        }

        // POST: /api/training/programs
        [HttpPost("programs")]
        public async Task<ActionResult<TrainingProgramDto>> CreateProgram([FromBody] CreateTrainingProgramDto input)
        {
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            // Validate tenant/org
            var org = await _db.Organizations.AsNoTracking().FirstOrDefaultAsync(o => o.Id == input.OrganizationId);
            if (org == null || org.TenantId != input.TenantId)
                return BadRequest("Invalid tenant/organization combination.");

            var p = new Training
            {
                Id = Guid.NewGuid(),
                TenantId = input.TenantId,
                OrganizationId = input.OrganizationId,
                Title = input.Title.Trim(),
                Category = input.Category.Trim(),
                Level = input.Level,
                DurationHours = input.DurationHours,
                InstructorName = input.InstructorName.Trim(),
                MaxEnrollment = input.MaxEnrollment,
                StartDateUtc = input.StartDateUtc,
                EndDateUtc = input.EndDateUtc,
                Description = string.IsNullOrWhiteSpace(input.Description) ? null : input.Description!.Trim()
            };

            _db.Trainings.Add(p);
            await _db.SaveChangesAsync();

            var dto = new TrainingProgramDto(
                p.Id, p.TenantId, p.OrganizationId, p.Title, p.Category, p.Level,
                p.DurationHours, p.InstructorName, p.MaxEnrollment,
                p.StartDateUtc, p.EndDateUtc, p.Description
            );

            return CreatedAtAction(nameof(GetProgramById), new { id = p.Id }, dto);
        }

        // PUT: /api/training/programs/{id}
        [HttpPut("programs/{id:guid}")]
        public async Task<IActionResult> UpdateProgram(Guid id, [FromBody] UpdateTrainingProgramDto input)
        {
            if (id != input.Id) return BadRequest("Program ID mismatch.");
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var p = await _db.Trainings.FirstOrDefaultAsync(x => x.Id == id);
            if (p == null) return NotFound();

            // Validate tenant/org swap
            var org = await _db.Organizations.AsNoTracking().FirstOrDefaultAsync(o => o.Id == input.OrganizationId);
            if (org == null || org.TenantId != input.TenantId)
                return BadRequest("Invalid tenant/organization combination.");

            p.TenantId = input.TenantId;
            p.OrganizationId = input.OrganizationId;
            p.Title = input.Title.Trim();
            p.Category = input.Category.Trim();
            p.Level = input.Level;
            p.DurationHours = input.DurationHours;
            p.InstructorName = input.InstructorName.Trim();
            p.MaxEnrollment = input.MaxEnrollment;
            p.StartDateUtc = input.StartDateUtc;
            p.EndDateUtc = input.EndDateUtc;
            p.Description = string.IsNullOrWhiteSpace(input.Description) ? null : input.Description!.Trim();

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: /api/training/programs/{id}
        [HttpDelete("programs/{id:guid}")]
        public async Task<IActionResult> DeleteProgram(Guid id)
        {
            var p = await _db.Trainings
                .Include(x => x.Sessions)
                .Include(x => x.Materials)
                .Include(x => x.Enrollments)
                .Include(x => x.Feedback)
                .FirstOrDefaultAsync(x => x.Id == id);
            if (p == null) return NotFound();

            _db.Trainings.Remove(p);    // cascades for Sessions/Materials/Enrollments/Feedback (configured below)
            await _db.SaveChangesAsync();
            return NoContent();
        }

        // ======== SESSIONS ========

        // GET: /api/training/programs/{programId}/sessions
        [HttpGet("programs/{programId:guid}/sessions")]
        public async Task<ActionResult<IEnumerable<TrainingSessionDto>>> GetSessions(Guid programId)
        {
            var exists = await _db.Trainings.AnyAsync(p => p.Id == programId);
            if (!exists) return NotFound("Program not found.");

            var sessions = await _db.TrainingSessions
                .AsNoTracking()
                .Where(s => s.ProgramId == programId)
                .OrderBy(s => s.StartsAtUtc)
                .Select(s => new TrainingSessionDto(
                    s.Id, s.ProgramId, s.StartsAtUtc, s.EndsAtUtc, s.Location, s.IsOnline, s.MeetingLink, s.Notes
                )).ToListAsync();

            return Ok(sessions);
        }

        // POST: /api/training/programs/{programId}/sessions
        [HttpPost("programs/{programId:guid}/sessions")]
        public async Task<ActionResult<TrainingSessionDto>> CreateSession(Guid programId, [FromBody] CreateTrainingSessionDto input)
        {
            if (programId != input.ProgramId) return BadRequest("Program ID mismatch.");
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var prog = await _db.Trainings.AsNoTracking().FirstOrDefaultAsync(p => p.Id == input.ProgramId);
            if (prog == null) return NotFound("Program not found.");

            if (input.EndsAtUtc <= input.StartsAtUtc)
                return BadRequest("EndsAtUtc must be after StartsAtUtc.");

            var s = new TrainingSession
            {
                Id = Guid.NewGuid(),
                ProgramId = input.ProgramId,
                StartsAtUtc = input.StartsAtUtc,
                EndsAtUtc = input.EndsAtUtc,
                Location = string.IsNullOrWhiteSpace(input.Location) ? null : input.Location!.Trim(),
                IsOnline = input.IsOnline,
                MeetingLink = string.IsNullOrWhiteSpace(input.MeetingLink) ? null : input.MeetingLink!.Trim(),
                Notes = string.IsNullOrWhiteSpace(input.Notes) ? null : input.Notes!.Trim()
            };

            _db.TrainingSessions.Add(s);
            await _db.SaveChangesAsync();

            var dto = new TrainingSessionDto(s.Id, s.ProgramId, s.StartsAtUtc, s.EndsAtUtc, s.Location, s.IsOnline, s.MeetingLink, s.Notes);
            return CreatedAtAction(nameof(GetSessions), new { programId = s.ProgramId }, dto);
        }

        // PUT: /api/training/sessions/{sessionId}
        [HttpPut("sessions/{sessionId:guid}")]
        public async Task<IActionResult> UpdateSession(Guid sessionId, [FromBody] CreateTrainingSessionDto input)
        {
            var s = await _db.TrainingSessions.FirstOrDefaultAsync(x => x.Id == sessionId);
            if (s == null) return NotFound();

            if (s.ProgramId != input.ProgramId) return BadRequest("Program ID mismatch.");
            if (!ModelState.IsValid) return ValidationProblem(ModelState);
            if (input.EndsAtUtc <= input.StartsAtUtc) return BadRequest("EndsAtUtc must be after StartsAtUtc.");

            s.StartsAtUtc = input.StartsAtUtc;
            s.EndsAtUtc = input.EndsAtUtc;
            s.Location = string.IsNullOrWhiteSpace(input.Location) ? null : input.Location!.Trim();
            s.IsOnline = input.IsOnline;
            s.MeetingLink = string.IsNullOrWhiteSpace(input.MeetingLink) ? null : input.MeetingLink!.Trim();
            s.Notes = string.IsNullOrWhiteSpace(input.Notes) ? null : input.Notes!.Trim();

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: /api/training/sessions/{sessionId}
        [HttpDelete("sessions/{sessionId:guid}")]
        public async Task<IActionResult> DeleteSession(Guid sessionId)
        {
            var s = await _db.TrainingSessions.FirstOrDefaultAsync(x => x.Id == sessionId);
            if (s == null) return NotFound();
            _db.TrainingSessions.Remove(s);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        // ======== MATERIALS ========

        // GET: /api/training/programs/{programId}/materials
        [HttpGet("programs/{programId:guid}/materials")]
        public async Task<ActionResult<IEnumerable<TrainingMaterialDto>>> GetMaterials(Guid programId)
        {
            var exists = await _db.Trainings.AnyAsync(p => p.Id == programId);
            if (!exists) return NotFound("Program not found.");

            var mats = await _db.TrainingMaterials
                .AsNoTracking()
                .Where(m => m.ProgramId == programId)
                .OrderByDescending(m => m.UploadedAtUtc)
                .Select(m => new TrainingMaterialDto(m.Id, m.ProgramId, m.Title, m.Url, m.FilePath, m.UploadedAtUtc))
                .ToListAsync();

            return Ok(mats);
        }

        // POST: /api/training/programs/{programId}/materials
        [HttpPost("programs/{programId:guid}/materials")]
        public async Task<ActionResult<TrainingMaterialDto>> CreateMaterial(Guid programId, [FromBody] CreateTrainingMaterialDto input)
        {
            if (programId != input.ProgramId) return BadRequest("Program ID mismatch.");
            if (!ModelState.IsValid) return ValidationProblem(ModelState);

            var prog = await _db.Trainings.AsNoTracking().FirstOrDefaultAsync(p => p.Id == input.ProgramId);
            if (prog == null) return NotFound("Program not found.");

            var m = new TrainingMaterial
            {
                Id = Guid.NewGuid(),
                ProgramId = input.ProgramId,
                Title = input.Title.Trim(),
                Url = string.IsNullOrWhiteSpace(input.Url) ? null : input.Url!.Trim(),
                FilePath = string.IsNullOrWhiteSpace(input.FilePath) ? null : input.FilePath!.Trim(),
                UploadedAtUtc = DateTime.UtcNow
            };

            _db.TrainingMaterials.Add(m);
            await _db.SaveChangesAsync();

            var dto = new TrainingMaterialDto(m.Id, m.ProgramId, m.Title, m.Url, m.FilePath, m.UploadedAtUtc);
            return CreatedAtAction(nameof(GetMaterials), new { programId = m.ProgramId }, dto);
        }

        // DELETE: /api/training/materials/{materialId}
        [HttpDelete("materials/{materialId:guid}")]
        public async Task<IActionResult> DeleteMaterial(Guid materialId)
        {
            var m = await _db.TrainingMaterials.FirstOrDefaultAsync(x => x.Id == materialId);
            if (m == null) return NotFound();
            _db.TrainingMaterials.Remove(m);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        // ======== ENROLLMENTS ========

        public class EnrollEmployeeRequest
        {
            public Guid ProgramId { get; set; }
            public Guid TenantId { get; set; }
            public Guid EmployeeId { get; set; }
            public int? InitialProgressPercent { get; set; } // optional
        }

        // POST: /api/training/enroll
        [HttpPost("enroll")]
        public async Task<ActionResult<TrainingEnrollmentDto>> Enroll([FromBody] EnrollEmployeeRequest input)
        {
            if (input.ProgramId == Guid.Empty || input.EmployeeId == Guid.Empty || input.TenantId == Guid.Empty)
                return BadRequest("ProgramId, TenantId and EmployeeId are required.");

            var p = await _db.Trainings.AsNoTracking().FirstOrDefaultAsync(x => x.Id == input.ProgramId);
            if (p == null) return NotFound("Program not found.");

            var emp = await _db.Employees.AsNoTracking().FirstOrDefaultAsync(e => e.EmployeeID == input.EmployeeId);
            if (emp == null) return NotFound("Employee not found.");

            if (emp.TenantId != input.TenantId || p.TenantId != input.TenantId)
                return BadRequest("Employee and Program must belong to the same tenant.");
            if (emp.OrganizationId != p.OrganizationId)
                return BadRequest("Employee must be in the same organization as the program.");

            // Capacity check
            if (p.MaxEnrollment.HasValue)
            {
                var current = await _db.TrainingEnrollments.CountAsync(e => e.ProgramId == p.Id);
                if (current >= p.MaxEnrollment.Value)
                    return Conflict(new { message = "Max enrollment reached for this program." });
            }

            // Unique-enrollment check
            var exists = await _db.TrainingEnrollments.AnyAsync(e =>
                e.ProgramId == p.Id && e.EmployeeId == emp.EmployeeID && e.TenantId == input.TenantId);
            if (exists) return Conflict(new { message = "Employee is already enrolled in this program." });

            var en = new TrainingEnrollment
            {
                Id = Guid.NewGuid(),
                ProgramId = p.Id,
                TenantId = input.TenantId,
                EmployeeId = emp.EmployeeID,
                EnrolledOnUtc = DateTime.UtcNow,
                ProgressPercent = Math.Clamp(input.InitialProgressPercent ?? 0, 0, 100)
            };

            _db.TrainingEnrollments.Add(en);
            await _db.SaveChangesAsync();

            var dto = new TrainingEnrollmentDto(en.Id, en.ProgramId, en.EmployeeId, en.EnrolledOnUtc, en.ProgressPercent, en.CompletedOnUtc);
            return CreatedAtAction(nameof(GetEnrollments), new { programId = en.ProgramId, tenantId = en.TenantId }, dto);
        }

        // GET: /api/training/enrollments?programId=&tenantId=
        [HttpGet("enrollments")]
        public async Task<ActionResult<IEnumerable<TrainingEnrollmentDto>>> GetEnrollments([FromQuery] Guid? programId, [FromQuery] Guid? tenantId)
        {
            var q = _db.TrainingEnrollments.AsNoTracking().AsQueryable();
            if (programId.HasValue) q = q.Where(e => e.ProgramId == programId.Value);
            if (tenantId.HasValue) q = q.Where(e => e.TenantId == tenantId.Value);

            var list = await q.Select(en => new TrainingEnrollmentDto(
                en.Id, en.ProgramId, en.EmployeeId, en.EnrolledOnUtc, en.ProgressPercent, en.CompletedOnUtc
            )).ToListAsync();

            return Ok(list);
        }

        public class UpdateEnrollmentRequest
        {
            public int? ProgressPercent { get; set; }        // 0..100
            public bool? MarkCompleted { get; set; }         // optional
        }

        // PATCH: /api/training/enrollments/{id}
        [HttpPatch("enrollments/{id:guid}")]
        public async Task<IActionResult> UpdateEnrollment(Guid id, [FromBody] UpdateEnrollmentRequest input)
        {
            var en = await _db.TrainingEnrollments.FirstOrDefaultAsync(x => x.Id == id);
            if (en == null) return NotFound();

            if (input.ProgressPercent.HasValue)
                en.ProgressPercent = Math.Clamp(input.ProgressPercent.Value, 0, 100);

            if (input.MarkCompleted == true && en.CompletedOnUtc == null)
                en.CompletedOnUtc = DateTime.UtcNow;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: /api/training/enrollments/{id}
        [HttpDelete("enrollments/{id:guid}")]
        public async Task<IActionResult> DeleteEnrollment(Guid id)
        {
            var en = await _db.TrainingEnrollments.FirstOrDefaultAsync(x => x.Id == id);
            if (en == null) return NotFound();
            _db.TrainingEnrollments.Remove(en);
            await _db.SaveChangesAsync();
            return NoContent();
        }

        // ======== FEEDBACK ========

        public class SubmitTrainingFeedbackRequest
        {
            public Guid ProgramId { get; set; }
            public Guid TenantId { get; set; }
            public Guid EmployeeId { get; set; }
            public int Rating { get; set; } = 5; // 1..5
            public string? Comment { get; set; }
        }

        // POST: /api/training/feedback
        [HttpPost("feedback")]
        public async Task<ActionResult> SubmitFeedback([FromBody] SubmitTrainingFeedbackRequest input)
        {
            if (input.ProgramId == Guid.Empty || input.TenantId == Guid.Empty || input.EmployeeId == Guid.Empty)
                return BadRequest("ProgramId, TenantId and EmployeeId are required.");
            if (input.Rating < 1 || input.Rating > 5)
                return BadRequest("Rating must be between 1 and 5.");

            var p = await _db.Trainings.AsNoTracking().FirstOrDefaultAsync(x => x.Id == input.ProgramId);
            var emp = await _db.Employees.AsNoTracking().FirstOrDefaultAsync(x => x.EmployeeID == input.EmployeeId);
            if (p == null || emp == null) return NotFound("Program or employee not found.");
            if (p.TenantId != input.TenantId || emp.TenantId != input.TenantId)
                return BadRequest("Tenant mismatch.");

            // One feedback per employee per program (enforced in model too)
            var exists = await _db.TrainingFeedbacks.AnyAsync(f =>
                f.ProgramId == input.ProgramId && f.EmployeeId == input.EmployeeId && f.TenantId == input.TenantId);
            if (exists) return Conflict(new { message = "Feedback already submitted for this program." });

            var fb = new TrainingFeedback
            {
                Id = Guid.NewGuid(),
                ProgramId = input.ProgramId,
                TenantId = input.TenantId,
                EmployeeId = input.EmployeeId,
                Rating = input.Rating,
                Comment = string.IsNullOrWhiteSpace(input.Comment) ? null : input.Comment!.Trim(),
                SubmittedOnUtc = DateTime.UtcNow
            };

            _db.TrainingFeedbacks.Add(fb);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFeedback), new { programId = input.ProgramId, tenantId = input.TenantId }, null);
        }

        // GET: /api/training/feedback?programId=&tenantId=
        [HttpGet("feedback")]
        public async Task<ActionResult<IEnumerable<object>>> GetFeedback([FromQuery] Guid? programId, [FromQuery] Guid? tenantId)
        {
            var q = _db.TrainingFeedbacks
                .Include(f => f.Employee)
                .AsNoTracking()
                .AsQueryable();

            if (programId.HasValue) q = q.Where(f => f.ProgramId == programId.Value);
            if (tenantId.HasValue) q = q.Where(f => f.TenantId == tenantId.Value);

            var list = await q
                .OrderByDescending(f => f.SubmittedOnUtc)
                .Select(f => new
                {
                    f.Id,
                    f.ProgramId,
                    f.EmployeeId,
                    EmployeeName = (f.Employee.FirstName + " " + f.Employee.LastName).Trim(),
                    f.Rating,
                    f.Comment,
                    f.SubmittedOnUtc
                })
                .ToListAsync();

            return Ok(list);
        }

        // ======== DASHBOARD (Overview) ========

        // GET: /api/training/overview/upcoming?daysAhead=7
        [HttpGet("overview/upcoming")]
        public async Task<ActionResult<IEnumerable<object>>> GetUpcoming([FromQuery] int daysAhead = 7)
        {
            var now = DateTime.UtcNow;
            var until = now.AddDays(Math.Max(1, daysAhead));

            var sessions = await _db.TrainingSessions
                .Include(s => s.Program)
                .AsNoTracking()
                .Where(s => s.StartsAtUtc >= now && s.StartsAtUtc <= until)
                .OrderBy(s => s.StartsAtUtc)
                .Select(s => new
                {
                    s.Id,
                    s.ProgramId,
                    ProgramTitle = s.Program.Title,
                    s.StartsAtUtc,
                    s.EndsAtUtc,
                    s.Location,
                    s.IsOnline
                }).ToListAsync();

            return Ok(sessions);
        }

        // GET: /api/training/overview/popular?top=5
        [HttpGet("overview/popular")]
        public async Task<ActionResult<IEnumerable<object>>> GetPopular([FromQuery] int top = 5)
        {
            top = Math.Clamp(top, 1, 20);
            var result = await _db.Trainings
                .AsNoTracking()
                .OrderByDescending(p => p.Enrollments.Count())
                .Take(top)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Category,
                    p.Level,
                    EnrollmentCount = p.Enrollments.Count(),
                    CompletionRate = p.Enrollments.Any()
                        ? p.Enrollments.Count(e => e.CompletedOnUtc != null) * 100.0 / p.Enrollments.Count()
                        : 0.0
                })
                .ToListAsync();

            return Ok(result);
        }
    }
}
