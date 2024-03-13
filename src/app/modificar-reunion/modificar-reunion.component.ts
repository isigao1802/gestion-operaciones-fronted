import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reunion } from '../reunion';
import { ReunionService } from '../reunion.service';
import  swal  from 'sweetalert2';
import { FormatoFechaDirective } from '../directives/formato-fecha.directive';


@Component({
  selector: 'app-modificar-reunion',
  templateUrl: './modificar-reunion.component.html',
  styleUrl: './modificar-reunion.component.css'
})
export class ModificarReunionComponent implements OnInit{
  reuniones:Reunion[];
  idReunion:number;
  reunion:Reunion = new Reunion();
  constructor(private reunionService:ReunionService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.idReunion = this.route.snapshot.params['idReunion'];
    this.reunionService.obtenerReunionPorId(this.idReunion).subscribe(dato =>{
      this.reunion = dato;
    },error => console.log(error));
  }

  irAlaListaDeReuniones(){
    this.router.navigate(['/operaciones/reuniones/'+ this.reunion.idOperacion]);
    swal('Reunión actualizada',`La Reunión <strong>${this.reunion.idReunion}</strong> de la Operación <strong>${this.reunion.idOperacion}</strong> ha sido actualizada con exito`,`success`);
  }


  obtenerReunionesPorIdOperacion(idOperacion:number){
    this.reunionService.obtenerReunionPorIdOperacion(idOperacion).subscribe(dato => {
      this.reuniones = dato;
      console.log( "Por Id Operacion:",dato);
    });
  }

  onSubmit(){
    this.reunionService.actualizarReunion(this.idReunion,this.reunion).subscribe(dato => {
      //this.irAlaListaDeReuniones();operaciones/reuniones/:idOperacion
      this.obtenerReunionesPorIdOperacion(this.reunion.idOperacion); 
      this.irAlaListaDeReuniones();
    },error => console.log(error));
  }

}
