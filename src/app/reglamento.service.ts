import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReunionService } from './reunion.service';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../environments/config';
import { Reglamento } from './reglamento';

@Injectable({
  providedIn: 'root'
})
export class ReglamentoService {

 private URLPrincipal = environment.urlBase;
  private baseURL = this.URLPrincipal + "/reglamentos";
  private lista_reglamentos = "buscarReglamentoInternos";
  private guardar_reglamento = "guardarReglamentoInterno";
  private porIdOperacion = "obtenerPorIdOperacion";

  constructor(private httpClient : HttpClient, private reunionService:ReunionService) { }


  obtenerListaDeReglamentos(): Observable<Reglamento[]> {
    return this.httpClient.get<Reglamento[]>(`${this.baseURL}/${this.lista_reglamentos}`).pipe(
      map( reglamentos =>  reglamentos.sort((a, b) => b.idReglamento - a.idReglamento))
    );
  }
  
  //este metodo nos sirve para registrar un reglamento;
  registrarReglamento(reglamento:Reglamento) : Observable<Object>{
    console.log("Reglamento " ,reglamento);
    const reglamentoLimpio = this.limpiarYConvertirNumeros(reglamento);
    console.log("Reglamento después de limpiar: ", reglamentoLimpio);
    return this.httpClient.post(`${this.baseURL}/${this.guardar_reglamento}`,reglamentoLimpio);
  }
 

  private limpiarYConvertirNumeros(obj: any): any {
    const objLimpio = { ...obj };
    for (const key in objLimpio) {
      if (objLimpio.hasOwnProperty(key)) {
        const value = objLimpio[key];
        if (typeof value === 'string' && !isNaN(Number(value.replace(/,/g, '')))) {
          // Convertir la cadena de texto a número después de eliminar comas
          objLimpio[key] = Number(value.replace(/,/g, ''));
        }
      }
    }
    return objLimpio;
  }

  //este metodo sirve para actualizar la operacion
  actualizarReglamento(idReglamento:number,reglamento:Reglamento) : Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${idReglamento}`,reglamento);
  }


  obtenerReglamentoPorIdOperacion(idOperacion:number):Observable<Reglamento>{
    return this.httpClient.get<Reglamento>(`${this.baseURL}/${this.porIdOperacion}/${idOperacion}`).pipe(
      tap(reglamento => console.log('Datos del reglamento:', reglamento)),
      catchError(error => {
        console.error('Error al obtener el reglamento:', error);
        throw error;
      })
    );
  }


  eliminarReglamento(idReglamento:number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${idReglamento}`);
  }
}
