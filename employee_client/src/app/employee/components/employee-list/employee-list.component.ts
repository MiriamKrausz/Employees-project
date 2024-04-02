import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../../../models/employee.model';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { EditComponent } from '../../../edit/edit.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements AfterViewInit {
  employees: Employee[] = [];
  displayedColumns: string[] = [
    'firstName',
    'surname',
    'identityNumber',
    'beginningOfWork',
    'actions',
  ];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _employeeService: EmployeeService, public dialog: MatDialog) { }
  ngAfterViewInit() {this.getEmployees();}
      
  getEmployees(): void {
    this._employeeService.getAllEmployees().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        console.log("Employees fetched successfully:");
        console.log(this.employees);
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  editEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(EditComponent, {
      width:'500px',
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(emp => emp.id !== employee.id);
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
  deleteEmployee(employee: Employee): void {
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      data: { employee }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(emp => emp.id !== employee.id);
        this.dataSource = new MatTableDataSource(this.employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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



