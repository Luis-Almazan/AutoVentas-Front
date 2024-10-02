import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoEntregaComponent } from './ingreso-entrega.component';

describe('IngresoEntregaComponent', () => {
  let component: IngresoEntregaComponent;
  let fixture: ComponentFixture<IngresoEntregaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresoEntregaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
