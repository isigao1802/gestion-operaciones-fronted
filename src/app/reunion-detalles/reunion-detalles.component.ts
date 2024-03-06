import  swal  from 'sweetalert2';
import { OperacionService } from '../operacion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Operacion } from '../operacion';
import { ReunionService } from '../reunion.service';
import { Reunion } from '../reunion';



@Component({
  selector: 'app-reunion-detalles',
  templateUrl: './reunion-detalles.component.html',
  styleUrl: './reunion-detalles.component.css'
})
export class ReunionDetallesComponent implements OnInit{

  
  idReunion:number;
  reunion:Reunion;
  constructor(private route:ActivatedRoute,private operacionServicio:OperacionService, private reunionService:ReunionService) { }


  ngOnInit(): void {
    this.idReunion = this.route.snapshot.params['idReunion'];
    this.reunion = new Reunion();
    this.reunionService.obtenerReunionPorId(this.idReunion).subscribe(dato => {
      this.reunion = dato;
      console.log(dato);
      console.log(this.reunion);
      swal(`Detalles de la Reunión ${this.reunion.idReunion}`);
    });
  }

}
