import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuNotacreditoComponent } from './menu-notacredito.component';

describe('MenuNotacreditoComponent', () => {
  let component: MenuNotacreditoComponent;
  let fixture: ComponentFixture<MenuNotacreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuNotacreditoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuNotacreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
