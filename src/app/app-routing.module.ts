import { OperacionDetallesComponent } from './operacion-detalles/operacion-detalles.component';
import { ListaOperacionesComponent } from './lista-operaciones/lista-operaciones.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrarOperacionComponent } from './registrar-operacion/registrar-operacion.component';
import { RegistrarReunionComponent } from './registrar-reunion/registrar-reunion.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { ListaReunionesComponent } from './lista-reuniones/lista-reuniones.component';
import { ReunionDetallesComponent } from './reunion-detalles/reunion-detalles.component';
import { ModificarReunionComponent } from './modificar-reunion/modificar-reunion.component';
import { ListarTareasComponent } from './listar-tareas/listar-tareas.component';

const routes: Routes = [
  { path: 'operaciones', component: ListaOperacionesComponent },
  {path : 'modificar-reunion/:idReunion',component : ModificarReunionComponent},
  { path: 'reuniones', component: ListaReunionesComponent },
  { path: 'operaciones/reuniones/:idOperacion', component: ListaReunionesComponent },
  { path: 'operaciones/registrar-reunion/:id_operacion', component: RegistrarReunionComponent },
  { path: 'registrar-operacion', component: RegistrarOperacionComponent },
  { path: 'registrar-reunion', component: RegistrarReunionComponent },
  { path: 'operacion-detalles/:nroCuenta', component: OperacionDetallesComponent },
  { path: 'reunion-detalles/:idReunion', component: ReunionDetallesComponent },
  { path: 'operaciones/reuniones/:idOperacion/listar-tareas', component: ListarTareasComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'operaciones', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

