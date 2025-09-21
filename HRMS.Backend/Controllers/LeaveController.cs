using HRMS.Backend.Data;
using HRMS.Backend.DTOs;
using HRMS.Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRMS.Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaveController : ControllerBase
    {
        private readonly AppDbContext _context;

        public LeaveController(AppDbContext context)
        {
            _context = context;
        }

        ////  GET TOTAL LEAVE REQUESTS
        //[HttpGet("total-requests")]
        //public async Task<IActionResult> GetTotalRequests()
        //{
        //    var totalRequests = await _context.Leaves.CountAsync();
        //    return Ok(new { TotalRequests = totalRequests });
        //}

        ////  GET TOTAL PENDING REQUESTS
        //[HttpGet("pending-requests")]
        //public async Task<IActionResult> GetPendingRequests()
        //{
        //    var pendingRequests = await _context.Leaves
        //        .CountAsync(l => l.Status == "Pending");

        //    return Ok(new { PendingRequests = pendingRequests });
        //}

        ////  GET TOTAL APPROVED REQUESTS
        //[HttpGet("approved-requests")]
        //public async Task<IActionResult> GetApprovedRequests()
        //{
        //    var approvedRequests = await _context.Leaves
        //        .CountAsync(l => l.Status == "Approved");

        //    return Ok(new { ApprovedRequests = approvedRequests });
        //}

        ////  GET TOTAL REJECTED REQUESTS
        //[HttpGet("rejected-requests")]
        //public async Task<IActionResult> GetRejectedRequests()
        //{
        //    var rejectedRequests = await _context.Leaves
        //        .CountAsync(l => l.Status == "Rejected");

        //    return Ok(new { RejectedRequests = rejectedRequests });
        //}

        //  GET ALL LEAVE REQUESTS
        [HttpGet("requests")]
        public async Task<ActionResult<IEnumerable<LeaveRequestDto>>> GetAllLeaveRequests()
        {
            var leaves = await _context.Leaves
                .Include(l => l.Employee)
                .Include(l => l.LeaveType)
                .Select(l => new LeaveRequestDto
                {
                    LeaveID = l.Id,  // updated
                    EmployeeName = l.Employee != null ? l.Employee.FirstName + " " + l.Employee.LastName : "Unknown",
                    LeaveType = l.LeaveType != null ? l.LeaveType.Name : "N/A",
                    Duration = l.StartDate.ToString("yyyy-MM-dd") + " → " + l.EndDate.ToString("yyyy-MM-dd"),
                    Reason = l.Reason ?? "N/A",
                    Status = l.Status ?? "Pending"
                })
                .ToListAsync();

            return Ok(leaves);
        }

        //  GET ALL UNIQUE STATUSES
        [HttpGet("statuses")]
        public async Task<IActionResult> GetAllStatuses()
        {
            var statuses = await _context.Leaves
                .Select(l => l.Status)
                .Distinct()
                .ToListAsync();

            return Ok(statuses);
        }

        //  UPDATE LEAVE STATUS
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateLeaveStatus(Guid id, [FromBody] UpdateLeaveStatusDto dto)
        {
            try
            {
                var leave = await _context.Leaves
                    .Include(l => l.Employee) // Include employee for credit update
                    .FirstOrDefaultAsync(l => l.Id == id);

                if (leave == null)
                    return NotFound(new { Message = "Leave request not found" });

                if (dto.Status != "Approved" && dto.Status != "Rejected")
                    return BadRequest(new { Message = "Invalid status. Only 'Approved' or 'Rejected' allowed." });

                //  Prevent re-approval/rejection
                if (leave.Status == "Approved" || leave.Status == "Rejected")
                    return BadRequest(new { Message = $"Leave request is already {leave.Status} and cannot be updated again." });

                leave.Status = dto.Status;
                leave.ManagerComment = dto.ManagerComment;
                // Update the timestamp whenever the status changes
                leave.UpdatedAt = DateTime.UtcNow;

                // ------------------------
                // Subtract leave days from credit if approved
                // ------------------------
                if (dto.Status == "Approved")
                {
                    if (leave.Employee.LeaveCredit < 0)
                        leave.Employee.LeaveCredit = 0;

                    var leaveDays = (leave.EndDate - leave.StartDate).Days + 1;

                    if (leave.Employee.LeaveCredit < leaveDays)
                        return BadRequest(new { Message = "Insufficient leave credit." });

                    leave.Employee.LeaveCredit -= leaveDays;

                }

                _context.Leaves.Update(leave);
                await _context.SaveChangesAsync();

                // Calculate "before X hr"
                string approvedAgo = string.Empty;
                if (leave.UpdatedAt.HasValue)
                {
                    var hoursAgo = (DateTime.UtcNow - leave.UpdatedAt.Value).TotalHours;
                    approvedAgo = $" (before {Math.Floor(hoursAgo)} hr)";
                }

                // Duration = EndDate - StartDate + 1 day
                var duration = (leave.EndDate - leave.StartDate).Days + 1;

                // Return updated counts
                var totalRequests = await _context.Leaves.CountAsync();

                // Count requests only for this employee
                var totalEmployeeRequests = await _context.Leaves
                    .CountAsync(l => l.EmployeeId == leave.EmployeeId);



                var approvedRequests = await _context.Leaves.CountAsync(l => l.Status == "Approved");
                var pendingRequests = await _context.Leaves.CountAsync(l => l.Status == "Pending");


                var leaveEmployeeportal = new {

                    LeaveId = leave.Id,
                    LeaveType = leave.LeaveType?.Name,
                    Duration = duration,
                    Date = leave.StartDate,
                    Reason = leave.Reason,
                    Status = leave.Status

                };

                // Prepare response
                var leaveResponse = new
                {
                    LeaveId = leave.Id,
                    EmployeeName = leave.Employee != null ? leave.Employee.FirstName + " " + leave.Employee.LastName : "Unknown",
                    LeaveType = leave.LeaveType != null ? leave.LeaveType.Name : "N/A",
                    Duration = leave.StartDate.ToString("yyyy-MM-dd") + " → " + leave.EndDate.ToString("yyyy-MM-dd"),
                    Reason = leave.Reason ?? "N/A",
                    Status = leave.Status

                };
                // Response
                var leaveDashboard = new
                {
                    EmployeeName = leave.Employee != null
                        ? leave.Employee.FirstName + " " + leave.Employee.LastName
                        : "Unknown",
                    Status = leave.Status,
                    ApprovedAgoHr = leave.UpdatedAt.HasValue
                        ? Math.Floor((DateTime.UtcNow - leave.UpdatedAt.Value).TotalHours) + " hr ago"
                        : "N/A"
                };


                return Ok(new
                {
                    Message = $"Leave request has been {dto.Status}",
                    TotalRequests = totalRequests,
                    PendingRequests = pendingRequests,
                    ApprovedRequests = approvedRequests,
                    RemainingCredit = leave.Employee.LeaveCredit, // optional: show updated credit


                    leaveEmployeeportal = leaveEmployeeportal,

                    leaveResponse = leaveResponse,

                    totalEmployeeRequests = totalEmployeeRequests,

                    leaveDashboard = leaveDashboard
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "An error occurred while updating leave status", Error = ex.Message });
            }
        }



        //  SUBMIT LEAVE REQUEST
        [HttpPost]
        public async Task<IActionResult> SubmitLeaveRequest([FromBody] EmployeeLeaveRequestDto dto)
        {

            


            // Find employee with leave credit
            var employee = await _context.Employees.FindAsync(dto.EmployeeId);
            if (employee == null)
                return NotFound(new { Message = "Employee not found." });

            // Refresh leave credits if 1 year passed
            if ((DateTime.UtcNow - employee.LastCreditUpdate).TotalDays >= 365)
            {
                employee.LeaveCredit += 20;
                employee.LastCreditUpdate = DateTime.UtcNow;

                // Optional: cap credit
                if (employee.LeaveCredit > 40)
                    employee.LeaveCredit = 40;

                _context.Employees.Update(employee);
                await _context.SaveChangesAsync();
            }

            // Calculate number of leave days
            var leaveDays = (dto.EndDate - dto.StartDate).Days + 1;

            // Check leave credit before proceeding
            if (employee.LeaveCredit < leaveDays)
            {
                return BadRequest(new
                {
                    Message = "Insufficient leave credit.",
                    AvailableCredit = employee.LeaveCredit,
                    RequestedDays = leaveDays
                });
            }

            // Create new Leave object
            var leave = new Leave
            {
                EmployeeId = dto.EmployeeId,
                LeaveTypeId = dto.LeaveTypeId,
                TenantId = dto.TenantId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Reason = dto.Reason,
                Status = "Pending",
                AppliedOn = DateTime.UtcNow
            };

            await _context.Leaves.AddAsync(leave);
            await _context.SaveChangesAsync();

            // Load navigation properties for response
            await _context.Entry(leave).Reference(l => l.Employee).LoadAsync();
            await _context.Entry(leave).Reference(l => l.LeaveType).LoadAsync();


            // Calculate duration (end - start + 1)
            var duration = (leave.EndDate - leave.StartDate).Days + 1;

            // Calculate updated counts
            var totalRequests = await _context.Leaves.CountAsync();
            var pendingRequests = await _context.Leaves.CountAsync(l => l.Status == "Pending");

            // Count requests only for this employee
            var totalEmployeeRequests = await _context.Leaves
                .CountAsync(l => l.EmployeeId == leave.EmployeeId);

            // Prepare response
            var leaveResponse = new
            {
                LeaveId = leave.Id,
                EmployeeName = leave.Employee != null ? leave.Employee.FirstName + " " + leave.Employee.LastName : "Unknown",
                LeaveType = leave.LeaveType != null ? leave.LeaveType.Name : "N/A",
                Duration = leave.StartDate.ToString("yyyy-MM-dd") + " → " + leave.EndDate.ToString("yyyy-MM-dd"),
                Reason = leave.Reason ?? "N/A",
                Status = leave.Status
                
            };


            var leaveEmployeeportal = new
            {

                LeaveId = leave.Id,
                LeaveType = leave.LeaveType?.Name,
                Duration = duration,
                Date = leave.StartDate,
                Reason = leave.Reason,
                Status = leave.Status

            };

            return Ok(new
            {
                Message = "Leave request submitted successfully",
                Leave = leaveResponse,
                TotalRequests = totalRequests,
                PendingRequests = pendingRequests,

                leaveEmployeeportal = leaveEmployeeportal,

                totalEmployeeRequests = totalEmployeeRequests


            });
        }

        [HttpGet("requests/employee")] // For leave requests of a single employee
        public async Task<ActionResult<IEnumerable<LeaveRequestDto>>> GetEmployeeLeaveRequests(int employeeId)
        { 
            var leaves = await _context.Leaves
                .Include(l => l.Employee)
                .Select(l => new
                {
                    EmployeeName = l.Employee != null
                        ? l.Employee.FirstName + " " + l.Employee.LastName
                        : "Unknown",
                    Status = l.Status ?? "Pending",
                    UpdatedAt = l.UpdatedAt,
                    ApprovedAgoHr = l.UpdatedAt.HasValue
                        ? $"{Math.Floor((DateTime.UtcNow - l.UpdatedAt.Value).TotalHours)}"
                        : "N/A"
                })
                .ToListAsync();

            return Ok(leaves);
        }


        // DELETE: api/leave/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaveRequest(Guid id)
        {
            var leave = await _context.Leaves.FindAsync(id);
            if (leave == null)
                return NotFound(new { Message = "Leave request not found." });

            _context.Leaves.Remove(leave);
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Leave request deleted successfully." });
        }



    }
}
