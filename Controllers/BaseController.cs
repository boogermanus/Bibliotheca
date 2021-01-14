using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Bibliotheca.Data.Repositories;
using Bibliotheca.Models;
using System;
using Microsoft.Extensions.Logging;
using System.Security.Claims;

namespace Bibliotheca.Controllers
{
    [Route("api/[controller]")]
    public abstract class BaseController<TEntity, TRepository> : Controller
        where TEntity : class, IEntity
        where TRepository: IRepository<TEntity>
    {
        protected readonly IRepository<TEntity> _repository;
        protected TRepository Repository => (TRepository)_repository;
        protected ILogger _logger;
        protected string UserId
        {
            get 
            {
                var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

                return string.IsNullOrEmpty(userId) ? null : userId;
            }
        }
        public BaseController(TRepository repository, ILogger logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet]
        public virtual async Task<IEnumerable<TEntity>> Get()
        {
            return await _repository.GetAll();
        }

        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> Get([FromRoute]int id)
        {
            var entity = await _repository.Get(id);

            if(entity == null)
                return NotFound();

            return entity;
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Put([FromRoute]int id, [FromBody]TEntity entity)
        { 
            try 
            {
                entity.Id = id;
                await _repository.Update(entity);
            }
            catch(Exception e)
            {
                _logger.LogInformation("Bad Update Request: {Message}", e.Message);
                return BadRequest();
            }           
            

            return NoContent();
        }

        [HttpPost]
        public virtual async Task<TEntity> Post([FromBody]TEntity entity)
        {
            var newEntity = await _repository.Add(entity);

            return newEntity;
        }

        [HttpDelete("{id}")]
        public virtual async Task<ActionResult<TEntity>> Delete(int id)
        {
            var entity = await _repository.Delete(id);

            if(entity == null)
                return NotFound();

            return entity;
        }
    }
}