// DTOs/OrganizationDtos.cs
using System;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.DTOs
{
    // Read model
    public record OrganizationDto(
        Guid Id,
        Guid TenantId,
        string Name,
        string Domain,          // required (non-nullable)
        string Industry,
        string Location,
        string LogoUrl,
        string OrgCode,
        string? IpRestrictions
    );

    // Create
    public class CreateOrganizationDto
    {
        [Required] public Guid TenantId { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        // matches e.Property(x => x.Domain).HasMaxLength(255).IsRequired();
        [Required, MaxLength(255)]
        public string Domain { get; set; } = string.Empty;

        // matches .HasMaxLength(100).IsRequired();
        [Required(ErrorMessage = "Industry can't be empty"), MaxLength(100)]
        public string Industry { get; set; } = string.Empty;

        // matches .HasMaxLength(200).IsRequired();
        [Required(ErrorMessage = "Location can't be empty"), MaxLength(200)]
        public string Location { get; set; } = string.Empty;

        // matches .HasMaxLength(500).IsRequired();
        [Required(ErrorMessage = "Logo URL can't be empty"), MaxLength(500)]
        public string LogoUrl { get; set; } = string.Empty;

        // matches .HasMaxLength(50)
        [MaxLength(50)]
        public string? OrgCode { get; set; }

        // matches .HasMaxLength(2048)
        [MaxLength(2048)]
        public string? IpRestrictions { get; set; }
    }

    // Update
    public class UpdateOrganizationDto
    {
        [Required] public Guid Id { get; set; }
        [Required] public Guid TenantId { get; set; }

        [Required, MaxLength(200)]
        public string Name { get; set; } = string.Empty;

        [Required, MaxLength(255)]
        public string Domain { get; set; } = string.Empty;

        [Required(ErrorMessage = "Industry can't be empty"), MaxLength(100)]
        public string Industry { get; set; } = string.Empty;

        [Required(ErrorMessage = "Location can't be empty"), MaxLength(200)]
        public string Location { get; set; } = string.Empty;

        [Required(ErrorMessage = "Logo URL can't be empty"), MaxLength(500)]
        public string LogoUrl { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? OrgCode { get; set; }

        [MaxLength(2048)]
        public string? IpRestrictions { get; set; }
    }
}
