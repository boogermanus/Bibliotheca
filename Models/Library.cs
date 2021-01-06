using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Bibliotheca.Models
{
    public class Library : IEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset CreatedOn { get; set; }
        [NotMapped]
        public string userId { get; set; }
        [JsonIgnore]
        public List<UserLibrary> UserLibraries { get; set; }
    }
}