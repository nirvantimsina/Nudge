using Dapper;
using Microsoft.Extensions.Logging;
using Nudge.Application.Common.Behaviors;
using Nudge.Application.Common.Interfaces;
using System.Data;

namespace Nudge.Infrastructure.Repositories;

public class GenericRepository(
    DbConnectionFactory factory, 
    ILogger<GenericRepository> logger,
    ICancellationTokenProvider tokenProvider) : IGenericRepository
{
    // Helper to resolve the active token context
    private CancellationToken GetActiveToken(CancellationToken passedToken) 
        => passedToken != default ? passedToken : tokenProvider.Token;

    // Multiple rows, single or multiple tables
    public async Task<T?> GetFromMultipleQueriesAsync<T>(
        string sql,
        Func<SqlMapper.GridReader, Task<T>> map, 
        object? parameters = null, 
        CommandType commandType = CommandType.Text, // Defaulted to Text
        CancellationToken cancellationToken = default)
    {
        try
        {
            var activeToken = GetActiveToken(cancellationToken);
            using IDbConnection db = factory.CreateConnection();
            
            var command = new CommandDefinition(sql, parameters, commandType: commandType, cancellationToken: activeToken);
            using var multi = await db.QueryMultipleAsync(command);

            return await map(multi);
        }
        catch (OperationCanceledException)
        {
            logger.LogInformation("Query execution canceled by user request: SQL {SQL}", sql);
            throw; 
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in GetFromMultipleQueriesAsync - SQL {SQL}", sql);
            throw;
        }
    }

    // Multiple rows, single table
    public async Task<IEnumerable<T>> QueryAsync<T>(
        string sql, 
        object? parameters = null, 
        CommandType commandType = CommandType.Text, // Defaulted to Text
        CancellationToken cancellationToken = default)
    {
        try
        {
            var activeToken = GetActiveToken(cancellationToken);
            using IDbConnection db = factory.CreateConnection();
            var command = new CommandDefinition(sql, parameters, commandType: commandType, cancellationToken: activeToken);
            return await db.QueryAsync<T>(command);
        }
        catch (OperationCanceledException) { throw; }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in QueryAsync - SQL {sql}", sql);
            throw;
        }
    }

    // Single row, null if not found
    public async Task<T?> QueryFirstOrDefaultAsync<T>(
        string sql, 
        object? parameters = null, 
        CommandType commandType = CommandType.Text, // Defaulted to Text
        CancellationToken cancellationToken = default)
    {
        try
        {
            var activeToken = GetActiveToken(cancellationToken);
            using IDbConnection db = factory.CreateConnection();
            var command = new CommandDefinition(sql, parameters, commandType: commandType, cancellationToken: activeToken);
            return await db.QueryFirstOrDefaultAsync<T>(command);
        }
        catch (OperationCanceledException) { throw; }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in QueryFirstOrDefaultAsync - SQL {SQL}", sql);
            throw;
        }
    }

    // No return, for executions like insert, update and delete
    public async Task ExecuteAsync(
        string sql, 
        object? parameters = null, 
        CommandType commandType = CommandType.Text, // Defaulted to Text
        CancellationToken cancellationToken = default)
    {
        try
        {
            var activeToken = GetActiveToken(cancellationToken);
            using IDbConnection db = factory.CreateConnection();
            var command = new CommandDefinition(sql, parameters, commandType: commandType, cancellationToken: activeToken);
            await db.ExecuteAsync(command);
        }
        catch (OperationCanceledException) { throw; }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in ExecuteAsync - SQL {SQL}", sql);
            throw;
        }
    }

    // Single scalar value
    public async Task<T?> ExecuteScalarAsync<T>(
        string sql, 
        object? parameters = null, 
        CommandType commandType = CommandType.Text, // Defaulted to Text
        CancellationToken cancellationToken = default)
    {
        try
        {
            var activeToken = GetActiveToken(cancellationToken);
            using IDbConnection db = factory.CreateConnection();
            var command = new CommandDefinition(sql, parameters, commandType: commandType, cancellationToken: activeToken);
            return await db.ExecuteScalarAsync<T>(command);
        }
        catch (OperationCanceledException) { throw; }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error in ExecuteScalarAsync SQL - {SQL}", sql);
            throw;
        }
    }
}
