using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Bibliotheca.Core.ApiModels;
using Bibliotheca.Core.Interfaces.Database;

namespace Bibliotheca.Core.Models;

public class LibraryBookshelf : IEntity
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
    public LibraryBookshelfModel ToApiModel()
    {
        return new LibraryBookshelfModel
        {
            Id = Id,
            Name=Name,
            NumberOfRows = NumberOfRows,
            LibraryId = LibraryId,
        };
    }

}