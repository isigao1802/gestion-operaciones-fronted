import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAuditoriaComponent } from './listar-auditoria.component';

describe('ListarAuditoriaComponent', () => {
  let component: ListarAuditoriaComponent;
  let fixture: ComponentFixture<ListarAuditoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarAuditoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarAuditoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
