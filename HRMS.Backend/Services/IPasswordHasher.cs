using System;

namespace HRMS.Backend.Services
{
	public interface IPasswordHasher
	{
		void Create(string password, out byte[] hash, out byte[] salt);
		bool Verify(string password, byte[] storedHash, byte[] storedSalt);
	}
}
