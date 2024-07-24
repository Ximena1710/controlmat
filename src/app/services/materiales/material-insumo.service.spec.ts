import { TestBed } from '@angular/core/testing';

import { MaterialInsumoService } from './material-insumo.service';

describe('MaterialInsumoService', () => {
  let service: MaterialInsumoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialInsumoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
