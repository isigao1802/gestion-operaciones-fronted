import  swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';

@Component({
  selector: 'app-lista-reuniones',
  templateUrl: './lista-reuniones.component.html',
  styleUrls: ['./lista-reuniones.component.css']
})
export class ListaReunionesComponent implements OnInit{

  reuniones:Reunion[];

  constructor(private reunionServicio:ReunionService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerReuniones();
  }

  actualizarReunion(id:number){
    this.router.navigate(['actualizar-operacion',id]);
  }

  private obtenerReuniones(){
    this.reunionServicio.obtenerListaDeReuniones().subscribe(dato => {
      this.reuniones = dato;
      console.log(dato);
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
}
