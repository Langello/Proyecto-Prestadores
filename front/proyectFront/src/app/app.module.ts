import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { BusquedaProfesionalesComponent } from './busqueda-profesionales/busqueda-profesionales.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { SolicitudCotizacionesComponent } from './solicitud-cotizaciones/solicitud-cotizaciones.component';
import { ProgramacionCitasComponent } from './programacion-citas/programacion-citas.component';
import { GestionResenasComponent } from './gestion-resenas/gestion-resenas.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BusquedaProfesionalesComponent,
    PerfilUsuarioComponent,
    SolicitudCotizacionesComponent,
    ProgramacionCitasComponent,
    GestionResenasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
