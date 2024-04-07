
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup,ValidationErrors,Validators } from '@angular/forms';
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
import { Observable, of } from 'rxjs';

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
  errors: string[] = [];

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
      identityNumber: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required,this.ageValidator],
      beginningOfWork: ['', Validators.required],
      positions: this.fb.array([], Validators.required)
    });
  }

  addPositionControl(): void {
    this.positionsFormArray.push(this.fb.group({
      positionId: ['',Validators.required],
      isAdministrative: [false],
      entryDate: ['',[Validators.required, this.entryDateValidator()]]
    }));
  }
  // addPositionControl(): void {
  //   this.positionsFormArray.push(this.fb.group({
  //     positionId: ['', Validators.required],
  //     isManagement: [false],
  //     entryDate: ['', [Validators.required, this.entryDateValidator()]]}));
  // }
  

 ageValidator(control: AbstractControl): 
  Observable<ValidationErrors | null> {
  const birthDate = new Date(control.value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
    // Emit an object with a validation error.
      return of({ underage: true});
    }
    // Emit null, to indicate no error occurred.
    return of(null);
  }

  // ageValidator() {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const birthDate = new Date(control.value);
  // const today = new Date();
  // const age = today.getFullYear() - birthDate.getFullYear();
  //     return age >= 18 ? null : { 'underage': true };
  //   };
  // }

  // entryDateAfterWorkDateValidator(control: AbstractControl): 
  // Observable<ValidationErrors | null> {
  //   const workDate = (control.root as FormGroup).get('beginningOfWork')?.value;
  //   const entryDate = control.value;
  //   console.log("workDate",workDate);
  //   console.log("entryDate",entryDate);
  //     if (workDate && entryDate && workDate.getTime() > entryDate.getTime()) {
  //   // Emit an object with a validation error.
  //     return of({ entryDateBeforeWorkDate: true});
  //   }
  //   // Emit null, to indicate no error occurred.
  //   return of(null);
  // }

  entryDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDate = new Date(control.value);
      const workDate = new Date(this.employeeForm.get('beginningOfWork').value);
      return entryDate >= workDate ? null : { 'entryDateInvalid': true };
    };
  }
  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positions') as FormArray;
  }

  loadPositions(): void {
    this._positionService.getAllPositions().subscribe(positions => {
      this.positions = positions;
      this.addPositionControl(); // Add initial empty position
    });
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
      }, error => {
        if (error.status === 400) {
          this.errors = error.error.errors;
        }
        console.error('Error adding employee:', error);
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










