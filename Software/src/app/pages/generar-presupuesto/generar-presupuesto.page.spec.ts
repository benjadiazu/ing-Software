import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarPresupuestoPage } from './generar-presupuesto.page';

describe('GenerarPresupuestoPage', () => {
  let component: GenerarPresupuestoPage;
  let fixture: ComponentFixture<GenerarPresupuestoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarPresupuestoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
