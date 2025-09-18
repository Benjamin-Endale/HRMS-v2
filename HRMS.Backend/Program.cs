using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Routing;
using System.Text;
using HRMS.Backend.Data;
using HRMS.Backend.Services;

var builder = WebApplication.CreateBuilder(args);

// ===== CORS (single registration) =====
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173") // your frontend
              .AllowAnyHeader()
              .AllowAnyMethod()
    // .AllowCredentials() // uncomment only if you actually use cookies
    );
});

// Controllers & OpenAPI
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// ===== JWT Auth =====
var jwtKey = builder.Configuration["JwtSettings:Key"];
if (string.IsNullOrEmpty(jwtKey))
    throw new Exception("JWT Key not found in configuration.");

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddScoped<IPasswordHasher, Pbkdf2PasswordHasher>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();

builder.Services.AddAuthorization();

var app = builder.Build();

#if DEBUG
app.MapGet("/_routes", (IEnumerable<EndpointDataSource> sources) =>
{
    var list = new List<object>();

    foreach (var src in sources)
    {
        foreach (var ep in src.Endpoints.OfType<RouteEndpoint>())
        {
            var httpMeta = ep.Metadata.OfType<IHttpMethodMetadata>().FirstOrDefault();
            var methods = httpMeta?.HttpMethods ?? Array.Empty<string>();

            list.Add(new
            {
                Template = ep.RoutePattern.RawText,
                Methods = string.Join(",", methods)
            });
        }
    }

    // Order by template for readability
    list = list.OrderBy(x => x.GetType().GetProperty("Template")!.GetValue(x)).ToList();
    return Results.Json(list);
});
#endif


// ===== Pipeline =====
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// CORS must run before auth/authorization and before MapControllers
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// (Optional sample endpoint)
var summaries = new[]
{
    "Freezing","Bracing","Chilly","Cool","Mild","Warm","Balmy","Hot","Sweltering","Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast(
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
