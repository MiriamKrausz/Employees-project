
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-add-position',
  standalone:true,
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss'],
  imports:[MatButtonModule,MatDialogModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule]
})
export class AddPositionComponent {
  newPositionName: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddPositionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  addPosition(positionName: string) {
    this.dialogRef.close(positionName);
  }
}