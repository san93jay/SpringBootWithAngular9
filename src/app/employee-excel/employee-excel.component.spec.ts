import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeExcelComponent } from './employee-excel.component';

describe('EmployeeExcelComponent', () => {
  let component: EmployeeExcelComponent;
  let fixture: ComponentFixture<EmployeeExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
