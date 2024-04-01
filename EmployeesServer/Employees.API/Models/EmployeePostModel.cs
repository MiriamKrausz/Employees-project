using Employees.Core.DTOs;
using Employees.Core.Entities;

namespace Employees.API.Models
{
    public class EmployeePostModel
    {
        
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string IdentityNumber { get; set; }
        public string Gender { get; set; } //Male / Female
        public DateTime DateOfBirth { get; set; }
        public DateTime BeginningOfWork { get; set; }
       
      
        public List<EmployeePositionPostModel> Positions { get; set; }
    }
}
