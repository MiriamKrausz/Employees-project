
namespace Employees.Core.DTOs
{
    public class EmployeeDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string IdentityNumber { get; set; }
        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime BeginningOfWork { get; set; }
        public bool IsActive { get; set; }
        public List<EmployeePositionDto> Positions { get; set; }


    }
}
