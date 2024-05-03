import  swal  from 'sweetalert2';
import { OperacionService } from '../operacion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operacion } from '../operacion';
import { ReunionService } from '../reunion.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-operacion-detalles',
  templateUrl: './operacion-detalles.component.html',
  styleUrls: ['./operacion-detalles.component.css']
})
export class OperacionDetallesComponent implements OnInit {

  nroCuenta:number;
  operacion:Operacion;
  constructor(private location: Location, private route:ActivatedRoute,private operacionServicio:OperacionService, private reunionService:ReunionService) { }

  ngOnInit(): void {
    this.nroCuenta = this.route.snapshot.params['nroCuenta'];
    this.operacion = new Operacion();
    this.operacionServicio.obtenerOperacionPorId(this.nroCuenta).subscribe(dato => {
      this.operacion = dato;
      //swal(`Detalles de la Operación ${this.operacion.nro_cuenta_cliente}`);
    });
  }

  cancelar(): void {
    this.location.back();
  }

}

