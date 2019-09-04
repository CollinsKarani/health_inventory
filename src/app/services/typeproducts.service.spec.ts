import { TestBed } from '@angular/core/testing';

import { TypeproductsService } from './typeproducts.service';

describe('TypeproductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeproductsService = TestBed.get(TypeproductsService);
    expect(service).toBeTruthy();
  });
});
