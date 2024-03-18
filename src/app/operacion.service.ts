import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Operacion } from './operacion';
import { ReunionService } from './reunion.service';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperacionService {

  //Esta URL obtiene el listado de todos las operaciones en el backend
  private baseURL = "http://localhost:8080/operaciones";
  private lista_operaciones = "buscarOperaciones";

  constructor(private httpClient : HttpClient, private reunionService:ReunionService) { }

  //este metodo nos sirve para obtener las operaciones
 // obtenerListaDeOperaciones():Observable<Operacion[]>{
 //   return this.httpClient.get<Operacion[]>(`${this.baseURL}/${this.lista_operaciones}`);
  //}

  obtenerListaDeOperaciones(): Observable<Operacion[]> {
    return this.httpClient.get<Operacion[]>(`${this.baseURL}/${this.lista_operaciones}`).pipe(
      map(operaciones => operaciones.sort((a, b) => b.id_operacion - a.id_operacion))
    );
  }
  
  //este metodo nos sirve para registrar una operacion
  registrarOperacion(operacion:Operacion) : Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,operacion);
  }

  //este metodo sirve para actualizar la operacion
  actualizarOperacion(id_operacion:number,operacion:Operacion) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id_operacion}`,operacion);
  }

  //este metodo sirve para obtener o buscar un operacion
  obtenerOperacionPorId(id_operacion:number):Observable<Operacion>{
    return this.httpClient.get<Operacion>(`${this.baseURL}/${id_operacion}`).pipe(
      tap(operacion => console.log('Datos de la operación:', operacion)),
      catchError(error => {
        console.error('Error al obtener la operación:', error);
        throw error;
      })
    );
  }
  

  eliminarOperacion(id_operacion:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id_operacion}`);
  }
}
