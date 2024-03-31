using Employees.Core.Entities;

namespace Employees.API.Models
{
    public class EmployeePutModel
    {
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string IdentityNumber { get; set; }
        public DateTime BeginningOfWork { get; set; }
        public DateTime DateOfBirth { get; set; }
        public EGender Gender { get; set; } //Male / Female
        public List<EmployeePositionPostModel> Positions { get; set; }
    }
}
