using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    public sealed class EmployeeCreateDto
    {
        // Keys (department nullable per your spec)
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid OrganizationId { get; set; }
        public Guid? DepartmentId { get; set; }
        [Required] public Guid RoleId { get; set; }

        // Identity & auth
        [Required, MaxLength(100)] public string Username { get; set; } = string.Empty;
        [Required, MinLength(8)] public string Password { get; set; } = string.Empty;

        // Personal
        [Required, MaxLength(100)] public string FirstName { get; set; } = string.Empty;
        [Required, MaxLength(100)] public string LastName { get; set; } = string.Empty;
        [Required] public DateTime DateOfBirth { get; set; }
        [Required, MaxLength(50)] public string Gender { get; set; } = string.Empty;
        [Required, MaxLength(100)] public string Nationality { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string MaritalStatus { get; set; } = string.Empty;

        // Contact
        [Required, EmailAddress, MaxLength(255)] public string Email { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string PhoneNumber { get; set; } = string.Empty;
        [Required, MaxLength(500)] public string Address { get; set; } = string.Empty;
        [Required, MaxLength(200)] public string EmergencyContactName { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string EmergencyContactNumber { get; set; } = string.Empty;

        // Job
        [Required, MaxLength(150)] public string JobTitle { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string EmploymentType { get; set; } = string.Empty;
        [Required, MaxLength(100)] public string EmployeeEducationStatus { get; set; } = string.Empty;
        [Required, Url, MaxLength(2083)] public string PhotoUrl { get; set; } = string.Empty;
        [Required] public DateTime HireDate { get; set; }

        // Codes (employeeCode optional → auto-generate if null/empty)
        [MaxLength(50)] public string? EmployeeCode { get; set; }

        // Financial / misc (nullable per your latest asks)
        [Required] public string BankDetails { get; set; } = "{}";
        [Required] public string CustomFields { get; set; } = "{}";
        public string? BenefitsEnrollment { get; set; }
        public string? ShiftDetails { get; set; }
    }
    public sealed class EmployeeUpdateDto
    {
        [Required] public Guid EmployeeId { get; set; }
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid OrganizationId { get; set; }
        public Guid? DepartmentId { get; set; }
        [Required] public Guid RoleId { get; set; }

        // You can keep Username required on update too (or make optional as you prefer)
        [Required, MaxLength(100)] public string Username { get; set; } = string.Empty;
        // Optional: only send when changing password
        public string? Password { get; set; }

        [Required, MaxLength(100)] public string FirstName { get; set; } = string.Empty;
        [Required, MaxLength(100)] public string LastName { get; set; } = string.Empty;
        [Required] public DateTime DateOfBirth { get; set; }
        [Required, MaxLength(50)] public string Gender { get; set; } = string.Empty;
        [Required, MaxLength(100)] public string Nationality { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string MaritalStatus { get; set; } = string.Empty;

        [Required, EmailAddress, MaxLength(255)] public string Email { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string PhoneNumber { get; set; } = string.Empty;
        [Required, MaxLength(500)] public string Address { get; set; } = string.Empty;
        [Required, MaxLength(200)] public string EmergencyContactName { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string EmergencyContactNumber { get; set; } = string.Empty;

        [Required, MaxLength(150)] public string JobTitle { get; set; } = string.Empty;
        [Required, MaxLength(50)] public string EmploymentType { get; set; } = string.Empty;
        [Required, MaxLength(100)] public string EmployeeEducationStatus { get; set; } = string.Empty;
        [Required, Url, MaxLength(2083)] public string PhotoUrl { get; set; } = string.Empty;
        [Required] public DateTime HireDate { get; set; }

        [MaxLength(50)] public string? EmployeeCode { get; set; }

        [Required] public string BankDetails { get; set; } = "{}";
        [Required] public string CustomFields { get; set; } = "{}";
        public string? BenefitsEnrollment { get; set; }
        public string? ShiftDetails { get; set; }
    }

    public class EmployeeListDto
    {
        public Guid EmployeeID { get; set; }
        public Guid TenantId { get; set; }
        public Guid OrganizationId { get; set; }
        public Guid? DepartmentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string EmployeeCode { get; set; }
        public string JobTitle { get; set; }
    }

    public class EmployeeDetailDto
    {
        public Guid EmployeeID { get; set; }
        public Guid TenantId { get; set; }
        public Guid OrganizationId { get; set; }
        public Guid? DepartmentId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string EmployeeCode { get; set; }
        public string JobTitle { get; set; }
    }
}
