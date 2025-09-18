// Models/Department.cs
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    [Table("departments")]
    public class Department
    {
        [Key]
        public Guid Id { get; set; }

        [Column("organization_id")]
        public Guid OrganizationId { get; set; }
        public Organization Organization { get; set; } = null!;

        [Column("tenant_id")]
        public Guid TenantId { get; set; }
        public Tenant Tenant { get; set; } = null!;

        [Required, MaxLength(200)]
        [Column("name")]
        public string DepartmentName { get; set; } = null!;

        [Column("description")]
        public string? Description { get; set; }

        [MaxLength(50)]
        [Column("department_code")]
        public string? DepartmentCode { get; set; }

        // NEW: mandatory head linked to Employee (who must be a Manager)
        [Column("department_head_id")]
        public Guid? DepartmentHeadId { get; set; }
        public Employee? DepartmentHead { get; set; } = null!;

        [Column("parent_department_id")]
        public Guid? ParentDepartmentId { get; set; }
        public Department? ParentDepartment { get; set; }

        public ICollection<Department> ChildDepartments { get; set; } = new List<Department>();
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public ICollection<Announcement> Announcements { get; set; } = new List<Announcement>();

        public int InitialEmployeeCount { get; set; }
    }
}
