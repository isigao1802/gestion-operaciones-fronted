import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionDetallesComponent } from './operacion-detalles.component';

describe('OperacionDetallesComponent', () => {
  let component: OperacionDetallesComponent;
  let fixture: ComponentFixture<OperacionDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperacionDetallesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
