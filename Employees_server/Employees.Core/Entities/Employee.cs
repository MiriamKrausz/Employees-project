
namespace Employees.Core.Entities
{
    public enum EGender
    {
        Male,
        Female
    }
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string IdentityNumber { get; set; }
        public EGender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime BeginningOfWork { get; set; }
        public bool IsActive { get; set; } = true;
        public List<EmployeePosition>? Positions { get; set; }

    }
}
