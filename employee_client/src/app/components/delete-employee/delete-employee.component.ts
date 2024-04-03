import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports:[CommonModule,MatButtonModule,MatInputModule,MatDialogModule,],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {
  employee: Employee;
  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: { employee: Employee },private _employeeService: EmployeeService){this.employee = data.employee;}

  onConfirmDelete(): void {
    this.dialogRef.close(true);
    this._employeeService.deleteEmployee(this.employee.id)
    .subscribe(() => {
      console.log("success");
      
    }, (error) => {
      console.error('Error deleting employee:', error);
    });
    console.log("deleted");     
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}
