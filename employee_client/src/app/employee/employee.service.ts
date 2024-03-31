import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public baseUrl="https://localhost:7109/api/Employees"; 
  constructor(private http: HttpClient) {   
   }
  getAllEmployess(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl)
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`)
 }
 addEmployee(employee:Employee): Observable<Employee> {
  return this.http.post<Employee>(this.baseUrl, employee)
 }
 updateEmployee(employee:Employee): Observable<Employee> {
  return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, employee)
 }

 deleteEmployee(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
}
}
