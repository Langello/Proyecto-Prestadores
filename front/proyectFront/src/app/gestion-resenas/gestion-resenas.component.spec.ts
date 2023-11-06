import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionResenasComponent } from './gestion-resenas.component';

describe('GestionResenasComponent', () => {
  let component: GestionResenasComponent;
  let fixture: ComponentFixture<GestionResenasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionResenasComponent]
    });
    fixture = TestBed.createComponent(GestionResenasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
