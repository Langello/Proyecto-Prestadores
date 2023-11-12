import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-busqueda-profesionales',
  templateUrl: './busqueda-profesionales.component.html',
  styleUrls: ['./busqueda-profesionales.component.css']
})
export class BusquedaProfesionalesComponent {
  constructor(private router: Router) {}

  navegarABusquedaProfesionales() {
    this.router.navigate(['/buscar-profesionales']);
  }
}
