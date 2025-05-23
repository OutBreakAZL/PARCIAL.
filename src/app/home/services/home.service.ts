import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plot } from '../model/plot.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/plots'; // Ruta del json-server

  constructor(private http: HttpClient) {}

  getPlots(): Observable<Plot[]> {
    return this.http.get<Plot[]>(this.apiUrl);
  }
}
