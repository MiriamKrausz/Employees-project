using Employees.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;


namespace Employees.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        public DbSet<Position> Positions { get; set; }

        public DbSet<EmployeePosition> EmployeePositions { get; set; }
        public DbSet<User>users { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Employee__db");
            optionsBuilder.LogTo(message=>Debug.WriteLine(message));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeePosition>().HasKey(op => new { op.EmployeeId,op.PositionId });
        }
    }
}
