import  swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { ReglamentoService } from '../reglamento.service';
import { Reunion } from '../reunion';
import { ActivatedRoute } from '@angular/router';
import { Reglamento } from '../reglamento';

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
  reglamento:Reglamento = new Reglamento();

  
  constructor(private reglamentoService:ReglamentoService,private route:ActivatedRoute,
    private reunionServicio:ReunionService,private router:Router) { }

  ngOnInit(): void {

    this.idOperacion = this.route.snapshot.params['idOperacion'];
    this.obtenerReunionesPorIdOperacion(this.idOperacion)
    this.reunion.conPrestamoInterno='NO';
    this.reglamento.frecuenciaInteresPrestamo='QUINCENAL';
  }


  onsancionesAtrasoSocioChange(value: string) {    
    this.reglamento.sancionesAtrasoSocio = parseFloat(value.replace(/,/g, ''));
  }

  onMinutosToleranciaChange(value: string) {
    this.reglamento.minutosTolerancia = parseFloat(value.replace(/,/g, ''));
  }

  oncantidadlicenciaChange(value: string) {
    this.reglamento.cantidadlicencia = parseFloat(value.replace(/,/g, ''));
  }

  onsancionesAtrasoDirectivaChange(value: string) {
    this.reglamento.sancionesAtrasoDirectiva = parseFloat(value.replace(/,/g, ''));
  }

  onfaltaCuotaAbonadaChange(value: string) {
    this.reglamento.faltaCuotaAbonada = parseFloat(value.replace(/,/g, ''));
  }


  onfaltaCuotaNoAbonadaChange(value: string) {
    this.reglamento.faltaCuotaNoAbonada = parseFloat(value.replace(/,/g, ''));
  }

  onsancionesIncumplimientoPrestamoChange(value: string) {
    this.reglamento.sancionesIncumplimientoPrestamo = parseFloat(value.replace(/,/g, ''));
  }


  onsancionesMalasRelacionesChange(value: string) {
    this.reglamento.sancionesMalasRelaciones = parseFloat(value.replace(/,/g, ''));
  }

  onduracionDirectivaChange(value: string) {
    this.reglamento.duracionDirectiva = parseFloat(value.replace(/,/g, ''));
  }


  formatCurrency(event: any) {
    const value = event.target.value.replace(/\D/g, '');
    if (value) {
      event.target.value = this.numberWithCommas(value);
      this.reglamento.sancionesAtrasoSocio = event.target.value.replace(/,/g, '');
    } else {
      this.reglamento.sancionesAtrasoSocio = 0;
    }
  }

  private numberWithCommas(value: string): string {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }


  validateNumber(event: any) {
    const input = event.target;
    const value = input.value.replace(/[^0-9]/g, '');
    input.value = value;
  }

  formatNumberInput(event: any, field: string) {
    const input = event.target;
    const value = input.value;
    const formattedValue = this.formatNumber(value);
    this.reglamento[field] = formattedValue;
    input.value = formattedValue;
  }

  formatNumber(value: string): string {
    if (!value) return '';
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
      this.nombreGrupo= this.reuniones[0].nombreGrupo;
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


  verDetallesDelReglamento(id_operacion:number){
    this.router.navigate(['reglamento-detalles',id_operacion]);
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
    console.log("Datos de la reunion",this.reuniones);
    this.reglamento.idOperacion=this.idOperacion;
    this.reglamento.horaReunion=this.reunion.horaReunionAgendada;
    this.reglamentoService.registrarReglamento(this.reglamento).subscribe(dato => {
    },error => console.log(error));

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
