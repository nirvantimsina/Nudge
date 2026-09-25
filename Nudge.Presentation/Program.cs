using Dapper;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Nudge.Application.Common.Behaviors;
using Nudge.Application.Common.Interfaces;
using Nudge.Application.Helpers;
using Nudge.Infrastructure.Common;
using Nudge.Infrastructure.Persistence;
using Nudge.Infrastructure.Repositories;
using Nudge.Infrastructure.Services;
using Nudge.Presentation.Middleware;
using Scalar.AspNetCore;
using Serilog;
using System.Text;

Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()
                .CreateBootstrapLogger();
try
{
    var builder = WebApplication.CreateBuilder(args);

    // Direct internal logging factory to use Serilog settings from appsettings
    builder.Host.UseSerilog((context, services, configuration) => configuration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services));

    // JWT Settings
    var jwtSettings = builder.Configuration
        .GetSection("JwtSettings")
        .Get<JWTSettings>()!;
    builder.Services.AddSingleton(jwtSettings);
    builder.Services.AddSingleton<JWTHelper>();

    // Services
    builder.Services.AddSingleton<PermissionService>();
    builder.Services.AddScoped<IGenericRepository, GenericRepository>();

    // Register HttpContextAccessor and the Scoped Creator Context
    builder.Services.AddHttpContextAccessor();
    builder.Services.AddScoped<ICreatorContext, CreatorContext>();

    // Register the provider as Scoped to isolate threads/HTTP requests
    builder.Services.AddScoped<ICancellationTokenProvider, CancellationTokenProvider>();


    // Register Dapper type handlers for DateOnly
    SqlMapper.AddTypeHandler(new DateTimeHandler());
    SqlMapper.AddTypeHandler(new NullableDateTimeHandler());
    SqlMapper.AddTypeHandler(new DateOnlyTypeHandler());
    SqlMapper.AddTypeHandler(new NullableDateOnlyTypeHandler());

    // Register MediatR with the pipeline behavior
    // Unify all MediatR assembly scanning and pipeline registrations in ONE call
    builder.Services.AddMediatR(cfg =>
    {
        // 1. Scan all relevant assemblies for handlers and notifications
        cfg.RegisterServicesFromAssembly(typeof(ICreatorContext).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(ICancellationTokenProvider).Assembly);
        cfg.RegisterServicesFromAssembly(typeof(IGenericRepository).Assembly);

        // 2. Register behaviors in execution order (Top to Bottom)
        // Global Logging Behavior runs first to time and log everything
        cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(LoggingBehavior<,>));

        // CancellationToken runs early to ensure cancellation hooks are active
        cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(CancellationTokenPipelineBehavior<,>));

        // Context Behavior hydrates domain context parameters
        cfg.AddBehavior(typeof(IPipelineBehavior<,>), typeof(CreatorContextBehavior<,>));
    });


    builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(IGenericRepository).Assembly));

    // Connection string
    var connectionString = builder.Configuration
        .GetConnectionString("Nudge_DB")!;
    builder.Services.AddSingleton(new DbConnectionFactory(connectionString));

    // Dapper JSON column type handlers
    DapperTypeHandlers.Register();

    // Controllers
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();

    // Swagger with JWT support
    builder.Services.AddOpenApi(options =>
    {
        options.AddDocumentTransformer((document, context, cancellationToken) =>
        {
            document.Components ??= new OpenApiComponents();
            document.Components.SecuritySchemes.Add("Bearer", new OpenApiSecurityScheme
            {
                Type = SecuritySchemeType.Http,
                Scheme = "bearer",
                BearerFormat = "JWT",
                Description = "Enter your JWT token"
            });
            document.SecurityRequirements.Add(new OpenApiSecurityRequirement
            {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
                },
                Array.Empty<string>()
            }
            });
            return Task.CompletedTask;
        });
    });

    // JWT Auth with HttpOnly Cookie extraction
    var secretKey = jwtSettings.SecretKey ?? throw new InvalidOperationException("JWT SecretKey is missing in configuration.");

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = jwtSettings.Issuer,
                ValidAudience = jwtSettings.Audience,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };

            // Reads the JWT from the HttpOnly cookie
            options.Events = new JwtBearerEvents
            {
                OnMessageReceived = context =>
                {
                    if (context.Request.Cookies.TryGetValue("nudge_auth_token", out var token))
                    {
                        context.Token = token;
                    }
                    return Task.CompletedTask;
                }
            };
        });

    builder.Services.AddAuthorization();

    // CORS (AllowCredentials is required for cookies)
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("NextClient", policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://127.0.0.1:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
    });

    var app = builder.Build();

    app.UseMiddleware<ExceptionMiddleware>();
    app.UseSerilogRequestLogging();

    // Hydrate cache on startup
    using (var startupScope = app.Services.CreateScope())
    {
        var permService = startupScope.ServiceProvider.GetRequiredService<PermissionService>();
        await permService.LoadAsync();
    }

    if (app.Environment.IsDevelopment())
    {
        app.MapOpenApi();
        app.MapScalarApiReference();
    }

    if (!app.Environment.IsDevelopment())
    {
        app.UseExceptionHandler("/Home/Error");
        app.UseHsts();
    }

    app.UseRouting();
    app.UseCors("NextClient");
    app.UseAuthentication();
    app.UseAuthorization();

    app.MapStaticAssets();
    app.MapControllers();

    app.Run();
}

catch (Exception ex)
{
    Log.Fatal(ex, "The host terminated unexpectedly during startup.");
}
finally
{
    Log.CloseAndFlush();
}