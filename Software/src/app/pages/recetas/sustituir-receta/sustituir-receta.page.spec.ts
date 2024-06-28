import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SustituirRecetaPage } from './sustituir-receta.page';

describe('SustituirRecetaPage', () => {
  let component: SustituirRecetaPage;
  let fixture: ComponentFixture<SustituirRecetaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SustituirRecetaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
