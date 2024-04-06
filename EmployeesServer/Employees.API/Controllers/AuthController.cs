//using Employees.API.Models;
//using Employees.Core.Entities;
//using Employees.Core.Services;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace Employees.API.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AuthController : ControllerBase
//    {
//        private readonly IUserService _userService;
//        private readonly IConfiguration _configuration;

//        public AuthController(IConfiguration configuration, IUserService userService)
//        {
//            _configuration = configuration;
//            _userService = userService;
//        }

//        [HttpPost]
//        public IActionResult Login([FromBody] UserPostModel userPostModel)
//        {
//            var user = _userService.GetByNameAndPassword(userPostModel.UserName, userPostModel.Password);
//            if(user is not null)
//            {
//                var claims = new List<Claim>()
//            {
//                new Claim("Id",user.Id.ToString()),
//                new Claim("Name",user.UserName),
//                new Claim("Password",user.Password),
//            };

//                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("JWT:Key")));
//                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
//                var tokeOptions = new JwtSecurityToken(
//                    issuer: _configuration.GetValue<string>("JWT:Issuer"),
//                    audience: _configuration.GetValue<string>("JWT:Audience"),
//                    claims: claims,
//                    expires: DateTime.Now.AddMinutes(6),
//                    signingCredentials: signinCredentials
//                );
//                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
//                return Ok(new { Token = tokenString });
//            }
//            return Unauthorized("user doesn't exist");
//        }
//    }

//}
