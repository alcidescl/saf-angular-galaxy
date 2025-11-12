import { TestBed } from '@angular/core/testing';

import { InfanteService } from './infante.service';

describe('InfanteService', () => {
  let service: InfanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
