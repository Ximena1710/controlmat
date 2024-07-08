import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { ConsumoHomeComponent } from './components/consumo-home/consumo-home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { AsignacionRolesComponent } from './components/asignacion-roles/asignacion-roles.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ConciliacionComponent } from './components/conciliacion/conciliacion.component';


const routes: Routes =  [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'consumo', component: ConsumoHomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperarContrasena', component: RecuperarContrasenaComponent },
  { path: 'asignacionRol', component: AsignacionRolesComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'conciliacion', component: ConciliacionComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
