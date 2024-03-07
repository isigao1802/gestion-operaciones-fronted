import  swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-reuniones',
  templateUrl: './lista-reuniones.component.html',
  styleUrls: ['./lista-reuniones.component.css']
})
export class ListaReunionesComponent implements OnInit{
  nombreGrupo:String;
  idOperacion:number;
  idReunion:number;
  reuniones:Reunion[];

  constructor(private route:ActivatedRoute,private reunionServicio:ReunionService,private router:Router) { }

  ngOnInit(): void {
    this.idOperacion = this.route.snapshot.params['idOperacion'];
    this.obtenerReunionesPorIdOperacion(this.idOperacion)
    
   
  }

  actualizarReunion(id:number){
    this.router.navigate(['actualizar-operacion',id]);
  }

  private obtenerReuniones(){
    this.reunionServicio.obtenerListaDeReuniones().subscribe(dato => {
      this.reuniones = dato;
      console.log("Listado Completo",dato);
    });
  }

   obtenerReunionesPorIdOperacion(idOperacion:number){
    this.reunionServicio.obtenerReunionPorIdOperacion(idOperacion).subscribe(dato => {
      this.reuniones = dato;
      console.log( "Por Id Operacion:",dato);
    });
  }


    eliminarReunion(id:number){
      swal({
        title: '¿Estas seguro?',
        text: "Confirma si deseas eliminar la reunión",
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
          this.reunionServicio.eliminarReunion(id).subscribe(dato => {
            console.log(dato);
            this.obtenerReuniones();
            swal(
              'Reunión eliminada',
              'La reunión ha sido eliminada con exito',
              'success'
            )
          })
        }
      })
    }


  verDetallesDelaOperacion(nroCuenta:number){
    this.router.navigate(['operacion-detalles',nroCuenta]);
  }

  verDetallesDelaReunion(id_reunion:number){
    this.router.navigate(['reunion-detalles',id_reunion]);
  }

  modificarReunion(idReunion:number){
    this.router.navigate(['modificar-reunion',idReunion]);
  }

}
