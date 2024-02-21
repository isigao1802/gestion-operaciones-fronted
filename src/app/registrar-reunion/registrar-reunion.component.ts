import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';
import { FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrar-reunion',
  templateUrl: './registrar-reunion.component.html',
  styleUrls: ['./registrar-reunion.component.css']
})
export class RegistrarReunionComponent {


  reunion : Reunion = new Reunion();
  constructor(private reunionServicio:ReunionService,private router:Router) { }

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
