using Bibliotheca.Core.Interfaces.Database;
using Microsoft.EntityFrameworkCore;

namespace Bibliotheca.Infrastructure.Repositories;

public abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class, IEntity
{
    private readonly AppDbContext _context;
    protected DbSet<TEntity> Entities => _context.Set<TEntity>();

    protected AppDbContext DbContext => _context;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
    }
    
    public virtual async Task<TEntity> AddAsync(TEntity entity)
    {
        await Entities.AddAsync(entity);
        await _context.SaveChangesAsync();
        return entity;
    }

    public virtual async Task<TEntity?> DeleteAsync(int id)
    {
        var existing = await GetAsync(id);

        if(existing == null)
            return null;

        Entities.Remove(existing);

        await _context.SaveChangesAsync();

        return existing;
    }

    public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
    {
        return await Entities.ToListAsync();
    }

    public virtual async Task<TEntity?> GetAsync(int id)
    {
        return await Entities.FindAsync(id);
    }

    public virtual async Task<TEntity?> UpdateAsync(TEntity entity)
    {
        var existing = await GetAsync(entity.Id);

        if(existing == null)
            return null;

        _context.Entry(existing).CurrentValues.SetValues(entity);

        Entities.Update(existing);

        await _context.SaveChangesAsync();

        return existing;
    }
}