import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inspection } from '../model/inspection.model';

@Injectable({
  providedIn: 'root',
})
export class InspectionsService {
  private apiUrl = 'http://localhost:3000/inspections'; // Ruta del json-server

  constructor(private http: HttpClient) {}

  getInspectionsByPlotId(plotId: number): Observable<Inspection[]> {
    return this.http.get<Inspection[]>(`${this.apiUrl}?plotId=${plotId}`);
  }
  registerInspection(inspection: any): Observable<any> {
    return this.http.post(this.apiUrl, inspection);
  }
}
