import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTopBarComponent } from './employee-top-bar.component';

describe('EmployeeTopBarComponent', () => {
  let component: EmployeeTopBarComponent;
  let fixture: ComponentFixture<EmployeeTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeTopBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
