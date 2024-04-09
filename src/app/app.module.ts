import { NgModule, LOCALE_ID  } from '@angular/core';
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
import { MatNativeDateModule, MAT_DATE_LOCALE  } from '@angular/material/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { CalendarModule, DatePickerModule, TimePickerModule, DateRangePickerModule, DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { ListaReunionesComponent } from './lista-reuniones/lista-reuniones.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ListarTareasComponent } from './listar-tareas/listar-tareas.component';
import { CommonModule } from '@angular/common';
import { ModificarReunionComponent } from './modificar-reunion/modificar-reunion.component';
import { DatePipe } from '@angular/common';
import { FormatoFechaDirective } from './directives/formato-fecha.directive'; 
import { AuthService } from './auth.service';
import { FullCalendarModule } from '@fullcalendar/angular';


registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ListaOperacionesComponent,
    RegistrarOperacionComponent,
    OperacionDetallesComponent,
    RegistrarReunionComponent,
    ListaReunionesComponent,
    ModificarReunionComponent,
    FormatoFechaDirective,
    ListarTareasComponent, 
    CalendarioComponent,
    
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
    NgbModule, 
    CalendarModule, 
    DatePickerModule, 
    TimePickerModule, 
    DateRangePickerModule, 
    DateTimePickerModule,
    CommonModule,
    FullCalendarModule,
    
  ],
  providers: [MatDatepickerModule,
    DatePipe,AuthService,
  { provide: MAT_DATE_LOCALE, useValue: 'es' },],
  bootstrap: [AppComponent]
})
export class AppModule { }