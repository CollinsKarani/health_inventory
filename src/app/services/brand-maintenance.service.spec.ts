import { TestBed } from '@angular/core/testing';

import { BrandMaintenanceService } from './brand-maintenance.service';

describe('BrandMaintenanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrandMaintenanceService = TestBed.get(BrandMaintenanceService);
    expect(service).toBeTruthy();
  });
});
