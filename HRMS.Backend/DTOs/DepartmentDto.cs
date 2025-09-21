// DTOs/DepartmentDtos.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    public class DepartmentDto
    {
        public Guid Id { get; set; }
        public Guid OrganizationId { get; set; }
        public Guid TenantId { get; set; }
        public string DepartmentName { get; set; } = null!;
        public string? DepartmentCode { get; set; }
        public Guid DepartmentHeadId { get; set; }
        public string DepartmentHeadName { get; set; } = string.Empty; // convenience
        public int InitialEmployeeCount { get; set; }
        public Guid? ParentDepartmentId { get; set; }
    }

    public class CreateDepartmentDto
    {
        [Required] public Guid OrganizationId { get; set; }
        [Required, MaxLength(200)] public string DepartmentName { get; set; } = null!;
        // optional; auto-generated if null/empty
        public string? DepartmentCode { get; set; }

        // mandatory & must be a Manager in same tenant/org
        [Required] public Guid DepartmentHeadId { get; set; }

        public int InitialEmployeeCount { get; set; }
        public Guid? ParentDepartmentId { get; set; }
        public string? Description { get; set; }
    }

    public class UpdateDepartmentDto
    {
        [Required] public Guid Id { get; set; }
        [Required] public Guid OrganizationId { get; set; }
        [Required, MaxLength(200)] public string DepartmentName { get; set; } = null!;
        public string? DepartmentCode { get; set; }

        [Required] public Guid DepartmentHeadId { get; set; }

        public int? InitialEmployeeCount { get; set; }
        public Guid? ParentDepartmentId { get; set; }
        public string? Description { get; set; }
    }
}
