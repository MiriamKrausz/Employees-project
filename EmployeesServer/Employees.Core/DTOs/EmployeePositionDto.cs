
namespace Employees.Core.DTOs
{
    public class EmployeePositionDto
    {
        public PositionDto Position { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime EntryDate { get; set; }
    }
}
