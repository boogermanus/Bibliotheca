using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Database;

namespace Bibliotheca.Core.Models;

public class Library : IEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int Id { get; set; }
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;
    public DateTime CreateDate { get; set; }
    public ICollection<LibraryUser>? LibraryUsers { get; set; }

    public LibraryModel ToApiModel()
    {
        return new LibraryModel
        {
            Id = Id,
            Name = Name,
            CreateDate = CreateDate,
        };
    }
    
    
}