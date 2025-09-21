using System;
using System.Linq;
using System.Threading.Tasks;
using HRMS.Backend.Data;
using HRMS.Backend.Models;
using HRMS.Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HRMS.Backend.DTOs;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly IPasswordHasher _hasher;
        private readonly IJwtTokenService _jwt;
        private readonly EmailService _email;

        public AuthController(AppDbContext db, IPasswordHasher hasher, IJwtTokenService jwt, EmailService email)
        {
            _db = db;
            _hasher = hasher;
            _jwt = jwt;
            _email = email;
        }

        public record LoginRequest(string UsernameOrEmail, string Password);
        public record OtpVerifyRequest(string UsernameOrEmail, string OtpCode);
        public record LoginResponse(string accessToken, DateTimeOffset expiresAt, string refreshToken, DateTimeOffset refreshExpiresAt, string role);

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest input)
        {

            if (string.IsNullOrWhiteSpace(input.UsernameOrEmail))
                return BadRequest("Email or Username is required.");

            var inputTrimmed = input.UsernameOrEmail.Trim();
            User? user;

            // Check if input is an email
            if (inputTrimmed.Contains("@"))
            {
                var emailNorm = inputTrimmed.ToUpperInvariant();
                user = await _db.Users.FirstOrDefaultAsync(u => u.NormalizedEmail == emailNorm);
            }
            else
            {
                // Input is username, get user by normalized username
                var usernameNorm = inputTrimmed.ToUpperInvariant();
                user = await _db.Users.FirstOrDefaultAsync(u => u.NormalizedUsername == usernameNorm);
            }

            if (user == null || !user.IsActive) return Unauthorized("Invalid credentials.");
            if (!_hasher.Verify(input.Password, user.PasswordHash, user.PasswordSalt))
            {
                user.AccessFailedCount++;
                await _db.SaveChangesAsync();
                return Unauthorized("Invalid credentials.");
            }

            // Generate OTP
            var otp = new Random().Next(100000, 999999).ToString();
            user.OtpCode = otp;
            user.OtpExpiryUtc = DateTime.UtcNow.AddMinutes(5);
            await _db.SaveChangesAsync();

            if (string.IsNullOrWhiteSpace(user.Email))
                return BadRequest("User does not have a valid email.");

            await _email.SendOtpAsync(user.Email, otp);


            return Ok(new 
            { message = "OTP sent to your email.",
              user.Email
            });
        }

        [HttpPost("verify-otp")]
        public async Task<ActionResult<LoginResponse>> VerifyOtp([FromBody] OtpVerifyRequest input)
        {
            var norm = input.UsernameOrEmail.Trim().ToUpperInvariant();
            var user = await _db.Users.FirstOrDefaultAsync(u =>
                u.NormalizedUsername == norm || u.NormalizedEmail == norm);

            if (user == null || !user.IsActive) return Unauthorized("Invalid credentials.");
            if (user.OtpCode == null || user.OtpExpiryUtc < DateTime.UtcNow)
                return Unauthorized("OTP expired.");

            if (user.OtpCode != input.OtpCode) return Unauthorized("Invalid OTP.");

            // Reset OTP
            user.OtpCode = null;
            user.OtpExpiryUtc = null;
            user.LastLoginUtc = DateTime.UtcNow;
            await _db.SaveChangesAsync();

            var (jwt, exp, _) = await _jwt.CreateAccessTokenAsync(user);
            var (rt, rtExp) = _jwt.CreateRefreshToken();

            return Ok(new LoginResponse(jwt, exp, rt, rtExp, user.Role));
        }



        [HttpPost("email-login")]
        public async Task<IActionResult> LoginByEmail([FromBody] EmailLoginRequest input)
        {
            if (string.IsNullOrWhiteSpace(input.Email))
                return BadRequest("Email is required.");

            var emailNorm = input.Email.Trim().ToUpperInvariant();

            // only look up user by email in Users table
            var user = await _db.Users.FirstOrDefaultAsync(u => u.NormalizedEmail == emailNorm);

            if (user == null || !user.IsActive)
                return Unauthorized("Invalid credentials or email not registered.");

            // Email must exist in user record
            if (string.IsNullOrWhiteSpace(user.Email))
                return BadRequest("No valid email found for this user.");

            //  No password check here to passwordless login
            var (jwt, exp, _) = await _jwt.CreateAccessTokenAsync(user);
            var (rt, rtExp) = _jwt.CreateRefreshToken();

            return Ok(new LoginResponse(jwt, exp, rt, rtExp, user.Role));
        }


    }

}
