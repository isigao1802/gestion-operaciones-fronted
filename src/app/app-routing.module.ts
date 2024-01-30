import { OperacionDetallesComponent } from './operacion-detalles/operacion-detalles.component';
import { ListaOperacionesComponent } from './lista-operaciones/lista-operaciones.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarOperacionComponent } from './registrar-operacion/registrar-operacion.component';
import { CalendarioComponent } from './calendario/calendario.component';

const routes: Routes = [
  {path : 'operaciones',component:ListaOperacionesComponent},
  {path:'',redirectTo:'operaciones',pathMatch:'full'},
  {path : 'registrar-operacion',component : RegistrarOperacionComponent},
  {path : 'operacion-detalles/:nroCuenta',component : OperacionDetallesComponent},
  {path : 'calendario',component : CalendarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
