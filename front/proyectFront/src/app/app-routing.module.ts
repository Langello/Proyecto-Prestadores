// Compare this snippet from front/proyectFront/src/app/inicio/inicio.component.ts:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';
import { BusquedaProfesionalesComponent } from './pages/busqueda-profesionales/busqueda-profesionales.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { SolicitudCotizacionesComponent } from './pages/solicitud-cotizaciones/solicitud-cotizaciones.component';
import { ProgramacionCitasComponent } from './pages/programacion-citas/programacion-citas.component';
import { GestionResenasComponent } from './pages/gestion-resenas/gestion-resenas.component';
import { SobreNosotrosComponent } from './pages/sobre-nosotros/sobre-nosotros.component';


const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'buscar-profesionales', component: BusquedaProfesionalesComponent },
  { path: 'perfil-usuario/:id', component: PerfilUsuarioComponent },
  { path: 'solicitar-cotizaciones', component: SolicitudCotizacionesComponent },
  { path: 'programar-citas', component: ProgramacionCitasComponent },
  { path: 'gestion-resenas', component: GestionResenasComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },

  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirecciona a la página de inicio por defecto.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

