
namespace Employees.Core.Entities
{
    public class EmployeePosition
    {
        public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public Employee Employee { get; set; }
        public Position Position { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime EntryDate { get; set; }

    }
}
