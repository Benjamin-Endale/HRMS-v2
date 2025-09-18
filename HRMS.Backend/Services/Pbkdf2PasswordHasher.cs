using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace HRMS.Backend.Services
{
	public class Pbkdf2PasswordHasher : IPasswordHasher
	{
		// Reasonable defaults; tweak as you like
		private const int SaltSize = 16;        // 128-bit
		private const int KeySize = 32;        // 256-bit
		private const int Iterations = 100_000; // PBKDF2 rounds

		public void Create(string password, out byte[] hash, out byte[] salt)
		{
			if (password is null) throw new ArgumentNullException(nameof(password));

			salt = RandomNumberGenerator.GetBytes(SaltSize);
			hash = KeyDerivation.Pbkdf2(
				password: password,
				salt: salt,
				prf: KeyDerivationPrf.HMACSHA256,
				iterationCount: Iterations,
				numBytesRequested: KeySize
			);
		}

		public bool Verify(string password, byte[] storedHash, byte[] storedSalt)
		{
			if (password is null) return false;
			if (storedHash is null || storedHash.Length != KeySize) return false;
			if (storedSalt is null || storedSalt.Length != SaltSize) return false;

			var computed = KeyDerivation.Pbkdf2(
				password: password,
				salt: storedSalt,
				prf: KeyDerivationPrf.HMACSHA256,
				iterationCount: Iterations,
				numBytesRequested: KeySize
			);

			// constant-time compare
			return CryptographicOperations.FixedTimeEquals(computed, storedHash);
		}
	}
}
