using AutoMapper;
using Employees.API.Models;
using Employees.Core.Entities;
using System;

namespace Employees.API.Mapping
{
    public class PostModelMappingProfile : Profile
    {

        public PostModelMappingProfile()
        {
            CreateMap<PositionPostModel, Position>();
           // CreateMap<UserPostModel,User>();
            CreateMap<EmployeePositionPostModel, EmployeePosition>();
            CreateMap<EmployeePostModel, Employee>()
                .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => Enum.Parse<EGender>(src.Gender, true)));
        }
    }
}




