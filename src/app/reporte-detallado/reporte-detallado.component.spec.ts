import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteDetalladoComponent } from './reporte-detallado.component';

describe('ReporteDetalladoComponent', () => {
  let component: ReporteDetalladoComponent;
  let fixture: ComponentFixture<ReporteDetalladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteDetalladoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteDetalladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
