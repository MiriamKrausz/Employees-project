using Employees.Core.Entities;

namespace Employees.Core.Repositories
{
    public interface IPositionRepository
    {
        Task<IEnumerable<Position>> GetPositionsAsync();

        Task<Position> GetPositionByIdAsync(int id);

        Task<Position> AddPositionAsync(Position position);
        Task<Position> UpdatePositionAsync(Position position);
        Task DeletePositionsync(int id);
    }
}
