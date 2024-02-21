import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarReunionComponent } from './registrar-reunion.component';

describe('RegistrarReunionComponent', () => {
  let component: RegistrarReunionComponent;
  let fixture: ComponentFixture<RegistrarReunionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrarReunionComponent]
    });
    fixture = TestBed.createComponent(RegistrarReunionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
