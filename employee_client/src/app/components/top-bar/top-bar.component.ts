import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeService } from '../../services/employee.service';
import { MatSidenavModule } from '@angular/material/sidenav';


@Component({
  standalone:true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule,MatSidenavModule],
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent{
  showFiller = false;
constructor(private _employeeService: EmployeeService){}
  downloadToexcel(): void {
    this._employeeService.exportEmployeesToExcel().subscribe({
      next: () => {
        console.log("Download completed");
      },
      error: (err) => {
        console.error("Error downloading:", err);
      }
    });
  }
}
