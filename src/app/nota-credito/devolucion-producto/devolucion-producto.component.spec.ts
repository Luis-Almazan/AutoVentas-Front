import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionProductoComponent } from './devolucion-producto.component';

describe('DevolucionProductoComponent', () => {
  let component: DevolucionProductoComponent;
  let fixture: ComponentFixture<DevolucionProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevolucionProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
