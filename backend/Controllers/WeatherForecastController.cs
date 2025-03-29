using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class HelloController : ControllerBase
{
    [HttpGet]
    public IActionResult GetMessage()
    {
        return Ok(new { message = "Hello from C# backend!" });
    }
}