using Bibliotheca.Core.ApiModels.Api;
using Bibliotheca.Core.Interfaces.Auth;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;
using Bibliotheca.Core.Models;
using Bibliotheca.Core.Services.Api;
using Moq;

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
        
        _bookService = new BookService(_bookRepositoryMock.Object, _userServiceMock.Object);
    }

    [Test]
    public async Task AddShouldCallBookRepositoryAddAsync()
    {
        await _bookService.AddBookAsync(new BookModel());
        _bookRepositoryMock.Verify(br => br.AddAsync(It.IsAny<Book>()), Times.Once);
    }
    
}