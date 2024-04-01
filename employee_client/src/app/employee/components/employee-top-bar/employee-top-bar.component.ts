import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';

@Component({
  selector: 'app-employee-top-bar',
  templateUrl: './employee-top-bar.component.html',
  styleUrl: './employee-top-bar.component.scss'
})
export class EmployeeTopBarComponent {
  constructor(public dialog: MatDialog){}
  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, { width: '500px',});
  }
}
