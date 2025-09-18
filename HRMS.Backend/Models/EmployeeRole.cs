using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    [Table("employee_roles")]
    public class EmployeeRole
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Column("employee_id")]
        public Guid EmployeeId { get; set; }              // -> Employee.EmployeeID (GUID)
        public Employee Employee { get; set; } = null!;

        [Column("role_id")]
        public Guid RoleId { get; set; }                  // -> Role.Id
        public Role Role { get; set; } = null!;

        [Column("tenant_id")]
        public Guid TenantId { get; set; }                // Always set to employee's tenant
        public Tenant Tenant { get; set; } = null!;

        [Column("is_primary")]
        public bool IsPrimary { get; set; } = false;

        [Column("effective_from")]
        public DateTime? EffectiveFrom { get; set; }

        [Column("effective_to")]
        public DateTime? EffectiveTo { get; set; }
    }
}
