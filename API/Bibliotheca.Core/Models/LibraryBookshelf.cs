using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Bibliotheca.Core.Models;

public class LibraryBookshelf
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    [MaxLength(50)]
    public string Name {get; set;} = string.Empty;
    [Range(1, 50)]
    public int NumberOfRows { get; set; }
    public int LibraryId {get;set;}
    public Library? Library {get; set;}

}