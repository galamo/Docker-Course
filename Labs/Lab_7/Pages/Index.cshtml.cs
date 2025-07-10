using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MyDevAppWithMySQL.Data;
using MyDevAppWithMySQL.Models;
using System.Collections.Generic; 
using System.Linq;                

public class IndexModel : PageModel
{
    private readonly AppDbContext _context;

    public IndexModel(AppDbContext context)
    {
        _context = context;
    }

    [BindProperty]
    public List<User>? Users { get; set; }

    public void OnGet()
    {
       
    }
    
    [IgnoreAntiforgeryToken]
    public void OnPost()
    {
        Users = _context.Users.ToList();
    }
}
