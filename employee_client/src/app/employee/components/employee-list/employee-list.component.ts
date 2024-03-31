import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../../models/employee.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements AfterViewInit, OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'surname',
    'identityNumber',
    'dateOfBirth',
    'beginningOfWork',
  ];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private _employeeService: EmployeeService) { }
  ngOnInit() {
    this.getEmployees();
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.employees); // After data is fetched
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEmployees(): Employee[] {
    this._employeeService.getAllEmployess().subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        console.log("Employees fetched successfully:");
        console.log(this.employees);
        // Update the data source after successful data retrieval
        this.dataSource = new MatTableDataSource(this.employees);
      },
      error: (err) => {
        console.log(err);
      }
    });
    return this.employees;
  }
}
