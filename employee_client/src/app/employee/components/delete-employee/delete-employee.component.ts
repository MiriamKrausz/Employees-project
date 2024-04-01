import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../../models/employee.model';
@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.scss'
})
export class DeleteEmployeeComponent {
  employee: Employee;

  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) data: { employee: Employee },private employeeService: EmployeeService
  ) 
  {this.employee = data.employee;}

  onConfirmDelete(): void {
    this.dialogRef.close(true);
    this.employeeService.deleteEmployee(this.employee.id)
    .subscribe(() => {
      console.log("success");
      
    }, (error) => {
      console.error('Error deleting employee:', error);
    });
    console.log("deleted");     
    window.location.reload();
  }

  onCancel(): void {
    this.dialogRef.close(false); 
  }
}
