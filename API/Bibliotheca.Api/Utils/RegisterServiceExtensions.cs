using System.Text;
using Bibliotheca.Core.Interfaces.Auth;
using Bibliotheca.Core.Interfaces.Database.Repositories;
using Bibliotheca.Core.Interfaces.Services;
using Bibliotheca.Core.Models;
using Bibliotheca.Core.Services.Api;
using Bibliotheca.Core.Services.Auth;
using Bibliotheca.Infrastructure;
using Bibliotheca.Infrastructure.Repositories;
using Bibliotheca.OpenLibrary.Interfaces;
using Bibliotheca.OpenLibrary.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

namespace Bibliotheca.Utils;

public static class RegisterServiceExtensions
{
    public static IServiceCollection RegisterCommonServices(this IServiceCollection services)
    {
        services.AddControllers()
            .AddNewtonsoftJson();
        services.AddHttpContextAccessor();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen(options => 
        {
            options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                BearerFormat = "JWT",
                In = ParameterLocation.Header,
                Scheme = "bearer"
            });
            options.OperationFilter<AddAuthHeaderOperationFilter>();
        });
        
        return services;
    }

    public static IServiceCollection AddDatabaseServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection") ??
                               throw new InvalidOperationException("Connections string 'DefaultConnection' not fould");

        services.AddDbContext<AppDbContext>(options => options.UseSqlite(connectionString));

        services.AddDatabaseDeveloperPageExceptionFilter();

        services.AddDefaultIdentity<User>(options => {
                options.Password.RequireDigit = false;
            })
            .AddEntityFrameworkStores<AppDbContext>();

        services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"] ?? string.Empty))
                });
        
        return services;
    }
    public static IServiceCollection AddBibliothecaServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthService, AuthService>();
        services.AddTransient<IUserService, UserService>();
        services.AddScoped<ILibraryRepository, LibraryRepository>();
        services.AddScoped<ILibraryService, LibraryService>();
        services.AddScoped<ILibraryUserRepository, LibraryUserRepository>();
        services.AddScoped<ILibraryBookshelfRepository, LibraryBookshelfRepository>();
        services.AddScoped<ILibraryUserService, LibraryUserService>();
        services.AddScoped<ILibraryBookshelfService, LibraryBookshelfService>();
        services.AddScoped<IBookRepository, BookRepository>();
        services.AddScoped<IBookService, BookService>();
        services.AddSingleton<IsbnOpenLibraryService>();
        services.AddSingleton<AuthorOpenLibraryService>();
        services.AddSingleton<WorksOpenLibraryService>();
        services.AddSingleton<IOpenLibraryService, OpenLibraryService>();
        
        return services;
    }
}