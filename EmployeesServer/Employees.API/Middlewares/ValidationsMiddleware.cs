using Employees.API.Models;
using Newtonsoft.Json;
using System.Text;


public class ValidationsMiddleware
{
    private readonly RequestDelegate _next;

    public ValidationsMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        // Enable buffering so that the request body can be read multiple times
        context.Request.EnableBuffering();

        if (context.Request.Method == "POST" || context.Request.Method == "PUT")
        {
            // Read the request body
            using (var reader = new StreamReader(context.Request.Body, Encoding.UTF8, detectEncodingFromByteOrderMarks: false, bufferSize: 1024, leaveOpen: true))
            {
                var requestBody = await reader.ReadToEndAsync();

                // Log the received JSON content
                Console.WriteLine("Received JSON: " + requestBody);

                // Deserialize the JSON
                var receivedEmployee = JsonConvert.DeserializeObject<EmployeePostModel>(requestBody);

                var errors = new List<string>();

                // Check if the date of birth is valid (the employee must be 18 years or older)
                if (DateTime.Now.AddYears(-18) < receivedEmployee.DateOfBirth)
                {
                    errors.Add("Employee must be 18 years or older.");
                }

                // Check if the beginning of work is not later than the date of birth
                if (receivedEmployee.BeginningOfWork < receivedEmployee.DateOfBirth)
                {
                    errors.Add("Beginning of work cannot be earlier than date of birth.");
                }

                // Check if the IdentityNumber consists only of digits and is 9 characters long
                if (!IsDigitsOnly(receivedEmployee.IdentityNumber) || receivedEmployee.IdentityNumber.Length != 9)
                {
                    errors.Add("Identity number must consist of 9 digits only.");
                }

                // Check if EntryDate is not later than BeginningOfWork
                foreach (var position in receivedEmployee.Positions)
                {
                    if (position.EntryDate < receivedEmployee.BeginningOfWork)
                    {
                        errors.Add("Entry date to position cannot be earlier than beginning of work.");
                        break; // No need to continue checking if one error is found
                    }
                }

                // Check if any position is duplicated
                var duplicatedPositions = receivedEmployee.Positions
                    .GroupBy(p => p.PositionId)
                    .Where(g => g.Count() >1)
                    .Select(g => g.Key)
                    .ToList();
                if (duplicatedPositions.Any())
                {
                    errors.Add($"Duplicate positions found: {string.Join(", ", duplicatedPositions)}");
                }

                if (errors.Count > 0)
                {
                    context.Response.StatusCode = StatusCodes.Status400BadRequest;
                    context.Response.ContentType = "application/json";
                    await context.Response.WriteAsync(JsonConvert.SerializeObject(new ErrorResponse { Errors = errors }));
                    return;
                }
            }
            // Reset the request body stream position so that subsequent middleware components can still read it
            context.Request.Body.Seek(0, SeekOrigin.Begin);

            // If the validation passes, proceed to the next middleware
            await _next(context);
        }
        else
        {
            // If the request is not a POST request to /api/employees, proceed to the next middleware
            await _next(context);
        }
    }

    public class ErrorResponse
    {
        public List<string> Errors { get; set; }
    }

    private bool IsDigitsOnly(string str)
    {
        foreach (char c in str)
        {
            if (c < '0' || c > '9')
                return false;
        }
        return true;
    }
}



