import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operacion } from './operacion';
import { ReunionService } from './reunion.service';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../environments/config';

@Injectable({
  providedIn: 'root'
})
export class AsesorService {
  
  private URLPrincipal = environment.urlBase;
  private apiUrl = this.URLPrincipal + "/asesores";
  private lista_asesores = "buscarAsesores";

  constructor(private http: HttpClient) {}

  
  obtenerAsesorServices(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${this.lista_asesores}`);
  }

  obtenerAsesorPorId(id:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      tap(asesor => console.log('Datos del asesor:', asesor)),
      catchError(error => {
        console.error('Error al obtener el asesor:', error);
        throw error;
      })
    );
  }
}