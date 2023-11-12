import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaProfesionalesComponent } from './busqueda-profesionales.component';

describe('BusquedaProfesionalesComponent', () => {
  let component: BusquedaProfesionalesComponent;
  let fixture: ComponentFixture<BusquedaProfesionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BusquedaProfesionalesComponent]
    });
    fixture = TestBed.createComponent(BusquedaProfesionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
