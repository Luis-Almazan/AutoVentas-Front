import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoEntregaComponent } from './seguimiento-entrega.component';

describe('SeguimientoEntregaComponent', () => {
  let component: SeguimientoEntregaComponent;
  let fixture: ComponentFixture<SeguimientoEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeguimientoEntregaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeguimientoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
