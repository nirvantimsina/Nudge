using Npgsql;
using System.Data;
using System.Data.Common;

namespace Nudge.Infrastructure.Repositories;

public class DbConnectionFactory : IDisposable, IAsyncDisposable
{
    private readonly NpgsqlDataSource _dataSource;

    public DbConnectionFactory(string connectionString)
    {
        var builder = new NpgsqlDataSourceBuilder(connectionString);

        builder.EnableDynamicJson();

        _dataSource = builder.Build();
    }

    public IDbConnection CreateConnection() => _dataSource.CreateConnection();

    // Recommended addition for async repository methods:
    public async ValueTask<NpgsqlConnection> OpenConnectionAsync(CancellationToken cancellationToken = default) 
        => await _dataSource.OpenConnectionAsync(cancellationToken);

    public DbConnection CreateDbConnection() => _dataSource.CreateConnection();

    public void Dispose()
    {
        _dataSource.Dispose();
        GC.SuppressFinalize(this);
    }

    public async ValueTask DisposeAsync()
    {
        await _dataSource.DisposeAsync();
        GC.SuppressFinalize(this);
    }
}