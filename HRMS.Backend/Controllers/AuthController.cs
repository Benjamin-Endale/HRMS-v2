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
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IPasswordHasher _hasher;
        private readonly IJwtTokenService _jwt;

        public AuthController(AppDbContext db, IPasswordHasher hasher, IJwtTokenService jwt)
        {
            _db = db;
            _hasher = hasher;
            _jwt = jwt;
        }

        public record LoginRequest(string UsernameOrEmail, string Password);
        public record LoginResponse(string accessToken, DateTimeOffset expiresAt, string refreshToken, DateTimeOffset refreshExpiresAt);

        [HttpPost("login")]
        public async Task<ActionResult<LoginResponse>> Login([FromBody] LoginRequest input)
        {
            if (string.IsNullOrWhiteSpace(input.UsernameOrEmail) || string.IsNullOrWhiteSpace(input.Password))
                return BadRequest("Username/Email and Password are required.");

            var norm = input.UsernameOrEmail.Trim().ToUpperInvariant();

            var user = await _db.Users
                .FirstOrDefaultAsync(u =>
                    u.NormalizedUsername == norm ||
                    (u.NormalizedEmail != null && u.NormalizedEmail == norm));

            if (user == null || !user.IsActive)
                return Unauthorized("Invalid credentials.");

            // Verify password (byte[] hash/salt)
            var ok = _hasher.Verify(input.Password, user.PasswordHash, user.PasswordSalt);
            if (!ok)
            {
                user.AccessFailedCount += 1;
                await _db.SaveChangesAsync();
                return Unauthorized("Invalid credentials.");
            }

            user.AccessFailedCount = 0;
            user.LastLoginUtc = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            var (jwt, exp, _) = await _jwt.CreateAccessTokenAsync(user);
            var (rt, rtExp) = _jwt.CreateRefreshToken();

            // If you store refresh tokens, persist rt + rtExp here

            return Ok(new LoginResponse(jwt, exp, rt, rtExp));
        }
    }
}
