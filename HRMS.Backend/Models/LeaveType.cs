using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    public class LeaveType
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        // FK -> organizations(id)
        [Column("organization_id")]
        public Guid OrganizationId { get; set; }
        public Organization Organization { get; set; } = null!;

        [Column("name"), Required, MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Column("is_paid")]
        public bool IsPaid { get; set; }

        [Column("carry_forward")]
        public bool CarryForward { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("max_days")]
        public int MaxDays { get; set; }

        [Column("requires_approval")]
        public bool RequiresApproval { get; set; }

        public ICollection<Leave> Leaves { get; set; } = new List<Leave>();
    }
}
