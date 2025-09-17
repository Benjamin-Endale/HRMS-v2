using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HRMS.Backend.Migrations
{
    /// <inheritdoc />
    public partial class Init_HRMS : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tenants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    domain = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    industry = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    updated_at = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    AdminFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdminLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdminEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdminPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TimeZone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeManagement = table.Column<bool>(type: "bit", nullable: false),
                    AttendanceTracking = table.Column<bool>(type: "bit", nullable: false),
                    LeaveManagement = table.Column<bool>(type: "bit", nullable: false),
                    Recruitment = table.Column<bool>(type: "bit", nullable: false),
                    PerformanceManagement = table.Column<bool>(type: "bit", nullable: false),
                    TrainingDevelopment = table.Column<bool>(type: "bit", nullable: false),
                    EnableSSO = table.Column<bool>(type: "bit", nullable: false),
                    SSOProvider = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RequireTwoFactorAuth = table.Column<bool>(type: "bit", nullable: false),
                    PasswordPolicy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SessionTimeout = table.Column<int>(type: "int", nullable: false),
                    EnableAuditLogging = table.Column<bool>(type: "bit", nullable: false),
                    EmailNotifications = table.Column<bool>(type: "bit", nullable: false),
                    PushNotifications = table.Column<bool>(type: "bit", nullable: false),
                    CriticalAlertsOnly = table.Column<bool>(type: "bit", nullable: false),
                    DefaultExportFormat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BackupFrequency = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataRetentionYears = table.Column<int>(type: "int", nullable: false),
                    DataEncryptionAtRest = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tenants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "organizations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    organization_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    org_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    domain = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    industry = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    logo_url = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    ip_restrictions = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    updated_at = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_organizations", x => x.Id);
                    table.UniqueConstraint("AK_organizations_id_tenant", x => new { x.Id, x.tenant_id });
                    table.ForeignKey(
                        name: "FK_organizations_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "roles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    description = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    permissions = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    is_system = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roles", x => x.id);
                    table.ForeignKey(
                        name: "FK_roles_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TenantSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Settings = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Version = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TenantSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TenantSettings_tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LeaveTypes",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    organization_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    is_paid = table.Column<bool>(type: "bit", nullable: false),
                    carry_forward = table.Column<bool>(type: "bit", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    max_days = table.Column<int>(type: "int", nullable: false),
                    requires_approval = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveTypes", x => x.id);
                    table.ForeignKey(
                        name: "FK_LeaveTypes_organizations_organization_id",
                        column: x => x.organization_id,
                        principalTable: "organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "org_settings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    organization_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    time_zone = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    workday_start = table.Column<TimeSpan>(type: "time", nullable: false),
                    workday_end = table.Column<TimeSpan>(type: "time", nullable: false),
                    late_after_minutes = table.Column<int>(type: "int", nullable: false),
                    halfday_under_hours = table.Column<int>(type: "int", nullable: false),
                    absent_if_no_clockin = table.Column<bool>(type: "bit", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    updated_at = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_org_settings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_org_settings_organizations_organization_id",
                        column: x => x.organization_id,
                        principalTable: "organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_org_settings_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "training_programs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    organization_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    level = table.Column<int>(type: "int", nullable: false),
                    duration_hours = table.Column<int>(type: "int", nullable: false),
                    instructor_name = table.Column<string>(type: "nvarchar(120)", maxLength: 120, nullable: false),
                    max_enrollment = table.Column<int>(type: "int", nullable: true),
                    start_date_utc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    end_date_utc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_programs", x => x.id);
                    table.ForeignKey(
                        name: "FK_training_programs_organizations_organization_id",
                        column: x => x.organization_id,
                        principalTable: "organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "training_materials",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    program_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    url = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    file_path = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    uploaded_at_utc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_materials", x => x.id);
                    table.ForeignKey(
                        name: "FK_training_materials_training_programs_program_id",
                        column: x => x.program_id,
                        principalTable: "training_programs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "training_sessions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    program_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    starts_at_utc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ends_at_utc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    location = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    is_online = table.Column<bool>(type: "bit", nullable: false),
                    meeting_link = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    notes = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_sessions", x => x.id);
                    table.ForeignKey(
                        name: "FK_training_sessions_training_programs_program_id",
                        column: x => x.program_id,
                        principalTable: "training_programs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Announcements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Destination = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Categories = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Announcementcontent = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DepartmentID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TenantID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ExpiryDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Announcements_organizations_OrganizationID",
                        column: x => x.OrganizationID,
                        principalTable: "organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Announcements_tenants_TenantID",
                        column: x => x.TenantID,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "applicants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    JobId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ResumeUrl = table.Column<string>(type: "nvarchar(2083)", maxLength: 2083, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Source = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactInformation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Appliedfor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Applications = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Fordepartment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_applicants", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "assets",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    organization_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    asset_name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    issued_on = table.Column<DateTime>(type: "datetime2", nullable: true),
                    returned_on = table.Column<DateTime>(type: "datetime2", nullable: true),
                    condition_notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    asset_tag = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    category = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_assets", x => x.id);
                    table.ForeignKey(
                        name: "FK_assets_organizations_organization_id_tenant_id",
                        columns: x => new { x.organization_id, x.tenant_id },
                        principalTable: "organizations",
                        principalColumns: new[] { "Id", "tenant_id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_assets_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "attendance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    attendance_date = table.Column<DateTime>(type: "date", nullable: false),
                    clock_in = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    clock_out = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shift_name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    source = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ip_address = table.Column<string>(type: "nvarchar(45)", maxLength: 45, nullable: true),
                    exception_note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_attendance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_attendance_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Action = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Module = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IpAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuditLogs_tenants_TenantId",
                        column: x => x.TenantId,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "departments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    organization_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    department_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    department_head_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    parent_department_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    InitialEmployeeCount = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_departments", x => x.Id);
                    table.UniqueConstraint("AK_departments_id_org_tenant", x => new { x.Id, x.organization_id, x.tenant_id });
                    table.ForeignKey(
                        name: "FK_departments_departments_parent_department_id_organization_id_tenant_id",
                        columns: x => new { x.parent_department_id, x.organization_id, x.tenant_id },
                        principalTable: "departments",
                        principalColumns: new[] { "Id", "organization_id", "tenant_id" });
                    table.ForeignKey(
                        name: "FK_departments_organizations_organization_id_tenant_id",
                        columns: x => new { x.organization_id, x.tenant_id },
                        principalTable: "organizations",
                        principalColumns: new[] { "Id", "tenant_id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_departments_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "employees",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    department_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    organization_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    role_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    first_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    last_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    gender = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    nationality = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    marital_status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    address = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    date_of_birth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    phone_number = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    emergency_contact_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    emergency_contact_number = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    job_title = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    employee_education_status = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    employee_type = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    photo_url = table.Column<string>(type: "nvarchar(2083)", maxLength: 2083, nullable: false),
                    hire_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    employee_code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    bank_details = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    custom_fields = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    benefits_enrollment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    shift_details = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    updated_at = table.Column<DateTime>(type: "datetime2(3)", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    terminated_date = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    leave_credit = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    LastCreditUpdate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employees", x => x.id);
                    table.UniqueConstraint("AK_employees_id_tenant", x => new { x.id, x.tenant_id });
                    table.CheckConstraint("CHK_emp_custom_fields_json", "custom_fields IS NULL OR ISJSON(custom_fields) = 1");
                    table.ForeignKey(
                        name: "FK_employees_departments_department_id_organization_id_tenant_id",
                        columns: x => new { x.department_id, x.organization_id, x.tenant_id },
                        principalTable: "departments",
                        principalColumns: new[] { "Id", "organization_id", "tenant_id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employees_organizations_organization_id_tenant_id",
                        columns: x => new { x.organization_id, x.tenant_id },
                        principalTable: "organizations",
                        principalColumns: new[] { "Id", "tenant_id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employees_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employees_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "jobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    JobTitle = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    DepartmentID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TenantID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Location = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    JobType = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SalaryRange = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ApplicationDeadline = table.Column<DateTime>(type: "datetime2", nullable: true),
                    JobDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Requirement = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ClosingDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_jobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_jobs_departments_DepartmentID",
                        column: x => x.DepartmentID,
                        principalTable: "departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_jobs_tenants_TenantID",
                        column: x => x.TenantID,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "employee_roles",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    role_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    is_primary = table.Column<bool>(type: "bit", nullable: false),
                    effective_from = table.Column<DateTime>(type: "datetime2", nullable: true),
                    effective_to = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee_roles", x => x.id);
                    table.ForeignKey(
                        name: "FK_employee_roles_employees_employee_id",
                        column: x => x.employee_id,
                        principalTable: "employees",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_employee_roles_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "roles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_employee_roles_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Goals",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    EmployeeID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenantID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GoalTitle = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Priority = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    DueDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Goals", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Goals_employees_EmployeeID",
                        column: x => x.EmployeeID,
                        principalTable: "employees",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Goals_organizations_OrganizationID",
                        column: x => x.OrganizationID,
                        principalTable: "organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Goals_tenants_TenantID",
                        column: x => x.TenantID,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "leaves",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    leave_type_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    start_date = table.Column<DateTime>(type: "date", nullable: false),
                    end_date = table.Column<DateTime>(type: "date", nullable: false),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    approved_by = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    applied_on = table.Column<DateTime>(type: "datetime2(3)", nullable: false),
                    manager_comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_leaves", x => x.id);
                    table.ForeignKey(
                        name: "FK_leaves_LeaveTypes_leave_type_id",
                        column: x => x.leave_type_id,
                        principalTable: "LeaveTypes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_leaves_employees_approved_by_tenant_id",
                        columns: x => new { x.approved_by, x.tenant_id },
                        principalTable: "employees",
                        principalColumns: new[] { "id", "tenant_id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_leaves_employees_employee_id_tenant_id",
                        columns: x => new { x.employee_id, x.tenant_id },
                        principalTable: "employees",
                        principalColumns: new[] { "id", "tenant_id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_leaves_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "performance_reviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReviewerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReviewType = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    TechnicalSkill = table.Column<int>(type: "int", nullable: false),
                    Communication = table.Column<int>(type: "int", nullable: false),
                    Leadership = table.Column<int>(type: "int", nullable: false),
                    Innovation = table.Column<int>(type: "int", nullable: false),
                    Teamwork = table.Column<int>(type: "int", nullable: false),
                    Rating = table.Column<double>(type: "float", nullable: false),
                    OverallFeedback = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReviewCycle = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ReviewPeriodStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReviewPeriodEnd = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_performance_reviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_performance_reviews_employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "employees",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_performance_reviews_employees_ReviewerId",
                        column: x => x.ReviewerId,
                        principalTable: "employees",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "RequestFeedbacks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FeedbackDeadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FeedbackSources = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    InstructionReviewers = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestFeedbacks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RequestFeedbacks_employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "employees",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "training_enrollments",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    program_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    enrolled_on_utc = table.Column<DateTime>(type: "datetime2", nullable: false),
                    progress_percent = table.Column<int>(type: "int", nullable: false),
                    completed_on_utc = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_enrollments", x => x.id);
                    table.ForeignKey(
                        name: "FK_training_enrollments_employees_employee_id_tenant_id",
                        columns: x => new { x.employee_id, x.tenant_id },
                        principalTable: "employees",
                        principalColumns: new[] { "id", "tenant_id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_training_enrollments_training_programs_program_id",
                        column: x => x.program_id,
                        principalTable: "training_programs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "training_feedback",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    program_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    rating = table.Column<int>(type: "int", nullable: false),
                    comment = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: true),
                    submitted_on_utc = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_feedback", x => x.id);
                    table.ForeignKey(
                        name: "FK_training_feedback_employees_employee_id_tenant_id",
                        columns: x => new { x.employee_id, x.tenant_id },
                        principalTable: "employees",
                        principalColumns: new[] { "id", "tenant_id" },
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_training_feedback_training_programs_program_id",
                        column: x => x.program_id,
                        principalTable: "training_programs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    full_name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    normalized_email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    phone_number = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    normalized_username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    password_hash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    password_salt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    role = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    tenant_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    organization_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    employee_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: false),
                    access_failed_count = table.Column<int>(type: "int", nullable: false),
                    lockout_end_utc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    email_confirmed = table.Column<bool>(type: "bit", nullable: false),
                    phone_confirmed = table.Column<bool>(type: "bit", nullable: false),
                    two_factor_enabled = table.Column<bool>(type: "bit", nullable: false),
                    tfa_secret = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    security_stamp = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    last_login_utc = table.Column<DateTime>(type: "datetime2", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "SYSUTCDATETIME()"),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    row_version = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_users", x => x.id);
                    table.ForeignKey(
                        name: "FK_users_employees_employee_id",
                        column: x => x.employee_id,
                        principalTable: "employees",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_users_organizations_organization_id",
                        column: x => x.organization_id,
                        principalTable: "organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_users_tenants_tenant_id",
                        column: x => x.tenant_id,
                        principalTable: "tenants",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "shortlists",
                columns: table => new
                {
                    ShortlistID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    JobID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ResumeUrl = table.Column<string>(type: "nvarchar(2083)", maxLength: 2083, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    position = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    ShortlistedOn = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_shortlists", x => x.ShortlistID);
                    table.ForeignKey(
                        name: "FK_shortlists_jobs_JobID",
                        column: x => x.JobID,
                        principalTable: "jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "refresh_tokens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Token = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    JwtId = table.Column<string>(type: "nvarchar(64)", maxLength: 64, nullable: false),
                    CreatedAtUtc = table.Column<DateTime>(type: "datetime2(3)", nullable: false),
                    ExpiresAtUtc = table.Column<DateTime>(type: "datetime2(3)", nullable: false),
                    RevokedAtUtc = table.Column<DateTime>(type: "datetime2(3)", nullable: true),
                    ReplacedByToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IpAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserAgent = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_refresh_tokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_refresh_tokens_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Interviews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWSEQUENTIALID()"),
                    ShortlistId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ScheduledOn = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Duration = table.Column<int>(type: "int", nullable: true),
                    ScheduledDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LocationUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MeetingUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    InterviewerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    InterviewNote = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApplicantId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Interviews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Interviews_applicants_ApplicantId",
                        column: x => x.ApplicantId,
                        principalTable: "applicants",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Interviews_employees_InterviewerId",
                        column: x => x.InterviewerId,
                        principalTable: "employees",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Interviews_shortlists_ShortlistId",
                        column: x => x.ShortlistId,
                        principalTable: "shortlists",
                        principalColumn: "ShortlistID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "roles",
                columns: new[] { "id", "description", "is_system", "name", "permissions", "tenant_id" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), "Full cross-tenant access", true, "SuperAdmin", "[\"*\"]", null },
                    { new Guid("00000000-0000-0000-0000-000000000002"), "Tenant-wide HR/admin; approve leave", true, "HRAdmin", "[\"tenant.manage\",\"employees.read\",\"employees.create\",\"employees.update\",\"employees.delete\",\"departments.read\",\"departments.create\",\"departments.update\",\"departments.delete\",\"leave.read\",\"leave.approve\",\"attendance.read\",\"attendance.edit\"]", null },
                    { new Guid("00000000-0000-0000-0000-000000000003"), "Standard employee self-service", true, "Employee", "[\"self.read\",\"self.update\",\"attendance.clock\",\"attendance.read.self\",\"leave.request\",\"leave.read.self\"]", null },
                    { new Guid("00000000-0000-0000-0000-000000000004"), "Manage team in same department; approve leave in dept", true, "Manager", "[\"employees.read.dept\",\"employees.update.dept\",\"leave.read.dept\",\"leave.approve.dept\",\"attendance.read.dept\"]", null },
                    { new Guid("00000000-0000-0000-0000-000000000005"), "Read-only for team in dept; review leave", true, "SubManager", "[\"employees.read.dept\",\"leave.read.dept\",\"attendance.read.dept\"]", null }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_DepartmentID",
                table: "Announcements",
                column: "DepartmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_OrganizationID",
                table: "Announcements",
                column: "OrganizationID");

            migrationBuilder.CreateIndex(
                name: "IX_Announcements_TenantID",
                table: "Announcements",
                column: "TenantID");

            migrationBuilder.CreateIndex(
                name: "IX_applicants_JobId",
                table: "applicants",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_assets_employee_id_tenant_id",
                table: "assets",
                columns: new[] { "employee_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_assets_organization_id_tenant_id",
                table: "assets",
                columns: new[] { "organization_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_assets_tenant_id_asset_tag",
                table: "assets",
                columns: new[] { "tenant_id", "asset_tag" },
                unique: true,
                filter: "[asset_tag] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_assets_tenant_id_category",
                table: "assets",
                columns: new[] { "tenant_id", "category" });

            migrationBuilder.CreateIndex(
                name: "IX_attendance_tenant_date",
                table: "attendance",
                columns: new[] { "tenant_id", "attendance_date" });

            migrationBuilder.CreateIndex(
                name: "UX_attendance_employee_tenant_date",
                table: "attendance",
                columns: new[] { "employee_id", "tenant_id", "attendance_date" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_EmployeeId",
                table: "AuditLogs",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AuditLogs_TenantId",
                table: "AuditLogs",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_departments_department_head_id_tenant_id",
                table: "departments",
                columns: new[] { "department_head_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_departments_organization_id_department_code",
                table: "departments",
                columns: new[] { "organization_id", "department_code" },
                unique: true,
                filter: "[department_code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_departments_organization_id_name",
                table: "departments",
                columns: new[] { "organization_id", "name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_departments_organization_id_tenant_id",
                table: "departments",
                columns: new[] { "organization_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_departments_parent_department_id_organization_id_tenant_id",
                table: "departments",
                columns: new[] { "parent_department_id", "organization_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_departments_tenant_id",
                table: "departments",
                column: "tenant_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_roles_employee_id_role_id_tenant_id",
                table: "employee_roles",
                columns: new[] { "employee_id", "role_id", "tenant_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_employee_roles_role_id",
                table: "employee_roles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_employee_roles_tenant_id",
                table: "employee_roles",
                column: "tenant_id");

            migrationBuilder.CreateIndex(
                name: "IX_employees_department_id_organization_id_tenant_id",
                table: "employees",
                columns: new[] { "department_id", "organization_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_employees_organization_id_tenant_id",
                table: "employees",
                columns: new[] { "organization_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_employees_role_id",
                table: "employees",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "IX_employees_tenant_id_email",
                table: "employees",
                columns: new[] { "tenant_id", "email" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_employees_tenant_id_employee_code",
                table: "employees",
                columns: new[] { "tenant_id", "employee_code" },
                unique: true,
                filter: "[employee_code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_employees_tenant_id_username",
                table: "employees",
                columns: new[] { "tenant_id", "username" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Goals_EmployeeID",
                table: "Goals",
                column: "EmployeeID");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_OrganizationID",
                table: "Goals",
                column: "OrganizationID");

            migrationBuilder.CreateIndex(
                name: "IX_Goals_TenantID",
                table: "Goals",
                column: "TenantID");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_ApplicantId",
                table: "Interviews",
                column: "ApplicantId");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_InterviewerId",
                table: "Interviews",
                column: "InterviewerId");

            migrationBuilder.CreateIndex(
                name: "IX_Interviews_ShortlistId",
                table: "Interviews",
                column: "ShortlistId");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_DepartmentID",
                table: "jobs",
                column: "DepartmentID");

            migrationBuilder.CreateIndex(
                name: "IX_jobs_TenantID",
                table: "jobs",
                column: "TenantID");

            migrationBuilder.CreateIndex(
                name: "IX_leaves_approved_by_tenant_id",
                table: "leaves",
                columns: new[] { "approved_by", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_leaves_employee_id_tenant_id",
                table: "leaves",
                columns: new[] { "employee_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_leaves_leave_type_id",
                table: "leaves",
                column: "leave_type_id");

            migrationBuilder.CreateIndex(
                name: "IX_leaves_tenant_id_employee_id_start_date_end_date",
                table: "leaves",
                columns: new[] { "tenant_id", "employee_id", "start_date", "end_date" });

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTypes_organization_id",
                table: "LeaveTypes",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "IX_org_settings_organization_id",
                table: "org_settings",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "IX_org_settings_tenant_id_organization_id",
                table: "org_settings",
                columns: new[] { "tenant_id", "organization_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_organizations_tenant_id_domain",
                table: "organizations",
                columns: new[] { "tenant_id", "domain" },
                unique: true,
                filter: "[domain] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_organizations_tenant_id_org_code",
                table: "organizations",
                columns: new[] { "tenant_id", "org_code" },
                unique: true,
                filter: "[org_code] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_performance_reviews_EmployeeId",
                table: "performance_reviews",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_performance_reviews_ReviewerId",
                table: "performance_reviews",
                column: "ReviewerId");

            migrationBuilder.CreateIndex(
                name: "IX_refresh_tokens_Token",
                table: "refresh_tokens",
                column: "Token",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_refresh_tokens_UserId",
                table: "refresh_tokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RequestFeedbacks_EmployeeId",
                table: "RequestFeedbacks",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_roles_tenant_id_name",
                table: "roles",
                columns: new[] { "tenant_id", "name" },
                unique: true,
                filter: "[tenant_id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_shortlists_JobID",
                table: "shortlists",
                column: "JobID");

            migrationBuilder.CreateIndex(
                name: "IX_tenants_domain",
                table: "tenants",
                column: "domain",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_TenantSettings_TenantId",
                table: "TenantSettings",
                column: "TenantId");

            migrationBuilder.CreateIndex(
                name: "IX_training_enrollments_employee_id_tenant_id",
                table: "training_enrollments",
                columns: new[] { "employee_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_training_enrollments_program_id_employee_id_tenant_id",
                table: "training_enrollments",
                columns: new[] { "program_id", "employee_id", "tenant_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_training_feedback_employee_id_tenant_id",
                table: "training_feedback",
                columns: new[] { "employee_id", "tenant_id" });

            migrationBuilder.CreateIndex(
                name: "IX_training_feedback_program_id_employee_id_tenant_id",
                table: "training_feedback",
                columns: new[] { "program_id", "employee_id", "tenant_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_training_materials_program_id",
                table: "training_materials",
                column: "program_id");

            migrationBuilder.CreateIndex(
                name: "IX_training_programs_organization_id",
                table: "training_programs",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "IX_training_programs_tenant_id_organization_id_title",
                table: "training_programs",
                columns: new[] { "tenant_id", "organization_id", "title" });

            migrationBuilder.CreateIndex(
                name: "IX_training_sessions_program_id_starts_at_utc",
                table: "training_sessions",
                columns: new[] { "program_id", "starts_at_utc" });

            migrationBuilder.CreateIndex(
                name: "IX_users_employee_id",
                table: "users",
                column: "employee_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_normalized_email",
                table: "users",
                column: "normalized_email",
                unique: true,
                filter: "[normalized_email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_users_normalized_username",
                table: "users",
                column: "normalized_username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_users_organization_id",
                table: "users",
                column: "organization_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_tenant_id",
                table: "users",
                column: "tenant_id");

            migrationBuilder.CreateIndex(
                name: "IX_users_username",
                table: "users",
                column: "username",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Announcements_departments_DepartmentID",
                table: "Announcements",
                column: "DepartmentID",
                principalTable: "departments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_applicants_jobs_JobId",
                table: "applicants",
                column: "JobId",
                principalTable: "jobs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_assets_employees_employee_id_tenant_id",
                table: "assets",
                columns: new[] { "employee_id", "tenant_id" },
                principalTable: "employees",
                principalColumns: new[] { "id", "tenant_id" },
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_attendance_employees_employee_id_tenant_id",
                table: "attendance",
                columns: new[] { "employee_id", "tenant_id" },
                principalTable: "employees",
                principalColumns: new[] { "id", "tenant_id" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AuditLogs_employees_EmployeeId",
                table: "AuditLogs",
                column: "EmployeeId",
                principalTable: "employees",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_departments_employees_department_head_id_tenant_id",
                table: "departments",
                columns: new[] { "department_head_id", "tenant_id" },
                principalTable: "employees",
                principalColumns: new[] { "id", "tenant_id" },
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_employees_departments_department_id_organization_id_tenant_id",
                table: "employees");

            migrationBuilder.DropTable(
                name: "Announcements");

            migrationBuilder.DropTable(
                name: "assets");

            migrationBuilder.DropTable(
                name: "attendance");

            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "employee_roles");

            migrationBuilder.DropTable(
                name: "Goals");

            migrationBuilder.DropTable(
                name: "Interviews");

            migrationBuilder.DropTable(
                name: "leaves");

            migrationBuilder.DropTable(
                name: "org_settings");

            migrationBuilder.DropTable(
                name: "performance_reviews");

            migrationBuilder.DropTable(
                name: "refresh_tokens");

            migrationBuilder.DropTable(
                name: "RequestFeedbacks");

            migrationBuilder.DropTable(
                name: "TenantSettings");

            migrationBuilder.DropTable(
                name: "training_enrollments");

            migrationBuilder.DropTable(
                name: "training_feedback");

            migrationBuilder.DropTable(
                name: "training_materials");

            migrationBuilder.DropTable(
                name: "training_sessions");

            migrationBuilder.DropTable(
                name: "applicants");

            migrationBuilder.DropTable(
                name: "shortlists");

            migrationBuilder.DropTable(
                name: "LeaveTypes");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "training_programs");

            migrationBuilder.DropTable(
                name: "jobs");

            migrationBuilder.DropTable(
                name: "departments");

            migrationBuilder.DropTable(
                name: "employees");

            migrationBuilder.DropTable(
                name: "organizations");

            migrationBuilder.DropTable(
                name: "roles");

            migrationBuilder.DropTable(
                name: "tenants");
        }
    }
}
