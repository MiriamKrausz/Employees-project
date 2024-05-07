using Employees.Core.Entities;
using Employees.Core.Repositories;
using Employees.Core.Services;
using Microsoft.EntityFrameworkCore;

namespace Employees.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;
        private readonly IPositionService _positionService;
        public EmployeeRepository(DataContext context, IPositionService positionService)
        {
            _context = context;
            _positionService = positionService;
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()

        {
            return await _context.Employees.Where(e => e.IsActive).Include(e => e.Positions).ThenInclude(em => em.Position).ToListAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.Employees.Include(e => e.Positions).ThenInclude(ep => ep.Position).FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            var updatedEmployee = await GetEmployeeByIdAsync(employee.Id);
            if (updatedEmployee != null)
                _context.Entry(updatedEmployee).CurrentValues.SetValues(employee);
            foreach (var newPosition in employee.Positions)
            {
                var existingPosition = updatedEmployee.Positions.FirstOrDefault(p => p.PositionId == newPosition.PositionId);
                _context.Entry(existingPosition).CurrentValues.SetValues(newPosition);
            }
            await _context.SaveChangesAsync();
            return updatedEmployee;
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            var employee = await GetEmployeeByIdAsync(id);
            employee.IsActive = false;
            await _context.SaveChangesAsync();

        }
    }
}
