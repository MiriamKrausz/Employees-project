import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.medel';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  public baseUrl="https://localhost:7109/api/Position"; 
  constructor(private http: HttpClient) {   
   }
  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.baseUrl)
  }
//   getEmployeeById(id: number): Observable<Employee> {
//     return this.http.get<Employee>(`${this.baseUrl}/${id}`)
//  }
//  addEmployee(employee:Employee): Observable<Employee> {
//   return this.http.post<Employee>(this.baseUrl, employee)
//  }
//  updateEmployee(employee:Employee): Observable<Employee> {
//   return this.http.put<Employee>(`${this.baseUrl}/${employee.id}`, employee)
//  }

//  deleteEmployee(id: number): Observable<void> {
//   return this.http.delete<void>(`${this.baseUrl}/${id}`);
// }
}
