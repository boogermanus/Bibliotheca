using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Auth;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;
using Bibliotheca.Core.Services.Api;
using Bibliotheca.OpenLibrary.Models;
using Moq;
using Book = Bibliotheca.Core.Models.Book;

namespace Bibliotheca.Tests.Services;

[TestFixture]
public class BookServiceTests
{
    private Mock<IUserService> _userServiceMock;
    private Mock<IBookRepository> _bookRepositoryMock;
    private IBookService _bookService;

    [SetUp]
    public void SetUp()
    {
        _userServiceMock = new Mock<IUserService>();
        _userServiceMock.Setup(us => us.CurrentUserId).Returns(Guid.Empty.ToString());

        _bookRepositoryMock = new Mock<IBookRepository>();
        _bookRepositoryMock.Setup(br => br.AddAsync(It.IsAny<Book>())).ReturnsAsync(new Book());
        _bookRepositoryMock.Setup(br => br.GetBooksForUserAsync(It.IsAny<string>()))
            .ReturnsAsync([new Book(), new Book()]);
        _bookRepositoryMock.Setup(br => br.GetBookForUserAsync(1, It.IsAny<string>())).ReturnsAsync(new Book());
        _bookRepositoryMock.Setup(br => br.DeleteAsync(1)).ReturnsAsync(new Book());

        _bookService = new BookService(_bookRepositoryMock.Object, _userServiceMock.Object);
    }

    [Test]
    public async Task AddBookAsyncShouldCallBookRepositoryAddAsync()
    {
        await _bookService.AddBookAsync(new BookModel());
        _bookRepositoryMock.Verify(br => br.AddAsync(It.IsAny<Book>()), Times.Once);
    }

    [Test]
    public async Task GetBooksForUserAsyncShouldCallBookRepositoryGetBooksForUserAsync()
    {
        await _bookService.GetBooksForUserAsync();
        _bookRepositoryMock.Verify(br => br.GetBooksForUserAsync(It.IsAny<string>()), Times.Once);
    }

    [Test]
    public async Task GetBooksForUserAsyncShouldReturnTwoBooks()
    {
        var books = await _bookService.GetBooksForUserAsync();
        Assert.That(books.Count, Is.EqualTo(2));
    }

    [Test]
    public async Task GetBookForUserAsyncShouldCallBookRepositoryGetBookForUserAsync()
    {
        await _bookService.GetBookForUserAsync(1);
        _bookRepositoryMock.Verify(br => br.GetBookForUserAsync(1, It.IsAny<string>()), Times.Once);
    }

    [Test]
    public async Task GetBookForUserAsyncShouldReturnNull()
    {
        var book = await _bookService.GetBookForUserAsync(0);
        Assert.That(book, Is.Null);
    }

    [Test]
    public async Task DeleteBookAsyncShouldCallBookRepositoryDeleteAsync()
    {
        await _bookService.DeleteBookAsync(1);
        _bookRepositoryMock.Verify(br => br.DeleteAsync(1), Times.Once);
    }

    [Test]
    public async Task DeleteBookAsyncShouldReturnNull()
    {
        var book = await _bookService.DeleteBookAsync(0);
        Assert.That(book, Is.Null);
    }

    [Test]
    public async Task GetSubjectsAsyncShouldCallBookRepositoryGetSubjectsAsync()
    {
        await _bookService.GetSubjectsForUserAsync(new OpenLibraryBook());
        _bookRepositoryMock.Verify(br => br.GetSubjectsForUserAsync(It.IsAny<string>()), Times.Once);
    }

    [Test]
    public async Task GetSubjectsAsyncShouldReturnNull()
    {
        var book = await _bookService.GetSubjectsForUserAsync(null);
        Assert.That(book, Is.Null);
    }

    [Test]
    public async Task GetSubjectsAsyncShouldAddSubjectsToBook()
    {
        _bookRepositoryMock.Setup(br => br.GetSubjectsForUserAsync(It.IsAny<string>())).ReturnsAsync(["test", "one"]);
        var book = await _bookService.GetSubjectsForUserAsync(new OpenLibraryBook());
        Assert.That(book?.Subjects.Length, Is.EqualTo(2));
    }

    [Test]
    public async Task DeleteBookForUserAsyncShouldNotThrow()
    {
        await _bookService.DeleteBookForUserAsync(1);
    }

    [Test]
    public async Task DeleteBookForUserAsyncShouldCallBookRepositoryDeleteBookForUserAsync()
    {
        await _bookService.DeleteBookForUserAsync(1);
        _bookRepositoryMock.Verify(br => br.DeleteBookForUserAsync(1, It.IsAny<string>()), Times.Once);
    }
}