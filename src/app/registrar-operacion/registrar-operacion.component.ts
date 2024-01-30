import { OperacionService } from '../operacion.service';
import { Operacion } from '../operacion';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-operacion',
  templateUrl: './registrar-operacion.component.html',
  styleUrls: ['./registrar-operacion.component.css']
})
export class RegistrarOperacionComponent implements OnInit {

  operacion : Operacion = new Operacion();
  constructor(private operacionServicio:OperacionService,private router:Router) { }

  ngOnInit(): void {
  }

  guardarOperacion(){
    this.operacionServicio.registrarOperacion(this.operacion).subscribe(dato => {
      console.log(dato);
      this.irALaListaDeOperaciones();
    },error => console.log(error));
  }

  irALaListaDeOperaciones(){
    this.router.navigate(['/operaciones']);
    swal('Operación registrada',`La Operación ${this.operacion.id_operacion} ha sido registrada con exito`,`success`);
  }

  onSubmit(){
    this.guardarOperacion();
  }
}