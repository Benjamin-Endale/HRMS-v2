using System;
using System.Threading.Tasks;
using HRMS.Backend.Models;

namespace HRMS.Backend.Services
{
    public interface IJwtTokenService
    {
        Task<(string Jwt, DateTimeOffset ExpiresAt, string Jti)> CreateAccessTokenAsync(User user);
        (string RefreshToken, DateTimeOffset ExpiresAt) CreateRefreshToken();
    }
}
