import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseMaintenanceComponent } from './warehouse-maintenance.component';

describe('WarehouseMaintenanceComponent', () => {
  let component: WarehouseMaintenanceComponent;
  let fixture: ComponentFixture<WarehouseMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
