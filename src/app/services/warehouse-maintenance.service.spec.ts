import { TestBed } from '@angular/core/testing';

import { WarehouseMaintenanceService } from './warehouse-maintenance.service';

describe('WarehouseMaintenanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WarehouseMaintenanceService = TestBed.get(WarehouseMaintenanceService);
    expect(service).toBeTruthy();
  });
});
