using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HRMS.Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateRequestFeedbackAddDepartmentId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "RequestFeedbacks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RequestFeedbacks_DepartmentId",
                table: "RequestFeedbacks",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestFeedbacks_departments_DepartmentId",
                table: "RequestFeedbacks",
                column: "DepartmentId",
                principalTable: "departments",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestFeedbacks_departments_DepartmentId",
                table: "RequestFeedbacks");

            migrationBuilder.DropIndex(
                name: "IX_RequestFeedbacks_DepartmentId",
                table: "RequestFeedbacks");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "RequestFeedbacks");
        }
    }
}
