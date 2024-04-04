using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Entities;
using Employees.Core.Services;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Employees.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;
        public EmployeesController(IEmployeeService employeeService, IMapper mapper, IPositionService positionService)
        {
            _employeeService = employeeService;
            _mapper = mapper;
            _positionService = positionService;
        }

        // GET: api/<EmployeesController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _employeeService.GetEmployeesAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }
        // GET api/<EmployeesController>/5
        [HttpGet("{id}")]

        public async Task<IActionResult> Get(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee is null)
                return NotFound("Employee not found.");
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            if (employee.IdentityNumber.Length != 9)
            {
                return BadRequest("Identity number must be 9 characters long.");
            }

            // בדיקת תקינות תאריך הלידה
            if (employee.DateOfBirth >= DateTime.Today)
            {
                return BadRequest("Date of birth cannot be in the future.");
            }
            var employeeToAdd = _mapper.Map<Employee>(employee);
            employeeToAdd.Positions = new List<EmployeePosition>();
            foreach(var position in employee.Positions)
            {
                Position pos = await _positionService.GetPositionByIdAsync(position.PositionId);
                EmployeePosition employeePosition=_mapper.Map<EmployeePosition>(position);
 
                employeePosition.Position = pos;
                employeeToAdd.Positions.Add(employeePosition);

            }
            await _employeeService.AddEmployeeAsync(employeeToAdd);
            return Ok(_mapper.Map<EmployeeDto>(employeeToAdd));
        }
        // PUT api/<EmployeesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var employeeToUpdate = await _employeeService.GetEmployeeByIdAsync(id);
            if (employeeToUpdate is null)
            {
                return NotFound();
            }
            if (employee.IdentityNumber.Length != 9)
            {
                return BadRequest("Identity number must be 9 characters long.");
            }

            // בדיקת תקינות תאריך הלידה
            if (employee.DateOfBirth >= DateTime.Today)
            {
                return BadRequest("Date of birth cannot be in the future.");
            }
            _mapper.Map(employee, employeeToUpdate);

            await _employeeService.UpdateEmployeeAsync(employeeToUpdate);
            var returnEmployee = await _employeeService.GetEmployeeByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(returnEmployee));
        }

        // DELETE api/<EmployeesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employeeToDelete = await _employeeService.GetEmployeeByIdAsync(id);
            if (employeeToDelete.IsActive==false)
            {
                return NotFound("employee is no longer active");
            }
            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }
    }
}
