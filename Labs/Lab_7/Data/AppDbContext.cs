using Microsoft.EntityFrameworkCore;
using MyDevAppWithMySQL.Models;

namespace MyDevAppWithMySQL.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
    }
}
