import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionFormComponent } from './requisition-form.component';

describe('RequisitionFormComponent', () => {
  let component: RequisitionFormComponent;
  let fixture: ComponentFixture<RequisitionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
