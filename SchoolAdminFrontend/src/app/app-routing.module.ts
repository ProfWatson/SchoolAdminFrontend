import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'prefix'},
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  { path: 'landing', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule), canActivate: [AuthGuard, RoleGuard], data: { roles: ['Student', 'Teacher', 'Admin'] }},
  { path: 'students', loadChildren: () => import('./pages/students/students.module').then(m => m.StudentsModule), canActivate: [AuthGuard, RoleGuard], data: { roles: ['Student', 'Teacher', 'Admin'] } },
  { path: 'class', loadChildren: () => import('./pages/class/class.module').then(m => m.ClassModule), canActivate: [AuthGuard, RoleGuard], data: { roles: ['Teacher', 'Admin'] } },
  { path: 'teachers', loadChildren: () => import('./pages/teachers/teachers.module').then(m => m.TeachersModule), canActivate: [AuthGuard, RoleGuard], data: { roles: ['Teacher', 'Admin'] } },
  { path: 'attendance', loadChildren: () => import('./pages/attendance/attendance.module').then(m => m.AttendanceModule), canActivate: [AuthGuard, RoleGuard], data: { roles: ['Teacher', 'Admin'] } },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: '**', redirectTo: 'login' } // Redirect to login if the path is not found
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }