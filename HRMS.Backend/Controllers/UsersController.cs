using System;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Backend.Data;
using HRMS.Backend.Models;
using HRMS.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IPasswordHasher _hasher;

        public UsersController(AppDbContext db, IPasswordHasher hasher)
        {
            _db = db;
            _hasher = hasher;
        }

        public sealed class CreateUserDto
        {
            public string FullName { get; set; } = string.Empty;
            public string Username { get; set; } = string.Empty;
            public string? Email { get; set; }
            public string? PhoneNumber { get; set; }
            public string Password { get; set; } = string.Empty;
            public string Role { get; set; } = "User";
            public Guid? TenantId { get; set; }
            public Guid? OrganizationId { get; set; }
            public Guid? EmployeeId { get; set; }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUserDto input)
        {
            if (string.IsNullOrWhiteSpace(input.Username)) return BadRequest("Username is required.");
            if (string.IsNullOrWhiteSpace(input.Password)) return BadRequest("Password is required.");

            var normalizedUsername = input.Username.Trim().ToUpperInvariant();
            var normalizedEmail = string.IsNullOrWhiteSpace(input.Email) ? null : input.Email!.Trim().ToUpperInvariant();

            var usernameTaken = await _db.Users.AnyAsync(u => u.NormalizedUsername == normalizedUsername);
            if (usernameTaken) return Conflict("Username already in use.");

            if (normalizedEmail != null)
            {
                var emailTaken = await _db.Users.AnyAsync(u => u.NormalizedEmail == normalizedEmail);
                if (emailTaken) return Conflict("Email already in use.");
            }

            _hasher.Create(input.Password, out var hash, out var salt);

            var user = new User
            {
                Id = Guid.NewGuid(),
                FullName = input.FullName.Trim(),
                Username = input.Username.Trim(),
                NormalizedUsername = normalizedUsername,
                Email = input.Email,
                NormalizedEmail = normalizedEmail,
                PhoneNumber = input.PhoneNumber,
                PasswordHash = hash,
                PasswordSalt = salt,
                Role = input.Role,
                TenantId = input.TenantId,
                OrganizationId = input.OrganizationId,
                EmployeeId = input.EmployeeId,
                SecurityStamp = Guid.NewGuid().ToString("N"),
                CreatedAt = DateTime.UtcNow
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = user.Id }, new { user.Id, user.FullName, user.Username, user.Email });
        }

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == id);
            if (user == null) return NotFound();
            return Ok(new
            {
                user.Id,
                user.FullName,
                user.Username,
                user.Email,
                user.PhoneNumber,
                user.Role,
                user.TenantId,
                user.OrganizationId,
                user.EmployeeId,
                user.IsActive,
                user.LastLoginUtc,
                user.CreatedAt,
                user.UpdatedAt
            });
        }

        // Example where the old error happened – ensure we use LastLoginUtc (not LastLoginAtUtc)
        [HttpPost("{id:guid}/touch-login")]
        public async Task<IActionResult> TouchLogin(Guid id)
        {
            var u = await _db.Users.FindAsync(id);
            if (u == null) return NotFound();
            u.LastLoginUtc = DateTime.UtcNow; // <-- FIXED name
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
