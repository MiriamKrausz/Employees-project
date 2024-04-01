import { EmployeePosition } from "./employee-position.model";

export class EmployeePost {
    firstName: string;
    surname: string;
    identityNumber: string;
    gender: string; // Assuming EGender is defined elsewhere (see note below)
    dateOfBirth: Date;
    beginningOfWork: Date;
    positions?: EmployeePosition[]; // Optional array of EmployeePosition objects
  } 
  // export enum EGender {
  //   Male,
  //   Female
  // }
