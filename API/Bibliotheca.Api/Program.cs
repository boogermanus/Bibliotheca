using Bibliotheca.Api.Utils;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.UseUrls("http://localhost:5005");

builder.Services.RegisterCommonServices()
    .AddDatabaseServices(builder.Configuration)
    .AddBibliothecaServices();

builder.BuildBibliothecaApp().Run();

