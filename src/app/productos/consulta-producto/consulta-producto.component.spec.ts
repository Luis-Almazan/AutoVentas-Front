import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaProductoComponent } from './consulta-producto.component';

describe('ConsultaProductoComponent', () => {
  let component: ConsultaProductoComponent;
  let fixture: ComponentFixture<ConsultaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
