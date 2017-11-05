using Microsoft.EntityFrameworkCore;
using Movies.Model;

namespace Movies.Data
{
    public class MoviesData : DbContext
    {
        public MoviesData(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Movie> Movies { get; set; }
    }
}