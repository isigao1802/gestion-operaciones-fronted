import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaOperacionesComponent } from './lista-operaciones.component';

describe('ListaOperacionesComponent', () => {
  let component: ListaOperacionesComponent;
  let fixture: ComponentFixture<ListaOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaOperacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
