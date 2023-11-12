import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudCotizacionesComponent } from './solicitud-cotizaciones.component';

describe('SolicitudCotizacionesComponent', () => {
  let component: SolicitudCotizacionesComponent;
  let fixture: ComponentFixture<SolicitudCotizacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudCotizacionesComponent]
    });
    fixture = TestBed.createComponent(SolicitudCotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
