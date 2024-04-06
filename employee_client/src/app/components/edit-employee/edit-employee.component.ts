import { Component, Inject } from '@angular/core';
import { AbstractControl,AsyncValidatorFn, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { MatDialogContent } from '@angular/material/dialog'; 
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule} from '@angular/material/dialog';
import { PositionService } from '../../services/position.service';
import { Position } from '../../models/position.medel';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule,MatSlideToggleModule,MatButtonModule,MatDialogModule,MatExpansionModule,MatIconModule,MatDialogContent,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatSelectModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
    { provide: DateAdapter, useClass: NativeDateAdapter }
  ]
})
export class EditEmployeeComponent {
  employeeForm: FormGroup;
  positions: Position[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { employee: Employee },
    private _employeeService: EmployeeService,
    private _positionService: PositionService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadPositions();
  }

  initializeForm(): void {
    const employee = this.data.employee;
    this.employeeForm = this.fb.group({
        firstName: [employee.firstName, Validators.required],
        surname: [employee.surname, Validators.required],
        identityNumber: [employee.identityNumber],
        gender: [employee.gender, Validators.required],
        dateOfBirth: [employee.dateOfBirth, [Validators.required, this.ageValidator]],
        beginningOfWork: [employee.beginningOfWork, Validators.required],
        positions: this.fb.array([]) // Initialize positions array, modify if necessary
    });     
   
    // Initialize positions controls with default values
    if (employee.positions && employee.positions.length > 0) {
      employee.positions.forEach(position => {
        this.addPositionControl(position.position.id,position.isAdministrative, position.entryDate);
      });
    } else {
      // Add default position if there are no positions
      this.addPositionControl();
    }
  }  


  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positions') as FormArray;
  }

  ageValidator(control: AbstractControl): ValidationErrors | null {
    const birthDate = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    if (age < 18) {
      return { underage: true };
    }
    return null;
  }


  entryDateValidator: AsyncValidatorFn = (control: AbstractControl): Observable<ValidationErrors | null> => {
    return new Observable(observer => {
      setTimeout(() => {
        const entryDate = new Date(control.value);
        const beginningOfWork = new Date(this.employeeForm.get('beginningOfWork').value);
        if (entryDate < beginningOfWork) {
          observer.next({ invalidEntryDate: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 0);
    });
  };


  loadPositions(): void {
    this._positionService.getAllPositions().subscribe(positions => {
      this.positions = positions;
    }, error => {
      console.error('Error loading positions:', error);
    });
  }

  addPositionControl(positionId: number =null, isAdministrative: boolean = false, entryDate: Date = null): void {
     console.log(positionId, isAdministrative, entryDate); 
    this.positionsFormArray.push(this.fb.group({       
      positionId: [positionId, Validators.required],
      isAdministrative: [isAdministrative, Validators.required],
      entryDate: [entryDate, Validators.required,this.entryDateValidator]
    }))
  }

  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positions.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  

submit(): void {
    if (this.employeeForm.valid) {
        const employeeId = this.data.employee.id;
        this._employeeService.getEmployeeById(employeeId).subscribe((employee: Employee) => {
            const updatedEmployee = {
                ...employee,
                ...this.employeeForm.value
            };
            this._employeeService.updateEmployee(updatedEmployee).subscribe(() => {
                console.log('Employee updated successfully');
                this._snackBar.open('Object updated successfully', 'Close', {
                    duration: 3000, // Set the duration for the snack-bar message
                });
                this.dialogRef.close(true);
            }, error => {
                console.error('Error updating employee:', error);
            });
        }, error => {
            console.error('Error getting employee by ID:', error);
        });
    } else {
        this.employeeForm.markAllAsTouched();
        console.error('Form is not valid');
    }
}

}