import { Component, Inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // import for snackbar
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
import { DateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import { AddPositionComponent } from '../add-position/add-position.component';


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
  newPositionName:string="other";

  constructor(
    private dialog: MatDialog,
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

  // Function to initialize form
  initializeForm(): void {
    const employee = this.data.employee;
    this.employeeForm = this.fb.group({
      firstName: [employee.firstName, [Validators.required,Validators.pattern(/^[א-ת\u0590-\u05FEa-zA-Z]{2,}$/)]],
      surname: [employee.surname, [Validators.required,Validators.pattern(/^[א-ת\u0590-\u05FEa-zA-Z]{2,}$/)]],
      identityNumber: [employee.identityNumber],
      gender: [employee.gender, Validators.required],
      dateOfBirth: [employee.dateOfBirth, [Validators.required, this.ageValidator()]],
      beginningOfWork: [employee.beginningOfWork,  [Validators.required,this.beginningOfWorkValidator()]],
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

  // Function to add a position control to the form array
  addPositionControl(positionId: number = null, isAdministrative: boolean = false, entryDate: Date = null): void {
    this.positionsFormArray.push(this.fb.group({       
      positionId: [positionId, Validators.required],
      isAdministrative: [isAdministrative, Validators.required],
      entryDate: [entryDate, [Validators.required, this.entryDateValidator()]]
    }));
  }

  // Getter for positions form array
  get positionsFormArray(): FormArray {
    return this.employeeForm.get('positions') as FormArray;
  }

  // Age validator function
  ageValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      return age >= 18 ? null : { 'underage': true };
    };
  }

    // Beginning of work date validator function
    beginningOfWorkValidator() {
      return (control: AbstractControl): { [key: string]: any } | null => {
        const workDate = new Date(control.value);
        const birthDate = new Date(this.employeeForm?.get('dateOfBirth').value);
        console.log("workDate", workDate, "birthDate", birthDate);    
        return workDate >= birthDate ? null : { 'beginningOfWorkInvalid': true };
      };
    }
  
  
  // Entry date validator function
  entryDateValidator() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const entryDate = new Date(control.value);
      const workDate = new Date(this.employeeForm?.get('beginningOfWork').value);
      const birthDate = new Date(this.employeeForm?.get('dateOfBirth').value);     
  
      // בדיקה אם תאריך הכניסה לעבודה קודם מתאריך הלידה
      if (entryDate < birthDate) {
        return { 'entryDateBeforeBirthDate': true };
      }
  
      // בדיקה אם תאריך הכניסה לעבודה קודם מתאריך ההתחלה בעבודה
      if (entryDate < workDate) {
        return { 'entryDateBeforeWorkDate': true };
      }
  
      return null;
    };
  }

  // Function to load positions from service
  loadPositions(): void {
    this._positionService.getAllPositions().subscribe(positions => {
      this.positions = positions;
    });
  }

  // Function to remove a position control from the form array
  removePositionControl(index: number): void {
    this.positionsFormArray.removeAt(index);
  }

  // Function to check if a position is disabled
  isPositionDisabled(positionId: number, index: number): boolean {
    const selectedPositions = this.employeeForm.value.positions.map((pos: any) => pos.positionId);
    return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
  }



  openOtherPositionDialog() {
    const dialogRef = this.dialog.open(AddPositionComponent, {
      width: '250px'
    });
  
    dialogRef.afterClosed().subscribe(newPositionName => {
      if (newPositionName) {
        const newPosition: Position = {
          id: 0,
          name: newPositionName
        };
        this._positionService.addPosition(newPosition).subscribe((res) => {
          // לאחר שהתפקיד נוסף בהצלחה, הוסף אותו גם למערך positions
          this.positions.push(res); // הוסף את האובייקט עם id ו-name מעודכנים
          // עדכן את אפשרויות הבחירה, כולל הערך שנבחר
          const positionsFormArray = this.employeeForm.get('positions') as FormArray;
          positionsFormArray.controls.forEach(control => {
            control.patchValue({ positionId: res.id });
          });
        });
      }
    });
  }
  // Function to handle form submission
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
          this.openSnackBar('Employee updated successfully'); // Open snackbar on success
          this.dialogRef.close(true);
        }, error => {
          console.error('Error updating employee:', error);
          this.openSnackBar('Error updating employee'); // Open snackbar on error
        });
      }, error => {
        console.error('Error getting employee by ID:', error);
        this.openSnackBar('Error getting employee by ID'); // Open snackbar on error
      });
    } else {
      this.employeeForm.markAllAsTouched();
      console.error('Form is not valid');
      this.openSnackBar('Form is not valid'); // Open snackbar if form is not valid
    }
  }

  // Function to open snackbar
  openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'end', // Positioning the snackbar
      verticalPosition: 'bottom'
    });
  }


    // Function to handle cancellation
    cancel(): void {
      this.dialogRef.close();
    }
  
}
