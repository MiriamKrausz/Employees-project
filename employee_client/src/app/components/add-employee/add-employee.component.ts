
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Position } from '../../models/position.medel';
import { EmployeeService } from '../../services/employee.service';
import { PositionService } from '../../services/position.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule,MatInputModule,MatFormFieldModule,MatCheckboxModule,MatExpansionModule,MatIconModule,MatDialogModule,MatButtonModule,MatSelectModule,ReactiveFormsModule,MatDatepickerModule,MatSlideToggleModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
    providers: [
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: DateAdapter, useClass: NativeDateAdapter }
  ]
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  positions: Position[] = [];
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private _employeeService: EmployeeService,
    private _positionService: PositionService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPositions();
  }

  initializeForm(): void {
    this.employeeForm = this.fb.group({
      firstName: ['', Validators.required],
      surname: ['', Validators.required],
      identityNumber: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      beginningOfWork: ['', Validators.required],
      positions: this.fb.array([], Validators.required)
    });
  }

  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positions') as FormArray;
  }
  loadPositions(): void {
    console.log('Before loading positions');
    this._positionService.getAllPositions().subscribe(positions => {
      console.log('Positions loaded successfully:', positions);
      this.positions = positions;
      this.addPositionControl(); // Add initial empty position
    }, error => {
      console.error('Error loading positions:', error);
    });
  }

  addPositionControl(positionId: number = null): void {
    this.positionsFormArray.push(this.fb.group({
      positionId: [positionId, Validators.required],
      isAdministrative: [false, Validators.required],
      entryDate: ['', Validators.required]
    }));
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positions.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }

  submit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      console.log("formData", formData);
      this._employeeService.addEmployee(formData).subscribe(() => {
        console.log('saving');
        this.dialogRef.close(true);    
        // Handle success, e.g., close dialog
      }, error => {
        console.error('Error adding employee:', error);
        // Display server validation errors
        console.log('Server validation errors:', error.error.errors);
      });
    } else {
      this.employeeForm.markAllAsTouched();
      console.error('Form is not valid');
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
  

}
