import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReunionDetallesComponent } from './reunion-detalles.component';

describe('ReunionDetallesComponent', () => {
  let component: ReunionDetallesComponent;
  let fixture: ComponentFixture<ReunionDetallesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReunionDetallesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReunionDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
