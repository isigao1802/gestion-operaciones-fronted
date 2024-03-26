import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reunion } from './reunion';
import { tap, catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReunionService {

  //Esta URL obtiene el listado de todas las reuniones en el backend
  private baseURL = "http://localhost:8080/reuniones";
  private lista_reuniones = "buscarReuniones";
  private porIdOperacion = "obtenerPorIdOperacion";


  constructor(private httpClient : HttpClient) { }

  //este metodo nos sirve para obtener las reuniones
  obtenerListaDeReuniones():Observable<Reunion[]>{
    return this.httpClient.get<Reunion[]>(`${this.baseURL}/${this.lista_reuniones}`);
  }

  //este metodo nos sirve para registrar una reunion
  registrarReunion(reunion:Reunion) : Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`,reunion);
  }

  //este metodo sirve para actualizar el reunion
  actualizarReunion(idReunion:number,reunion:Reunion) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${idReunion}`,reunion);
  }

  //este metodo sirve para obtener o buscar un reunion
  obtenerReunionPorId(idReunion: number): Observable<Reunion> {
    return this.httpClient.get<Reunion>(`${this.baseURL}/${idReunion}`).pipe(
      tap(reunion => console.log('Datos de la reunión:', reunion)),
      catchError(error => {
        console.error('Error al obtener la reunión:', error);
        throw error;
      })
    );
  }
  

    //este metodo sirve para obtener o buscar un reunion
    obtenerReunionPorIdOperacion(idOperacion:number):Observable<Reunion[]>{
      return this.httpClient.get<Reunion[]>(`${this.baseURL}/${this.porIdOperacion}/${idOperacion}`).pipe(
        map(reuniones => reuniones.sort((a, b) => a.nroCuota - b.nroCuota))
      );;
    }

  eliminarReunion(id_reunion:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id_reunion}`);
  }
}
