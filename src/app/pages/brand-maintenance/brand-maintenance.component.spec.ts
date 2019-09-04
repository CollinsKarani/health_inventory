import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandMaintenanceComponent } from './brand-maintenance.component';

describe('BrandMaintenanceComponent', () => {
  let component: BrandMaintenanceComponent;
  let fixture: ComponentFixture<BrandMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
