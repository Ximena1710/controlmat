import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { InsumosComponent } from './components/insumos/insumos.component';
import { RegistroConsumoComponent } from './components/registro-consumo/registro-consumo.component';
import { ConsumoHomeComponent } from './components/consumo-home/consumo-home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/recuperar-contrasena/recuperar-contrasena.component';
import { AsignacionRolesComponent } from './components/asignacion-roles/asignacion-roles.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import {ConciliacionComponent } from './components/conciliacion/conciliacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    InsumosComponent,
    RegistroConsumoComponent,
    ConsumoHomeComponent,
    RegistroComponent,
    RecuperarContrasenaComponent,
    AsignacionRolesComponent,
    ReportesComponent,
    ConciliacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
