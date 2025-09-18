
using Microsoft.AspNetCore.Mvc;
using HRMS.Backend.Data;


namespace HRMS.Backend.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Backend is working!");
        }
    }
}
