import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent {
  constructor(private router: Router) {}

  navegarASolicitudCotizaciones() {
    this.router.navigate(['/solicitar-cotizaciones']);
  }
}
