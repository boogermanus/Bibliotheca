using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Bibliotheca.Core.Interfaces.Database;

namespace Bibliotheca.Core.Models;

public class LibraryUser : IEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    public required string UserId { get; set; }
    public User? User { get; set; }
    public int LibraryId { get; set; }
    public Library? Library { get; set; }
}