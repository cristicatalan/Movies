using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Movies.Data;
using Movies.Model;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace Movies.Api.Controllers
{
    [Route("api/[controller]")]
    public class MoviesController : Controller
    {
        MoviesData _db;

        public MoviesController(MoviesData db)
        {
            _db = db;
        }

        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return _db.Movies;
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Thread.Sleep(1000);

            var movie = _db.Movies.FirstOrDefault(m => m.Id == id);
            if (movie == null)
            {
                return NotFound();
            }

            return new ObjectResult(movie);
        }

        [HttpPost]
        public IActionResult Post([FromBody] Movie newMovie)
        {
            if (ModelState.IsValid)
            {
                _db.Movies.Add(newMovie);
                _db.SaveChanges();
                return CreatedAtRoute(new { controller = "Movies", id = newMovie.Id }, newMovie);
            }

            return BadRequest(ModelState);
        }

        [HttpPut]
        public IActionResult Put([FromBody] Movie updatedMovie)
        {
            if (ModelState.IsValid)
            {
                _db.Movies.Attach(updatedMovie).State = EntityState.Modified;
                _db.SaveChanges();
                return new ObjectResult(updatedMovie);
            }

            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var movie = _db.Movies.FirstOrDefault(m => m.Id == id);
            if (movie != null)
            {
                _db.Movies.Remove(movie);
                _db.SaveChanges();
                return new ObjectResult(movie);
            }

            return NotFound();
        }
    }
}