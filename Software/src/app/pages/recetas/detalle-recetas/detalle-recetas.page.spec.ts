import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleRecetasPage } from './detalle-recetas.page';

describe('DetalleRecetasPage', () => {
  let component: DetalleRecetasPage;
  let fixture: ComponentFixture<DetalleRecetasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRecetasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
