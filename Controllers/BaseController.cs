using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Bibliotheca.Data.Repositories;
using Bibliotheca.Models;

namespace Bibliotheca.Controllers
{
    [Route("api/[controller]")]
    public abstract class BaseController<TEntity, TRepository> : Controller
        where TEntity : class, IEntity
        where TRepository: IRepository<TEntity>
    {
        private readonly IRepository<TEntity> _repository;

        public BaseController(TRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IEnumerable<TEntity>> Get()
        {
            return await _repository.GetAll();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TEntity>> Get(int id)
        {
            var entity = await _repository.Get(id);

            if(entity == null)
                return NotFound();

            return entity;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, TEntity entity)
        {
            if(id != entity.Id)
                return BadRequest();
            
            await _repository.Update(entity);

            return NoContent();
        }

        [HttpPost]
        public async Task<TEntity> Post(TEntity entity)
        {
            var newEntity = await _repository.Add(entity);

            return newEntity;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<TEntity>> Delete(int id)
        {
            var entity = await _repository.Delete(id);

            if(entity == null)
                return NotFound();

            return entity;
        }
    }
}