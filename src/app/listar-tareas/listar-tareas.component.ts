import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';
import { OperacionService } from '../operacion.service';
import { Operacion } from '../operacion';

@Component({
  selector: 'app-listar-tareas',
  templateUrl: './listar-tareas.component.html',
  styleUrl: './listar-tareas.component.css'
})
export class ListarTareasComponent implements OnInit{
  
  idOperacion:number;
  
  ngOnInit(): void {
    this.idOperacion = this.route.snapshot.params['idOperacion'];
    this.obtenerDatosDeLaOperacion()
  }

  operaciones:Operacion[];
  reuniones:Reunion[];
  operacion: any;
  constructor(private operacionServicio:OperacionService,private route:ActivatedRoute,private router:Router, private reunionServicio:ReunionService) { }

  todasChequeadas: boolean = false;
  casillas: any = {
    saludo: false,
    libro: false,
    integrantes: false,
    recaudacion: false
  };

  onCheckboxChange() {
    this.todasChequeadas = this.todasCasillasChequeadas();
  }

  private todasCasillasChequeadas(): boolean {
    // Verifica si todas las casillas están marcadas
    return Object.values(this.casillas).every(checked => checked);
  }


  terminarTareas(){
    this.router.navigate(['operaciones']);
  }

  obtenerDatosDeLaOperacion() {

    this.operacion = { id_operacion: this.idOperacion};
  }

  obtenerReunionesPorIdOperacion(idOperacion:number){
    this.reunionServicio.obtenerReunionPorIdOperacion(idOperacion).subscribe(dato => {
      this.reuniones = dato;
      console.log( "Por Id Operacion:",dato);
      this.router.navigate(['/operaciones/reuniones', idOperacion]);
    });
  }


}
