var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("AllowAll"); // Apply CORS policy
app.MapControllers();
app.Run();