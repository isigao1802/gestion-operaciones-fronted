import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private apiUrl = 'http://localhost:8080/eventos';

  constructor(private http: HttpClient) {}

  
  obtenerEventoServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  obtenerEventoPorAsesor(asesor:String):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${asesor}`);
  }

  obtenerEventoPorUDE(ude:string):Observable<any>{
    const params = new HttpParams().set('ude', ude);
    console.log('Valor de params:', params.toString());
    return this.http.get(`${this.apiUrl}/buscarPorUde`,{ params: params  });
  }

  obtenerEventosPorFecha(start: string, end: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/por-fecha?start=${start}&end=${end}`);
  }
}
