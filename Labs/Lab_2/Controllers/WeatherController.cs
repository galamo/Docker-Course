using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class WeatherController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new[] { "Sunny", "Rainy", "Windy" });
}
