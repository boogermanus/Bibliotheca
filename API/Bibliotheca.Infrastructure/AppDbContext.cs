
using Bibliotheca.Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Infrastructure;

public class AppDbContext : IdentityDbContext<User>
{
    public DbSet<Library> Libraries { get; set; }
    public DbSet<LibraryUser> LibraryUsers { get; set; }
    public DbSet<LibraryBookshelf> LibraryBookshelves { get; set; }
    public DbSet<Book> Books { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
}