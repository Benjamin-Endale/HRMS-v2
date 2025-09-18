using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    [Table("roles")]
    public class Role
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        // Null = global/system role (e.g., SuperAdmin across tenants)
        [Column("tenant_id")]
        public Guid? TenantId { get; set; }
        public Tenant? Tenant { get; set; }

        [Required, MaxLength(100)]
        [Column("name")]
        public string Name { get; set; } = string.Empty;

        [MaxLength(200)]
        [Column("description")]
        public string? Description { get; set; }

        // Store permissions as JSON array string (e.g., ["employees.read","leave.approve"])
        [Column("permissions")]
        public string PermissionsJson { get; set; } = "[]";

        [Column("is_system")]
        public bool IsSystem { get; set; } = false;

        public ICollection<EmployeeRole> Members { get; set; } = new List<EmployeeRole>();
    }
}
