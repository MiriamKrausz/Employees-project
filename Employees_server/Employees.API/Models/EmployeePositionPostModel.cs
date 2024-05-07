namespace Employees.API.Models
{
    public class EmployeePositionPostModel
    {
        public int PositionId { get; set; }

        public bool IsAdministrative { get; set; }

        public DateTime EntryDate { get; set; }

    }
}
