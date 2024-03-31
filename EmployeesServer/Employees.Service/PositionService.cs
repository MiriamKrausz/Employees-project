using Employees.Core.Entities;
using Employees.Core.Repositories;
using Employees.Core.Services;

namespace Employees.Service
{
    public class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionReposiroty;

        public PositionService(IPositionRepository positionReposiroty)
        {
            _positionReposiroty = positionReposiroty;
        }
        public async Task<IEnumerable<Position>> GetPositionsAsync()
        {
            return await _positionReposiroty.GetPositionsAsync();
        }
        public async Task<Position> GetPositionByIdAsync(int id)
        {
            return await _positionReposiroty.GetPositionByIdAsync(id);
        }

        public async Task<Position> AddPositionAsync(Position position)
        {
            return await _positionReposiroty.AddPositionAsync(position);
        }
        public async Task<Position> UpdatePositionAsync(Position position)
        {
            return await _positionReposiroty.UpdatePositionAsync(position);
        }

        public async Task DeletePositionAsync(int id)
        {
            await _positionReposiroty.DeletePositionsync(id);
        }
    }
}
