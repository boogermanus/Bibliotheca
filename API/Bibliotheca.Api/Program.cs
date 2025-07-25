using Bibliotheca.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5005");

builder.Services.RegisterCommonServices();

builder.Services.AddDatabaseServices(builder.Configuration);

builder.Services.AddBibliothecaServices();

builder.BuildBibliothecaApp().Run();

