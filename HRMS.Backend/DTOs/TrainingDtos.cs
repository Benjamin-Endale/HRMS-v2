using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using HRMS.Backend.Models; // for TrainingLevel

namespace HRMS.Backend.DTOs
{
    // ===== Program list tile (Programs tab) =====
    public record TrainingListItemDto(
        Guid Id,
        string Title,
        string Category,
        TrainingLevel Level,
        int DurationHours,
        string InstructorName,
        int ActiveEnrollments,
        double CompletionRatePercent
    );

    // ===== Program detail =====
    public record TrainingProgramDto(
        Guid Id,
        Guid TenantId,
        Guid OrganizationId,
        string Title,
        string Category,
        TrainingLevel Level,
        int DurationHours,
        string InstructorName,
        int? MaxEnrollment,
        DateTime? StartDateUtc,
        DateTime? EndDateUtc,
        string? Description
    );

    public class CreateTrainingProgramDto
    {
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid OrganizationId { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required, MaxLength(100)]
        public string Category { get; set; } = string.Empty;

        [Required]
        public TrainingLevel Level { get; set; } = TrainingLevel.Beginner; // Beginner / Intermediate / Advanced

        [Required, Range(1, 10_000)]
        public int DurationHours { get; set; }

        [Required, MaxLength(120)]
        public string InstructorName { get; set; } = string.Empty;

        [Range(1, 100_000)]
        public int? MaxEnrollment { get; set; }

        public DateTime? StartDateUtc { get; set; }
        public DateTime? EndDateUtc { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }
    }

    public class UpdateTrainingProgramDto : CreateTrainingProgramDto
    {
        [Required] public Guid Id { get; set; }
    }

    // ===== Sessions =====
    public record TrainingSessionDto(
        Guid Id,
        Guid ProgramId,
        DateTime StartsAtUtc,
        DateTime EndsAtUtc,
        string? Location,
        bool IsOnline,
        string? MeetingLink,
        string? Notes
    );

    public class CreateTrainingSessionDto
    {
        [Required] public Guid ProgramId { get; set; }
        [Required] public DateTime StartsAtUtc { get; set; }
        [Required] public DateTime EndsAtUtc { get; set; }

        [MaxLength(200)] public string? Location { get; set; }
        public bool IsOnline { get; set; }
        [MaxLength(500)] public string? MeetingLink { get; set; }
        [MaxLength(1000)] public string? Notes { get; set; }
    }

    // ===== Materials =====
    public record TrainingMaterialDto(
        Guid Id,
        Guid ProgramId,
        string Title,
        string? Url,
        string? FilePath,
        DateTime UploadedAtUtc
    );

    public class CreateTrainingMaterialDto
    {
        [Required] public Guid ProgramId { get; set; }

        [Required, MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [MaxLength(1000)] public string? Url { get; set; }
        [MaxLength(1000)] public string? FilePath { get; set; }
    }

    // ===== Enrollments =====
    public record TrainingEnrollmentDto(
        Guid Id,
        Guid ProgramId,
        Guid EmployeeId,
        DateTime EnrolledOnUtc,
        int ProgressPercent,
        DateTime? CompletedOnUtc
    );

    public class EnrollEmployeeDto
    {
        [Required] public Guid ProgramId { get; set; }
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid EmployeeId { get; set; }

        [Range(0, 100)]
        public int? InitialProgressPercent { get; set; } // optional
    }

    public class UpdateEnrollmentDto
    {
        [Range(0, 100)]
        public int? ProgressPercent { get; set; }

        public bool? MarkCompleted { get; set; }
    }

    // ===== Feedback =====
    public class SubmitTrainingFeedbackDto
    {
        [Required] public Guid ProgramId { get; set; }
        [Required] public Guid TenantId { get; set; }
        [Required] public Guid EmployeeId { get; set; }

        [Range(1, 5)]
        public int Rating { get; set; } = 5;

        [MaxLength(2000)]
        public string? Comment { get; set; }
    }
}
