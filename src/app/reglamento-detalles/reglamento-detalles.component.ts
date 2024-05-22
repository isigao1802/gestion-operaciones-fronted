import { OperacionService } from '../operacion.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReglamentoInternoService } from '../reglamento-interno.service';
import { Reglamento } from '../reglamento';
import { DatePipe } from '@angular/common';
import { Location } from '@angular/common';

@Component({
  selector: 'app-reglamento-detalles',
  templateUrl: './reglamento-detalles.component.html',
  styleUrl: './reglamento-detalles.component.css'
})

export class ReglamentoDetallesComponent implements OnInit{

  idReglamento:number;
  reglamento:Reglamento;
  constructor(private location: Location, private datePipe: DatePipe, private route:ActivatedRoute,private operacionServicio:OperacionService, private reglamentoService:ReglamentoInternoService) { }


  ngOnInit(): void {
    this.idReglamento = this.route.snapshot.params['idReglamento'];
    this.reglamento = new Reglamento();
    this.reglamentoService.obtenerReglamentoPorIdOperacion(this.idReglamento).subscribe(dato => {
    this.reglamento = dato;
      //swal(`Detalles de la Reunión N° <strong>${this.reunion.idReunion}</strong>`);
    });
  }

  cancelar(): void {
    this.location.back();
  }




}
