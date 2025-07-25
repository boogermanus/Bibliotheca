namespace Bibliotheca.Utils;

public static class AppBuilderExtensions
{
    public static WebApplication BuildBibliothecaApp(this WebApplicationBuilder builder)
    {
        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseCors(options =>
        {
            options.AllowAnyOrigin();
            options.AllowAnyHeader();
            options.AllowAnyMethod();
        });

        app.UseAuthentication();
        app.UseRouting();
        app.UseAuthorization();
        app.MapControllers();

        return app;
    }
}