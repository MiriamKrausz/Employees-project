import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { EmployeeService } from '../../employee.service';


@Component({
  selector: 'app-employee-top-bar',
  templateUrl: './employee-top-bar.component.html',
  styleUrl: './employee-top-bar.component.scss'
})
export class EmployeeTopBarComponent {
  constructor(public dialog: MatDialog,private _employeeService: EmployeeService){}
  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, { width: '500px',});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
      console.log('The dialog was closed');
    });
  }
  downloadToexcel(): void {
    this._employeeService.exportEmployeesToExcel().subscribe({
      next: () => {
        console.log("Download completed");
        // Add code here to notify the user that the download is complete
      },
      error: (err) => {
        console.error("Error downloading:", err);
        // Add code here to handle errors during download
      }
    });
  }
}
