import { TestBed } from '@angular/core/testing';

import { ReglamentoInternoService } from './reglamento-interno.service';

describe('ReglamentoInternoService', () => {
  let service: ReglamentoInternoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReglamentoInternoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
