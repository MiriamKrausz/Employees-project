import { Component, Inject} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { CommonModule, DatePipe } from '@angular/common';


@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [MatCardModule, CommonModule,DatePipe],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent {
  employee: Employee; 
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.employee = data.employee; // קבלת הנתונים שהועברו דרך ה-dialog
  }
}
