import { NgModule,AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmployeeRoutingModule } from './employee-routing.module';


@NgModule({
  declarations: [EmployeeListComponent,AddEmployeeComponent,],
  exports: [CommonModule, EmployeeRoutingModule],
  imports: [
    CommonModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
]  
})
export class EmployeeModule { }
