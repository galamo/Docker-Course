using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Hosting; // ✅ Needed for UseUrls

var builder = WebApplication.CreateBuilder(args);

// ✅ Correctly configure Kestrel and bind to all interfaces
builder.WebHost.UseUrls("http://0.0.0.0:80");

var app = builder.Build();

app.MapGet("/", () => "Hello from Dockerized .NET API!");
app.MapGet("/weather", () => new[] { "Sunny", "Rainy", "Cloudy" });

app.Run();
