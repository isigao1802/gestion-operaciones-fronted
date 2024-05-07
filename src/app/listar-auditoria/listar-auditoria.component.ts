
import  swal  from 'sweetalert2';
import { AuditoriaService } from '../auditoria.service';
import { Auditoria } from '../auditoria';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';
import { Location } from '@angular/common';

@Component({
  selector: 'app-listar-auditorias',
  templateUrl: './listar-auditoria.component.html',
  styleUrls: ['./listar-auditoria.component.css']
})
export class ListarAuditoriaComponent implements OnInit {

  auditorias:Auditoria[];
  reuniones:Reunion[];
  grupoFiltro: string = '';
  sucursalFiltro: string = 'CASA MATRIZ'; 
  totalRegistrosFiltrados: number = 0;

  constructor(private location: Location,private auditoriaServicio:AuditoriaService,private router:Router, private reunionServicio:ReunionService) { }

  ngOnInit(): void {
    //this.obtenerOperaciones();
    console.log( "Busca Auditorias");
    this.obtenerAuditorias();
  }

  cancelar(): void {
    this.location.back();
  }

  filtrarAuditoriaPorGrupo(): Auditoria[] {
    if (!this.grupoFiltro) {
      return this.auditorias; // Si no hay filtro, devuelve todas las auditorias
    }
    return this.auditorias.filter(auditoria => auditoria.grupo.toString().includes(this.grupoFiltro));
  }

  filtrarAuditorias() {
    const auditoriasFiltradas = this.auditorias.filter(auditoria => {
      const filtroGrupo = !this.grupoFiltro || auditoria.grupo.toLowerCase().includes(this.grupoFiltro.toLowerCase());
      const filtroSucursal = !this.sucursalFiltro || auditoria.sucursal === this.sucursalFiltro;
      return filtroGrupo && filtroSucursal;
    });

    this.totalRegistrosFiltrados = auditoriasFiltradas.length; 
    return auditoriasFiltradas;
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


  actualizarAuditoria(id:number){
    this.router.navigate(['actualizar-operacion',id]);
  }

  private obtenerAuditorias(){
    this.auditoriaServicio.obtenerListaDeAuditorias().subscribe(dato => {
      this.auditorias = dato;
      console.log(dato);
    });
  }

  private obtenerAuditoriasPorTipos(tiposOperacion: number[]) {
    this.auditoriaServicio.obtenerListaDeAuditorias().subscribe(dato => {
      // Filtrar las auditorias por los tipos especificados
      this.auditorias = dato.filter(auditoria => tiposOperacion.includes(auditoria.id));
      console.log(this.auditorias);
    });
  }


    eliminarAuditoria(id:number){
      swal({
        title: '¿Estas seguro?',
        text: "Confirma si deseas eliminar la auditoria",
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
          this.auditoriaServicio.eliminarAuditoria(id).subscribe(dato => {
            console.log(dato);
            this.obtenerAuditorias();
            swal(
              'Auditoria eliminada',
              'La auditoria ha sido eliminada con exito',
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
