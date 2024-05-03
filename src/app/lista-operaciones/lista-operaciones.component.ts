import  swal  from 'sweetalert2';
import { OperacionService } from '../operacion.service';
import { Operacion } from '../operacion';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter, map  } from 'rxjs/operators';

@Component({
  selector: 'app-lista-operaciones',
  templateUrl: './lista-operaciones.component.html',
  styleUrls: ['./lista-operaciones.component.css']
})
export class ListaOperacionesComponent implements OnInit {

  operaciones:Operacion[];
  reuniones:Reunion[];
  asesorFiltro: string = '';
  sucursalFiltro: string = 'CASA MATRIZ'; 
  totalRegistrosFiltrados: number = 0;

  constructor(private operacionServicio:OperacionService,private router:Router, private reunionServicio:ReunionService) { }

  
  ngOnInit(): void {
    this.obtenerOperacionesPorTipos([901, 903, 905]);
  }



  filtrarOperacionesPorAsesor(): Operacion[] {
    if (!this.asesorFiltro) {
      return this.operaciones; // Si no hay filtro, devuelve todas las operaciones
    }
    return this.operaciones.filter(operacion => operacion.asesor.toString().includes(this.asesorFiltro));
  }


  filtrarOperacionesPorSucursal(): Operacion[] {
    if (!this.sucursalFiltro) {
      return this.operaciones; // Si no hay filtro, devuelve todas las operaciones
    }
    return this.operaciones.filter(operacion => operacion.sucursal.toString().includes(this.sucursalFiltro));
  }



  filtrarOperaciones() {
    const operacionesFiltradas = this.operaciones.filter(operacion => {
      const filtroAsesor = !this.asesorFiltro || operacion.asesor.toLowerCase().includes(this.asesorFiltro.toLowerCase());
      const filtroSucursal = !this.sucursalFiltro || operacion.sucursal === this.sucursalFiltro;
      return filtroAsesor && filtroSucursal;
    });

    this.totalRegistrosFiltrados = operacionesFiltradas.length; 
    return operacionesFiltradas;
  }



  redirectToReuniones() {
    this.router.navigate(['/reuniones']);
  }


    obtenerReunionesPorIdOperacion(idOperacion:number){
    this.reunionServicio.obtenerReunionPorIdOperacion(idOperacion).subscribe(dato => {
      this.reuniones = dato;
      console.log( "Por Id Operacion:",dato);
      this.router.navigate(['/operaciones/reuniones', idOperacion]);
    });
  }


  actualizarOperacion(id:number){
    this.router.navigate(['actualizar-operacion',id]);
  }

  private obtenerOperaciones(){
    this.operacionServicio.obtenerListaDeOperaciones().subscribe(dato => {
      this.operaciones = dato;
      console.log(dato);
    });
  }

  private obtenerOperacionesPorTipos(tiposOperacion: number[]) {
    this.operacionServicio.obtenerListaDeOperaciones().subscribe(dato => {
      // Filtrar las operaciones por los tipos especificados
      this.operaciones = dato.filter(operacion => tiposOperacion.includes(operacion.tipo_operacion));
      console.log(this.operaciones);
    });
  }


    eliminarOperacion(id:number){
      swal({
        title: '¿Estas seguro?',
        text: "Confirma si deseas eliminar la operación",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si , elimínalo',
        cancelButtonText: 'No, cancelar',
        confirmButtonClass: 'btn btn-success',
        cancelButtonClass: 'btn btn-danger',
        buttonsStyling: true
      }).then((result) => {
        if(result.value){
          this.operacionServicio.eliminarOperacion(id).subscribe(dato => {
            console.log(dato);
            this.obtenerOperaciones();
            swal(
              'Operación eliminada',
              'La operación ha sido eliminada con exito',
              'success'
            )
          })
        }
      })
    }


  verDetallesDelaOperacion(nroCuenta:number){
    this.router.navigate(['operacion-detalles',nroCuenta]);
  }
}
