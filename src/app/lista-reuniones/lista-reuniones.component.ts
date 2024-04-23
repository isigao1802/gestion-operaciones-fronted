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
  reunion:Reunion = new Reunion();

  
  constructor(private route:ActivatedRoute,private reunionServicio:ReunionService,private router:Router) { }

  ngOnInit(): void {
    this.idOperacion = this.route.snapshot.params['idOperacion'];
    this.obtenerReunionesPorIdOperacion(this.idOperacion)
    this.reunion.conPrestamoInterno='NO';
   
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
      if(this.reuniones[0].horaReunionAgendada !==null){
        console.log("Hora de Reuniones ya fue cargada y es:", this.reuniones[0].horaReunionAgendada);
        this.mostrarBotonAgregarHora = false;
      }

      console.log( "Por Id Operacion:",dato);
      console.log( "Hora de Reuniones:",this.reuniones[0].horaReunionAgendada);
    });
  }

  getColorForConteo(conteoModificacion: number): string {
    if (conteoModificacion > 0) {
      return 'red'; // color rojo para conteo mayor que 0
    }  else {
      return 'black'; // color negro para otros valores de conteo
    }
  }
  
  
  getFontStyleForConteo(conteoModificacion: number): string {
    // Devuelve 'italic' solo si el conteo es > 0
    if (conteoModificacion > 0) {
      return 'italic';
    } else {
      return 'normal'; // Para otros estados, devuelve 'normal'
    }
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


// Nuevo Formulario
  mostrarFormularioAgregarHora: boolean = false;
  mostrarBotonAgregarHora: boolean = true;
  nuevaReunion: any = {};

  // Método para mostrar el formulario
  mostrarFormulario() {
    this.mostrarFormularioAgregarHora = true;
  }

  // Método para guardar la reunión y ocultar el formulario
  guardarReunion_prueba() {
    // Aquí colocas la lógica para guardar la nueva reunión
    // Luego reseteas el formulario y ocultas el formulario
    this.nuevaReunion = {};
    this.mostrarFormularioAgregarHora = false;
  }

  guardarReunion(){
    console.log("Datos de la reunion",this.reuniones[0]);
    this.reunionServicio.actualizarHoraReunion(this.reuniones[0].idOperacion,this.reunion).subscribe(dato => {
      this.irAlaListaDeReuniones();
    },error => console.log(error));
    this.nuevaReunion = {};
    this.mostrarFormularioAgregarHora = false;

  }


  irAlaListaDeReuniones(){
    this.router.navigate(['/operaciones/reuniones/'+ this.reuniones[0].idOperacion]);
    swal('Hora Registrada',`La Hora ha sido registrada con exito`,`success`);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  // Método para cancelar y ocultar el formulario
  cancelar() {
    this.nuevaReunion = {};
    this.mostrarFormularioAgregarHora = false;
  }  


}
