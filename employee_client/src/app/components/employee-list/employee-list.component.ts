import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { formatDate } from '@angular/common';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports:[CommonModule,MatTooltipModule,MatTableModule,MatProgressSpinnerModule ,MatFormFieldModule,MatInputModule,MatToolbarModule,MatCheckboxModule,MatSortModule,MatPaginatorModule,MatExpansionModule,MatIconModule,MatDialogModule,MatButtonModule,MatSelectModule,ReactiveFormsModule,MatDatepickerModule,MatSlideToggleModule],
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
    providers: [
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: DateAdapter, useClass: NativeDateAdapter }
  ]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = [
    'firstName',
    'surname',
    'identityNumber',
    'beginningOfWork',
    'actions',
  ];
  isLoading: boolean = false;
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public dialog: MatDialog,private _employeeService: EmployeeService){}
  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, { width: '500px',});
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
             this.getEmployees();
        }
      });
    }
    
  
  ngOnInit(){
    this.getEmployees();
  }
  formatDate(date: any): string {
    // המרת התאריך לתבנית רצויה - יום/חודש/שנה
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }

  getEmployees(): void {
    this.isLoading = true;
    this._employeeService.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditEmployeeComponent, {
      width:'600px',
      height:'600px',
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
           this.getEmployees();
      }
    });
  }
  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployees();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}
