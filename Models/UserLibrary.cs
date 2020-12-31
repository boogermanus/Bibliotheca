// using System;
// using System.ComponentModel.DataAnnotations;
// using System.ComponentModel.DataAnnotations.Schema;

// namespace Bibliotheca.Models
// {
//     public class UserLibrary : IEntity
//     {
//         [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
//         [Key]
//         public int Id { get; set; }
//         public int LibraryId { get; set; }
//         public Library Library { get; set; }
//         public string userId { get; set; }
//         public ApplicationUser User { get; set; }
//     }
// }