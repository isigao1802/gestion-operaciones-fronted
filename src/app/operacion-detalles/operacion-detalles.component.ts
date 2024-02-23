import  swal  from 'sweetalert2';
import { OperacionService } from '../operacion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operacion } from '../operacion';

@Component({
  selector: 'app-operacion-detalles',
  templateUrl: './operacion-detalles.component.html',
  styleUrls: ['./operacion-detalles.component.css']
})
export class OperacionDetallesComponent implements OnInit {

  nroCuenta:number;
  operacion:Operacion;
  constructor(private route:ActivatedRoute,private operacionServicio:OperacionService) { }

  ngOnInit(): void {
    this.nroCuenta = this.route.snapshot.params['nroCuenta'];
    this.operacion = new Operacion();
    this.operacionServicio.obtenerOperacionPorId(this.nroCuenta).subscribe(dato => {
      this.operacion = dato;
      swal(`Detalles de la Operación ${this.operacion.nro_cuenta_cliente}`);
    });
  }

}
