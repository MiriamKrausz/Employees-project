import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EmployeeScreenComponent } from './components/employee-screen/employee-screen.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
const EMPLOYEE_ROUTES: Route[] = [
  { path: '', redirectTo: 'all', pathMatch: 'full' },
  { path: 'all', component: EmployeeScreenComponent },
  { path: 'add', component: AddEmployeeComponent }
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(EMPLOYEE_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeeRoutingModule { }
