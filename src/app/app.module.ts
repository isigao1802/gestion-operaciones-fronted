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

@NgModule({
  declarations: [
    AppComponent,
    ListaOperacionesComponent,
    RegistrarOperacionComponent,
    OperacionDetallesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }