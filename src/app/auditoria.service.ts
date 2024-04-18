import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auditoria } from './auditoria';
import { ReunionService } from './reunion.service';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  //Esta URL obtiene el listado de todos las auditorias en el backend
  private baseURL = "http://localhost:8080/auditorias";
  private lista_auditorias = "buscarAuditorias";

  constructor(private httpClient : HttpClient, private reunionService:ReunionService) { }


  obtenerListaDeAuditorias(): Observable<Auditoria[]> {
    return this.httpClient.get<Auditoria[]>(`${this.baseURL}/${this.lista_auditorias}`).pipe(
      map(auditorias => auditorias.sort((a, b) => b.id - a.id))
    );
  }
  
  //este metodo nos sirve para registrar una auditoria
  registrarAuditoria(auditoria:Auditoria) : Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,auditoria);
  }

  //este metodo sirve para actualizar la auditoria
  actualizarAuditoria(id:number,auditoria:Auditoria) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`,auditoria);
  }

  //este metodo sirve para obtener o buscar un auditoria
  obtenerAuditoriaPorId(id:number):Observable<Auditoria>{
    return this.httpClient.get<Auditoria>(`${this.baseURL}/${id}`).pipe(
      tap(auditoria => console.log('Datos de la auditoria:', auditoria)),
      catchError(error => {
        console.error('Error al obtener la auditoria:', error);
        throw error;
      })
    );
  }
  
  eliminarAuditoria(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
