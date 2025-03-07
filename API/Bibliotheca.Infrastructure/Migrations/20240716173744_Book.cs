using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Bibliotheca.Infrastrcture.Migrations
{
    /// <inheritdoc />
    public partial class Book : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Books",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Author = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Subject = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Format = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Isbn13 = table.Column<string>(type: "TEXT", maxLength: 13, nullable: false),
                    Isbn10 = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    NumberOfPages = table.Column<int>(type: "INTEGER", nullable: false),
                    PublishDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    LibraryId = table.Column<int>(type: "INTEGER", nullable: false),
                    LibraryBookshelfId = table.Column<int>(type: "INTEGER", nullable: false),
                    Row = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Books", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Books_Libraries_LibraryId",
                        column: x => x.LibraryId,
                        principalTable: "Libraries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Books_LibraryBookshelves_LibraryBookshelfId",
                        column: x => x.LibraryBookshelfId,
                        principalTable: "LibraryBookshelves",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Books_LibraryBookshelfId",
                table: "Books",
                column: "LibraryBookshelfId");

            migrationBuilder.CreateIndex(
                name: "IX_Books_LibraryId",
                table: "Books",
                column: "LibraryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Books");
        }
    }
}
