import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnulacionVentasComponent } from './anulacion-ventas.component';

describe('AnulacionVentasComponent', () => {
  let component: AnulacionVentasComponent;
  let fixture: ComponentFixture<AnulacionVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnulacionVentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnulacionVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
