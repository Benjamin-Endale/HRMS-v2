using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace HRMS.Backend.Models
{
    // Beginner / Intermediate / Advanced
    public enum TrainingLevel
    {
        Beginner = 1,
        Intermediate = 2,
        Advanced = 3
    }

    public class Training    // "Program" in the UI
    {
        [Key] public Guid Id { get; set; }

        // Multitenancy
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid OrganizationId { get; set; }

        // Basics
        [Required, MaxLength(200)] public string Title { get; set; } = string.Empty;
        [Required, MaxLength(100)] public string Category { get; set; } = string.Empty;
        [Required] public TrainingLevel Level { get; set; } = TrainingLevel.Beginner;
        [Required] public int DurationHours { get; set; }             // e.g., "20 Hour" on the UI
        [Required, MaxLength(120)] public string InstructorName { get; set; } = string.Empty;
        public int? MaxEnrollment { get; set; }

        // Schedule overview (individual sessions are separate)
        public DateTime? StartDateUtc { get; set; }
        public DateTime? EndDateUtc { get; set; }

        [MaxLength(1000)] public string? Description { get; set; }

        // Navs
        public ICollection<TrainingSession> Sessions { get; set; } = new List<TrainingSession>();
        public ICollection<TrainingMaterial> Materials { get; set; } = new List<TrainingMaterial>();
        public ICollection<TrainingEnrollment> Enrollments { get; set; } = new List<TrainingEnrollment>();
        public ICollection<TrainingFeedback> Feedback { get; set; } = new List<TrainingFeedback>();
    }

    public class TrainingSession
    {
        [Key] public Guid Id { get; set; }
        [Required] public Guid ProgramId { get; set; }     // Training.Id
        [Required] public DateTime StartsAtUtc { get; set; }
        [Required] public DateTime EndsAtUtc { get; set; }

        [MaxLength(200)] public string? Location { get; set; }
        public bool IsOnline { get; set; }
        [MaxLength(500)] public string? MeetingLink { get; set; }
        [MaxLength(1000)] public string? Notes { get; set; }

        public Training Program { get; set; } = null!;
    }

    public class TrainingMaterial
    {
        [Key] public Guid Id { get; set; }
        [Required] public Guid ProgramId { get; set; }

        [Required, MaxLength(200)] public string Title { get; set; } = string.Empty;
        // Either a link (YouTube/Drive/etc.) or your uploaded path
        [MaxLength(1000)] public string? Url { get; set; }
        [MaxLength(1000)] public string? FilePath { get; set; }
        public DateTime UploadedAtUtc { get; set; } = DateTime.UtcNow;

        public Training Program { get; set; } = null!;
    }

    public class TrainingEnrollment
    {
        [Key] public Guid Id { get; set; }

        [Required] public Guid ProgramId { get; set; }     // Training.Id
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid EmployeeId { get; set; }    // Employee.EmployeeID

        public DateTime EnrolledOnUtc { get; set; } = DateTime.UtcNow;
        public int ProgressPercent { get; set; } // 0–100
        public DateTime? CompletedOnUtc { get; set; }

        public Training Program { get; set; } = null!;
        public Employee Employee { get; set; } = null!;
    }

    public class TrainingFeedback
    {
        [Key] public Guid Id { get; set; }

        [Required] public Guid ProgramId { get; set; }
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid EmployeeId { get; set; }

        [Range(1, 5)] public int Rating { get; set; } = 5;
        [MaxLength(2000)] public string? Comment { get; set; }
        public DateTime SubmittedOnUtc { get; set; } = DateTime.UtcNow;

        public Training Program { get; set; } = null!;
        public Employee Employee { get; set; } = null!;
    }
}
