import swal from 'sweetalert2';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';
import { BsDatepickerDirective, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Operacion } from '../operacion';
import { OperacionService } from '../operacion.service';

@Component({
  selector: 'app-registrar-reunion',
  templateUrl: './registrar-reunion.component.html',
  styleUrls: ['./registrar-reunion.component.css']
})
export class RegistrarReunionComponent {
  datePickerConfig: Partial<BsDatepickerConfig>;
  reunion: Reunion = new Reunion();
  operacion: Operacion = new Operacion();
  id_operacion:number;

  @ViewChild('fecha_reunion', {static: false}) fechaReunionPicker: BsDatepickerDirective;

  constructor(private reunionServicio: ReunionService, private router: Router,
    private operacionService: OperacionService, private route:ActivatedRoute ) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
    this.reunion.fechaDeReunion = new Date(); 
  }

  ngOnInit(): void {
    this.id_operacion = this.route.snapshot.params['id_operacion'];
    this.operacionService.obtenerOperacionPorId(this.id_operacion).subscribe(dato =>{
      console.log(dato);
      this.operacion = dato;
      this.reunion.nombre_grupo=this.operacion.nombre_grupo;
      this.reunion.nro_cuenta_grupo = this.operacion.nro_cuenta_cliente;
      this.reunion.asesor = this.operacion.asesor;
      this.reunion.id_operacion=this.operacion.id_operacion;
    },error => console.log(error));
  }

  showCalendar() {
    console.log('Mostrar calendario');
    if (this.fechaReunionPicker) {
      this.fechaReunionPicker.show();
    }
  }

  guardarReunion() {
    this.reunionServicio.registrarReunion(this.reunion).subscribe(
      dato => {
        console.log(dato);
        this.irALaListaDeReuniones();
      },
      error => console.log(error)
    );
  }

  irALaListaDeReuniones() {
    this.router.navigate(['/reuniones']);
    swal('Reunión registrada', `La Reunión ${this.reunion.id_reunion} ha sido registrada con éxito`, `success`);
  }

  onSubmit() {
    this.guardarReunion();
  }
}
