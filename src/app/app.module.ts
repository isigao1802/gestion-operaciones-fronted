import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaOperacionesComponent } from './lista-operaciones/lista-operaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarOperacionComponent } from './registrar-operacion/registrar-operacion.component';
import { FormsModule } from '@angular/forms';
import { OperacionDetallesComponent } from './operacion-detalles/operacion-detalles.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { RegistrarReunionComponent } from './registrar-reunion/registrar-reunion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { from } from 'rxjs';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    ListaOperacionesComponent,
    RegistrarOperacionComponent,
    OperacionDetallesComponent,
    RegistrarReunionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    MatMomentDateModule, 
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatIconModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }