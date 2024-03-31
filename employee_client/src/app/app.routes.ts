import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'employee', pathMatch: 'full' },
    //{ path: 'home', loadChildren: () => import('../app/employee/employee.module').then(c => c.EmployeeModule) },
    { path: 'employee', loadChildren: () => import('../app/employee/employee.module').then(c => c.EmployeeModule) },
    { path: 'position', loadChildren: () => import('../app/position/position.module').then(c => c.PositionModule) },
    { path: '**', component: NotFoundComponent }
];
