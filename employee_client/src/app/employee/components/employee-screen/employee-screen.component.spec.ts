import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeScreenComponent } from './employee-screen.component';

describe('EmployeeScreenComponent', () => {
  let component: EmployeeScreenComponent;
  let fixture: ComponentFixture<EmployeeScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
