import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:8080/eventos';

  constructor(private http: HttpClient) {}

  obtenerEventos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  obtenerEventosPorFecha(start: string, end: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-fecha?start=${start}&end=${end}`);
  }
}
