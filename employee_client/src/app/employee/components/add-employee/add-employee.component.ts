// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Position } from '../../../models/position.medel';
// import { MatDialogRef } from '@angular/material/dialog';
// import { EmployeeService } from '../../employee.service';
// import { PositionService } from '../../../position/position.service';

// @Component({
//   selector: 'app-add-employee',
//   templateUrl: './add-employee.component.html',
//   styleUrl: './add-employee.component.scss'
// })
// export class AddEmployeeComponent implements OnInit {
//   employeeForm: FormGroup;
//   positions: Position[] = [];
//   constructor(
//     private fb: FormBuilder,
//     private dialogRef: MatDialogRef<AddEmployeeComponent>,
//     private employeeService: EmployeeService,
//     private positionService: PositionService
//   ) { }

//   ngOnInit(): void {
//     this.initializeForm();
//     this.loadPositions();
//   }

//   initializeForm(): void {
//     this.employeeForm = this.fb.group({

//       firstName: ['', Validators.required],
//       surname: ['', Validators.required],
//       identityNumber: ['', Validators.required],
//       gender: ['', Validators.required],  
//       dateOfBirth: ['', Validators.required],
//       beginningOfWork: ['', Validators.required],
//       isActive: [true, Validators.required],
//       positions: this.fb.array([], Validators.required)
//     });
//   }

//   get positionsFormArray(): FormArray {
//     return this.employeeForm.get('positions') as FormArray;
//   }


//   loadPositions(): void {
//     console.log('Before loading positions');
//     this.positionService.getAllPositions().subscribe(positions => {
//       console.log('Positions loaded successfully:', positions);
//       this.positions = positions;
//       // Add initial empty position
//       this.addPositionControl();
//     }, error => {
//       console.error('Error loading positions:', error);
//     });
//   }

//   // addPositionControl(): void {
//   //   this.positionsFormArray.push(this.fb.group({
//   //     positionId: ['', Validators.required],
//   //     isAdministrative: [false, Validators.required],
//   //     entryDate: ['', Validators.required]
//   //   }));
//   // }
//   typescript
// addPositionControl(positionId: number): void {
//   this.positionsFormArray.push(this.fb.group({
//     positionId: [positionId, Validators.required],  // Set the selected position ID
//     isAdministrative: [false, Validators.required],
//     entryDate: ['', Validators.required]
//   }));
// }


//   removePositionControl(index: number): void {
//     this.positionsFormArray.removeAt(index);
//   }

//   addCustomPosition(): void {
//     // Add your logic here for adding a custom position
//   }

//   submit(): void {
//     if (this.employeeForm.valid) {
//       const formData = this.employeeForm.value;
//       this.employeeService.addEmployee(formData).subscribe(() => {
//         console.error('saving');
//         // Handle success, e.g., close dialog
//         this.dialogRef.close();
//       }, error => {
//         // Handle error
//         console.error('Error adding employee:', error);
//       });
//     } else {
//       // Mark form controls as touched to display validation errors
//       this.employeeForm.markAllAsTouched();
//       console.error('Form is not valid');
//     }
//   }

//   cancel(): void {
//     this.dialogRef.close();
//   }
// }





import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Position } from '../../../models/position.medel';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../../employee.service';
import { PositionService } from '../../../position/position.service';
import { EGender, Employee } from '../../../models/employee.model';
import { EmployeePost } from '../../../models/employee-post.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  employeeForm: FormGroup;
  positions: Position[] = [];
  employee: EmployeePost = {
    firstName: "miriammmmmmmm",
    surname: "a",
    identityNumber: "12",
    gender: "male",
    dateOfBirth: new Date("Mon Apr 01 2024 22:24:35"),
    beginningOfWork: new Date("Mon Apr 01 2024 22:24:35"),
    positions: [
      {
        positionId: 3,
        isAdministrative: false,
        entryDate: new Date(), // אפשר לשנות את התאריך בהתאם לצורך
      },
    ],
  };
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEmployeeComponent>,
    private employeeService: EmployeeService,
    private positionService: PositionService
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
    this.positionService.getAllPositions().subscribe(positions => {
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

  // submit(): void {
  //   if (this.employeeForm.valid) {
  //     const formData = this.employeeForm.value;
  //     console.log("formData", formData);

  //     this.employeeService.addEmployee(formData).subscribe(() => {
  //       console.error('saving');
  //       this.dialogRef.close(); // Handle success, e.g., close dialog
  //     }, error => {
  //       console.error('Error adding employee:', error);
  //     });
  //   } else {
  //     this.employeeForm.markAllAsTouched();
  //     console.error('Form is not valid');
  //   }
  // }
  submit(): void {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;
      console.log("formData", formData);
  
      this.employeeService.addEmployee(formData).subscribe(() => {
        console.error('saving');
        this.dialogRef.close(); // Handle success, e.g., close dialog
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



isPositionDisabled(positionId: number, index: number): boolean {
  const selectedPositions = this.employeeForm.value.positions.map((pos: any) => pos.positionId);
  return selectedPositions.includes(positionId) && selectedPositions.indexOf(positionId) !== index;
}

}
