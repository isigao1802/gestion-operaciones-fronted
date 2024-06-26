import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';
import { OperacionService } from '../operacion.service';
import { Operacion } from '../operacion';
import  swal  from 'sweetalert2';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrl: './listar-tareas.component.css'
})
export class ListarTareasComponent implements OnInit{
  
  aperturaChecked: boolean = false;
  adoracionChecked: boolean = false;
  aprendizajeChecked: boolean = false;
  accionChecked: boolean = false;
  adiosChecked: boolean = false;
  horaInicioReunion: Date;
  horaFinReunion: Date;
  tiempoTranscurrido: number;
  observaciones: string='';
  tieneObservacion: boolean = false;

  idReunion:number;
  idOperacion:number;
  reunion:Reunion = new Reunion();

  ngOnInit(): void {
    this.idReunion = this.route.snapshot.params['idReunion'];
    this.idOperacion = this.route.snapshot.params['idOperacion'];
    this.obtenerDatosDeLaOperacion()
    this.reunionService.obtenerReunionPorId(this.idReunion).subscribe(dato =>{
    this.reunion = dato;
    this.horaInicioReunion = new Date();
    this.horaInicioReunion.setHours(this.horaInicioReunion.getHours() - 4); //Ajustamos por la zona horaria.
    },error => console.log(error));
    this.observaciones="Sin Observaciones";
  }

  operaciones:Operacion[];
  reuniones:Reunion[];
  operacion: any;
  constructor(private reunionService:ReunionService,private operacionServicio:OperacionService,private route:ActivatedRoute,private router:Router, private reunionServicio:ReunionService) { }

  todosLosItemsMarcados(): boolean {
    if(this.observaciones.length > 2){
      this.tieneObservacion = true;
    }
    return this.aperturaChecked && this.aprendizajeChecked && this.accionChecked && this.adiosChecked;
  }


  calcularTiempoTranscurrido() {
    const horaFinReunion = new Date();
    horaFinReunion.setHours(horaFinReunion.getHours() - 4);
    const tiempoMilisegundos = horaFinReunion.getTime() - this.horaInicioReunion.getTime();
    this.horaFinReunion=horaFinReunion;
    this.tiempoTranscurrido = Math.round(tiempoMilisegundos / (1000 * 60)); // Convertir a minutos
  }


  botonCerrarReunion(){
    this.calcularTiempoTranscurrido()
    swal({
      title: 'Han pasado ' + this.tiempoTranscurrido + ' minutos ' + ' ¿Estás seguro que desea cerrar la reunión?',
      text: "Confirma si deseas cerrar la reunión",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si , cerrarlo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.cerrarReunion();
      }
    })
  }


  cerrarReunion() {
    // Verificar si todos los items están marcados
    if (this.todosLosItemsMarcados()) {
      console.log("Reunión cerrada correctamente.");
      swal(`Se ha cerrado la reunión exitosamente`,'', 'success');
      this.reunion.duracion=this.tiempoTranscurrido;
      this.reunion.horaReunionComienzo=this.horaInicioReunion.toISOString();
      this.reunion.estado="CERRADA";
      this.reunion.horaReunionCierre=this.horaFinReunion.toISOString();
      this.reunion.observacion=this.observaciones;
      console.log("Reunión a cerrar: ",this.reunion);
      this.reunionService.actualizarReunion(this.idReunion,this.reunion).subscribe(dato => {
        console.log("Id Operación: ",this.idOperacion);
        this.obtenerReunionesPorIdOperacion(this.idOperacion); 
        swal(
          'Reunión Cerrada',
          'La reunión ha sido cerrada con éxito',
          'success'
        )
      },error => console.log(error));
    } else {
      // Si no todos los items están marcados, muestra un mensaje de error o realiza otra acción según sea necesario
      console.log("No se pueden cerrar la reunión. Todos los items deben estar marcados.");
      swal(`No se ha cerrado la reunión. Favor verifique los datos`,'Error');
    }
  }

  terminarTareas(){
    this.router.navigate(['operaciones']);
  }

  obtenerDatosDeLaOperacion() {

    this.operacion = { idOperacion: this.idOperacion};
  }

  obtenerReunionesPorIdOperacion(idOperacion:number){
    this.reunionServicio.obtenerReunionPorIdOperacion(idOperacion).subscribe(dato => {
      this.reuniones = dato;
      console.log( "Por Id Operacion:",dato);
      this.router.navigate(['/operaciones/reuniones', idOperacion]);
    });
  }


}
