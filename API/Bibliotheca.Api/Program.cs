using Bibliotheca.Utils;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.WebHost.UseUrls("http://localhost:5005");

builder.Services.RegisterCommonServices();

builder.Services.AddDatabaseServices(builder.Configuration);

builder.Services.AddBibliothecaServices();

AppBuilder.Build(builder).Run();
