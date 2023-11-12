import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { BusquedaProfesionalesComponent } from './pages/busqueda-profesionales/busqueda-profesionales.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { SolicitudCotizacionesComponent } from './pages/solicitud-cotizaciones/solicitud-cotizaciones.component';
import { ProgramacionCitasComponent } from './pages/programacion-citas/programacion-citas.component';
import { GestionResenasComponent } from './pages/gestion-resenas/gestion-resenas.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    BusquedaProfesionalesComponent,
    PerfilUsuarioComponent,
    SolicitudCotizacionesComponent,
    ProgramacionCitasComponent,
    GestionResenasComponent,
    SobreNosotrosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
