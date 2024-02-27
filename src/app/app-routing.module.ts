import { OperacionDetallesComponent } from './operacion-detalles/operacion-detalles.component';
import { ListaOperacionesComponent } from './lista-operaciones/lista-operaciones.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarOperacionComponent } from './registrar-operacion/registrar-operacion.component';
import { RegistrarReunionComponent } from './registrar-reunion/registrar-reunion.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  { path: 'operaciones', component: ListaOperacionesComponent },
  { path: 'operaciones/registrar-reunion/:id_operacion', component: RegistrarReunionComponent },
  { path: 'registrar-operacion', component: RegistrarOperacionComponent },
  { path: 'registrar-reunion', component: RegistrarReunionComponent },
  { path: 'operacion-detalles/:nroCuenta', component: OperacionDetallesComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'operaciones', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

