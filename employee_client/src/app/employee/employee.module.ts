import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeRoutingModule } from './employee-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule} from '@angular/material/dialog';
import { DeleteEmployeeComponent } from './components/delete-employee/delete-employee.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [EmployeeListComponent, AddEmployeeComponent, DeleteEmployeeComponent],
  exports: [CommonModule, EmployeeRoutingModule],
  imports: [
    CommonModule, MatIconModule,
    MatTooltipModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatButtonModule, MatSelectModule
  ]
})
export class EmployeeModule { }
