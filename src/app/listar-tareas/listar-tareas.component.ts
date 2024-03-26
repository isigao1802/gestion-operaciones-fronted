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
  
  saludoChecked: boolean = false;
  libroChecked: boolean = false;
  integrantesChecked: boolean = false;
  recaudacionChecked: boolean = false;

  idReunion:number;
  idOperacion:number;
  reunion:Reunion = new Reunion();

  ngOnInit(): void {
    this.idReunion = this.route.snapshot.params['idReunion'];
    this.idOperacion = this.route.snapshot.params['idOperacion'];
    this.obtenerDatosDeLaOperacion()
    this.reunionService.obtenerReunionPorId(this.idReunion).subscribe(dato =>{
      this.reunion = dato;
    },error => console.log(error));
  }

  operaciones:Operacion[];
  reuniones:Reunion[];
  operacion: any;
  constructor(private reunionService:ReunionService,private operacionServicio:OperacionService,private route:ActivatedRoute,private router:Router, private reunionServicio:ReunionService) { }

  todosLosItemsMarcados(): boolean {
    return this.saludoChecked && this.libroChecked && this.integrantesChecked && this.recaudacionChecked;
  }

  cerrarReunion() {
    // Verificar si todos los items están marcados
    if (this.todosLosItemsMarcados()) {
      console.log("Reunión cerrada correctamente.");
      swal(`Se ha cerrado la reunión exitosamente`,'', 'success');
      this.reunion.estado="CERRADA";
      this.reunionService.actualizarReunion(this.idReunion,this.reunion).subscribe(dato => {
        this.obtenerReunionesPorIdOperacion(this.idOperacion); 
      },error => console.log(error));
    } else {
      // Si no todos los items están marcados, muestra un mensaje de error o realiza otra acción según sea necesario
      console.log("No se pueden cerrar la reunión. Todos los items deben estar marcados.");
      swal(`Se ha cerrado la reunión exitosamente`,'Error');
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
