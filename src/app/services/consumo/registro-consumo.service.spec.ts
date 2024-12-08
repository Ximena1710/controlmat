import { TestBed } from '@angular/core/testing';

import { RegistroConsumoService } from './registro-consumo.service';

describe('RegistroConsumoService', () => {
  let service: RegistroConsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroConsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
