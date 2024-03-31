import { EmployeePosition } from "./employee-position.model";

export class Employee {
    id: number;
    firstName: string;
    surname: string;
    identityNumber: string;
    gender: EGender; // Assuming EGender is defined elsewhere (see note below)
    dateOfBirth: Date;
    beginningOfWork: Date;
    isActive: boolean = true;
    positions?: EmployeePosition[]; // Optional array of EmployeePosition objects
  }
  
  export enum EGender {
    Male,
    Female
  }
  