// Compare this snippet from front/proyectFront/src/app/inicio/inicio.component.ts:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './inicio/inicio.component';
import { BusquedaProfesionalesComponent } from './busqueda-profesionales/busqueda-profesionales.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { SolicitudCotizacionesComponent } from './solicitud-cotizaciones/solicitud-cotizaciones.component';
import { ProgramacionCitasComponent } from './programacion-citas/programacion-citas.component';
import { GestionResenasComponent } from './gestion-resenas/gestion-resenas.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'buscar-profesionales', component: BusquedaProfesionalesComponent },
  { path: 'perfil-usuario/:id', component: PerfilUsuarioComponent },
  { path: 'solicitar-cotizaciones', component: SolicitudCotizacionesComponent },
  { path: 'programar-citas', component: ProgramacionCitasComponent },
  { path: 'gestion-resenas', component: GestionResenasComponent },

  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirecciona a la página de inicio por defecto.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

