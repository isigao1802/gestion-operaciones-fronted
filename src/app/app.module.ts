import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaOperacionesComponent } from './lista-operaciones/lista-operaciones.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistrarOperacionComponent } from './registrar-operacion/registrar-operacion.component';
import { FormsModule } from '@angular/forms';
import { OperacionDetallesComponent } from './operacion-detalles/operacion-detalles.component';
import { RegistrarReunionComponent } from './registrar-reunion/registrar-reunion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';


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
    MatDatepickerModule,
    NgxMaterialTimepickerModule,
    MatIconModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot(), 
    
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }