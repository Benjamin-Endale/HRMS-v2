using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HRMS.Backend.Models
{
    public class Announcement
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "Title is required")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters")]
        public string Title { get; set; } = string.Empty;

        [MaxLength(200, ErrorMessage = "Destination cannot exceed 200 characters")]
        public string Destination { get; set; } = string.Empty;

        [Required(ErrorMessage = "Category is required")]
        [MaxLength(100, ErrorMessage = "Category cannot exceed 100 characters")]
        public string Categories { get; set; } = string.Empty;

        [Required(ErrorMessage = "Announcement content is required")]
        [MaxLength(5000, ErrorMessage = "Content cannot exceed 5000 characters")]
        public string Announcementcontent { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Foreign key for Department
        public Guid? DepartmentID { get; set; }
        public Department? Department { get; set; } // nullable for optional relationship

        // Foreign key for Tenant
        [Required(ErrorMessage = "TenantID is required")]
        public Guid TenantID { get; set; }
        public Tenant Tenant { get; set; } = null!; // required, EF will enforce

        // Foreign key for Organization
        [Required(ErrorMessage = "OrganizationID is required")]
        public Guid OrganizationID { get; set; }
        public Organization Organization { get; set; } = null!; // required, EF will enforce

        // Optional fields
        public DateTime? ExpiryDate { get; set; }
        public bool IsActive { get; set; } = true;
    }
}
