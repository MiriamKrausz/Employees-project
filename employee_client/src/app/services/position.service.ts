import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from '../models/position.model';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  public baseUrl = "https://localhost:7109/api/Position";
  constructor(private http: HttpClient) {
  }
  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(this.baseUrl)
  }
  addPosition(Position: Position): Observable<Position> {
    return this.http.post<Position>(this.baseUrl, Position)
  }
}
