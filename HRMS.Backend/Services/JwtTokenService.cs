using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using HRMS.Backend.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace HRMS.Backend.Services
{
    public class JwtTokenService : IJwtTokenService
    {
        private readonly IConfiguration _config;

        public JwtTokenService(IConfiguration config) => _config = config;

        public Task<(string Jwt, DateTimeOffset ExpiresAt, string Jti)> CreateAccessTokenAsync(User user)
        {
            // Read settings
            var key = _config["JwtSettings:Key"] ?? throw new InvalidOperationException("JwtSettings:Key missing");
            var iss = _config["JwtSettings:Issuer"];
            var aud = _config["JwtSettings:Audience"];
            var mins = int.TryParse(_config["JwtSettings:AccessTokenMinutes"], out var m) ? m : 60;

            var jti = Guid.NewGuid().ToString("N");
            var now = DateTimeOffset.UtcNow;
            var exp = now.AddMinutes(mins);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, jti),
                new Claim(JwtRegisteredClaimNames.Iat, now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),

                // Helpful identity claims
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim("security_stamp", user.SecurityStamp),

                // Optional context claims
                new Claim("tenant_id", user.TenantId?.ToString() ?? string.Empty),
                new Claim("org_id", user.OrganizationId?.ToString() ?? string.Empty),
                new Claim(ClaimTypes.Email, user.Email ?? string.Empty),
                new Claim(ClaimTypes.Role, user.Role ?? "User")
            };

            var credentials = new SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                SecurityAlgorithms.HmacSha256
            );

            var token = new JwtSecurityToken(
                issuer: iss,
                audience: aud,
                claims: claims,
                notBefore: now.UtcDateTime,
                expires: exp.UtcDateTime,
                signingCredentials: credentials
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Task.FromResult((jwt, exp, jti));
        }

        public (string RefreshToken, DateTimeOffset ExpiresAt) CreateRefreshToken()
        {
            var mins = int.TryParse(_config["JwtSettings:RefreshTokenMinutes"], out var m) ? m : 7 * 24 * 60;
            var exp = DateTimeOffset.UtcNow.AddMinutes(mins);

            // 256-bit random token
            var bytes = RandomNumberGenerator.GetBytes(32);
            var token = Convert.ToBase64String(bytes);

            return (token, exp);
        }
    }
}
