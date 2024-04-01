import { Employee } from "./employee.model";
import { Position } from "./position.medel";

export class EmployeePosition {
    employeeId: number;
    positionId: number;
    employee?: Employee; // Optional reference to Employee object
    position?: Position; // Optional reference to Position object
    isAdministrative: boolean;
    entryDate: Date;
  
    // constructor(
    //   employeeId: number,
    //   positionId: number,
    //   isAdministrative: boolean,
    //   entryDate: Date,
    //   employee?: Employee,
    //   position?: Position,
    // ) {
    //   this.employeeId = employeeId;
    //   this.positionId = positionId;
    //   this.isAdministrative = isAdministrative;
    //   this.entryDate = entryDate;
    //   this.employee = employee;
    //   this.position = position;
    // }
  }
  
  