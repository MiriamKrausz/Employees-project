



import {Routes } from '@angular/router';



import { NotFoundComponent } from './components/not-found/not-found.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: EmployeeListComponent },
  // { path: 'home', component: TopBarComponent},
//   { path: 'add', component: AddEmployeeComponent },
  { path: '**', component: NotFoundComponent }
];


