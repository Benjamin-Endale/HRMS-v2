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
                var leave = await _context.Leaves.FindAsync(id);
                if (leave == null)
                    return NotFound(new { Message = "Leave request not found" });

                if (dto.Status != "Approved" && dto.Status != "Rejected")
                    return BadRequest(new { Message = "Invalid status. Only 'Approved' or 'Rejected' allowed." });

                leave.Status = dto.Status;
                leave.ManagerComment = dto.ManagerComment;

                _context.Leaves.Update(leave);
                await _context.SaveChangesAsync();

                // Return updated counts
                var totalRequests = await _context.Leaves.CountAsync();
                var approvedRequests = await _context.Leaves.CountAsync(l => l.Status == "Approved");
                //var rejectedRequests = await _context.Leaves.CountAsync(l => l.Status == "Rejected");
                var pendingRequests = await _context.Leaves.CountAsync(l => l.Status == "Pending");

                return Ok(new
                {
                    Message = $"Leave request has been {dto.Status}",
                    TotalRequests = totalRequests,
                    PendingRequests = pendingRequests,
                    ApprovedRequests = approvedRequests
                    //RejectedRequests = rejectedRequests
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

            // Calculate updated counts
            var totalRequests = await _context.Leaves.CountAsync();
            var pendingRequests = await _context.Leaves.CountAsync(l => l.Status == "Pending");

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

            return Ok(new
            {
                Message = "Leave request submitted successfully",
                Leave = leaveResponse,
                TotalRequests = totalRequests,
                PendingRequests = pendingRequests
            });
        }

    }
}
