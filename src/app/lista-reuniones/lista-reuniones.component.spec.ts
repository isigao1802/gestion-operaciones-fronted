import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReunionesComponent } from './lista-reuniones.component';

describe('ListaReunionesComponent', () => {
  let component: ListaReunionesComponent;
  let fixture: ComponentFixture<ListaReunionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaReunionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaReunionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
