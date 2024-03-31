using Employees.Core.Entities;
using Employees.Core.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Employees.Data.Repositories
{
    public class PositionRepository : IPositionRepository
    {
        private readonly DataContext _context;

        public PositionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _context.Positions.ToListAsync();
        }

        public async Task<Position> GetPositionByIdAsync(int id)
        {
            return await _context.Positions.FindAsync(id);
        }

        public async Task<Position> AddPositionAsync(Position position)
        {
            _context.Positions.Add(position);
            await _context.SaveChangesAsync();
            return position;
        }
        public async Task<Position> UpdatePositionAsync(Position position)
        {
            var updatedPosition = await GetPositionByIdAsync(position.Id);
            _context.Entry(updatedPosition).CurrentValues.SetValues(position);
            await _context.SaveChangesAsync();
            return updatedPosition;
        }
        public async Task DeletePositionsync(int id)
        {
            var position = await GetPositionByIdAsync(id);
            _context.Positions.Remove(position);
            await _context.SaveChangesAsync();
        }
    }
}
