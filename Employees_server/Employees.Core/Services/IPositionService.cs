using Employees.Core.Entities;

namespace Employees.Core.Services
{
    public interface IPositionService
    {
        Task<IEnumerable<Position>> GetPositionsAsync();
        Task<Position> GetPositionByIdAsync(int id);

        Task<Position> AddPositionAsync(Position position);
        Task<Position> UpdatePositionAsync(Position position);

        Task DeletePositionAsync(int id);
    }
}
