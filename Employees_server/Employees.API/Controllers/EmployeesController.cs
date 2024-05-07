
using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Entities;
using Employees.Core.Services;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;


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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var employees = await _employeeService.GetEmployeesAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employees));
        }

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
            var validationErrors = await ValidateEmployeeAsync(employee, true);
            if (validationErrors.Any()) return BadRequest(new ErrorResponse { Errors = validationErrors });
            var employeeToAdd = _mapper.Map<Employee>(employee);
            employeeToAdd.Positions = new List<EmployeePosition>();
            foreach (var position in employee.Positions)
            {
                Position pos = await _positionService.GetPositionByIdAsync(position.PositionId);
                EmployeePosition employeePosition = _mapper.Map<EmployeePosition>(position);
                employeePosition.Position = pos;
                employeeToAdd.Positions.Add(employeePosition);
            }
            await _employeeService.AddEmployeeAsync(employeeToAdd);
            return Ok(_mapper.Map<EmployeeDto>(employeeToAdd));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {
            var employeeToUpdate = await _employeeService.GetEmployeeByIdAsync(id);
            if (employeeToUpdate == null) return NotFound();
            var validationErrors = await ValidateEmployeeAsync(employee);
            if (validationErrors.Any()) return BadRequest(new ErrorResponse { Errors = validationErrors });
            _mapper.Map(employee, employeeToUpdate);
            await _employeeService.UpdateEmployeeAsync(employeeToUpdate);
            var returnEmployee = await _employeeService.GetEmployeeByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(returnEmployee));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employeeToDelete = await _employeeService.GetEmployeeByIdAsync(id);
            if (employeeToDelete.IsActive == false)
            {
                return NotFound("Employee is no longer active");
            }
            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }

        private async Task<List<string>> ValidateEmployeeAsync(EmployeePostModel employee, bool isPostRequest = false)
        {
            var errors = new List<string>();
            if (DateTime.Now.AddYears(-18) < employee.DateOfBirth) { errors.Add("Employee must be 18 years or older."); }

            if (employee.BeginningOfWork < employee.DateOfBirth) { errors.Add("Beginning of work cannot be earlier than date of birth."); }

            if (!Regex.IsMatch(employee.IdentityNumber, @"^\d+$") || employee.IdentityNumber.Length != 9) { errors.Add("Identity number must consist of 9 digits only."); }

            if (!Regex.IsMatch(employee.FirstName, @"^[א-ת\u0590-\u05FEa-zA-Z]{2,}$")) { errors.Add("First name must consist of at least two letters, in English or Hebrew."); }

            if (!Regex.IsMatch(employee.Surname, @"^[א-ת\u0590-\u05FEa-zA-Z]{2,}$")) { errors.Add("Surname must consist of at least two letters, in English or Hebrew."); }

            foreach (var position in employee.Positions)
            {
                if (position.EntryDate < employee.BeginningOfWork)
                {
                    errors.Add("Entry date to position cannot be earlier than beginning of work.");
                    break;
                }
            }
            var duplicatedPositions = employee.Positions
                .GroupBy(p => p.PositionId)
                .Where(g => g.Count() > 1)
                .Select(g => g.Key)
                .ToList();
            if (duplicatedPositions.Any())
            {
                errors.Add($"Duplicate positions found: {string.Join(", ", duplicatedPositions)}");
            }
            if (isPostRequest)
            {
                var employees = await _employeeService.GetEmployeesAsync();
                foreach (var existingEmployee in employees)
                {
                    if (existingEmployee.IdentityNumber == employee.IdentityNumber)
                    {
                        errors.Add($"Employee with identity number {employee.IdentityNumber} already exists.");
                        break;
                    }
                }
            }
            return errors;
        }
        public class ErrorResponse
        {
            public List<string> Errors { get; set; }
        }
    }
}

