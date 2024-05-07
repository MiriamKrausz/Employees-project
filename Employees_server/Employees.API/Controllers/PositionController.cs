using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Entities;
using Employees.Core.Services;
using Microsoft.AspNetCore.Mvc;

namespace Employees.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PositionController : ControllerBase
    {
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public PositionController(IPositionService positionService, IMapper mapper)
        {
            _positionService = positionService;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var positions = await _positionService.GetPositionsAsync();
            return Ok(_mapper.Map<IEnumerable<PositionDto>>(positions));
        }
        [HttpGet("{id}")]

        public async Task<IActionResult> Get(int id)
        {
            var position = await _positionService.GetPositionByIdAsync(id);
            if (position is null)
                return NotFound();
            return Ok(_mapper.Map<PositionDto>(position));
        }
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPostModel position)
        {
            var positionToAdd = _mapper.Map<Position>(position);
            await _positionService.AddPositionAsync(positionToAdd);
            return Ok(_mapper.Map<PositionDto>(positionToAdd));
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PositionPostModel position)
        {
            var positionToUpdate = await _positionService.GetPositionByIdAsync(id);
            if (positionToUpdate is null)
            {
                return NotFound();
            }
            _mapper.Map(position, positionToUpdate);
            await _positionService.UpdatePositionAsync(positionToUpdate);
            var returnPosition = await _positionService.GetPositionByIdAsync(id);
            return Ok(_mapper.Map<PositionDto>(returnPosition));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var positionToDelete = await _positionService.GetPositionByIdAsync(id);
            if (positionToDelete is null)
            {
                return NotFound();
            }
            await _positionService.DeletePositionAsync(id);
            return NoContent();
        }
    }
}
