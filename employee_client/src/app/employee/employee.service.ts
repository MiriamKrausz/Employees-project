import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx'; // Importing xlsx library for Excel manipulation
import { saveAs } from 'file-saver'; // Importing file-saver library for file download
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseUrl = "https://localhost:7109/api/Employees";
  constructor(private http: HttpClient) {
  }
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl)
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`)
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, employee)
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, employee)
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  exportEmployeesToExcel(): Observable<any> {
    return new Observable(observer => {
      this.getAllEmployees().subscribe((employees: Employee[]) => {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(employees);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const now = new Date();
        const formattedDate = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
        const fileName = `employees_${formattedDate}.xlsx`;
        const excelBlob: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(excelBlob, fileName);
        observer.next(); // Notify observers that the operation is complete
        observer.complete(); // Complete the observable
      }, error => {
        observer.error(error); // Pass any errors to observers
      });
    });
  }
}
