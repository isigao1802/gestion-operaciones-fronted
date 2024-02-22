import swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BsDatepickerDirective, BsDatepickerConfig  } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-registrar-reunion',
  templateUrl: './registrar-reunion.component.html',
  styleUrls: ['./registrar-reunion.component.css']
})
export class RegistrarReunionComponent {

  datePickerConfig: Partial<BsDatepickerConfig>;
 
  reunion : Reunion = new Reunion();
  constructor(private reunionServicio:ReunionService,private router:Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-dark-blue' });
   }

  ngOnInit(): void {
  }

  guardarReunion(){
    this.reunionServicio.registrarReunion(this.reunion).subscribe(dato => {
      console.log(dato);
      this.irALaListaDeReuniones();
    },error => console.log(error));
  }

  irALaListaDeReuniones(){
    this.router.navigate(['/reuniones']);
    swal('Reunión registrada',`La Reunión ${this.reunion.id_reunion} ha sido registrada con exito`,`success`);
  }

  onSubmit(){
    this.guardarReunion();
  }

}
