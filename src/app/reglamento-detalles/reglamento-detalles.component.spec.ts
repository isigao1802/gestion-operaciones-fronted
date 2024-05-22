import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReglamentoDetallesComponent } from './reglamento-detalles.component';

describe('ReglamentoDetallesComponent', () => {
  let component: ReglamentoDetallesComponent;
  let fixture: ComponentFixture<ReglamentoDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReglamentoDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReglamentoDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
