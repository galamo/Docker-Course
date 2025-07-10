using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using MyDevAppWithMySQL.Data;

var builder = WebApplication.CreateBuilder(args);

// Read connection string from env var (Docker-safe)
var connectionString = builder.Configuration["DB_CONNECTION"];

builder.Services.AddRazorPages();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(8, 0, 36))));

var app = builder.Build();

app.UseStaticFiles();
app.UseRouting();
app.MapRazorPages();
app.Run();
