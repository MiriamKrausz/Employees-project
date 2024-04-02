using AutoMapper;
using Employees.API.Models;
using Employees.Core.Entities;
using System;

namespace Employees.API.Mapping
{
    public class ModelMappingProfile : Profile
    {

        public ModelMappingProfile()
        {
            CreateMap<PositionPostModel, Position>();

            CreateMap<EmployeePositionPostModel, EmployeePosition>();

            CreateMap<EmployeePostModel, Employee>()
   .ForMember(dest => dest.Gender, opt => opt.MapFrom(src => Enum.Parse<EGender>(src.Gender, true)));

        }
    }
}




