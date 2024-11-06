import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Student', 'Teacher', 'Admin'] },
      },
      {
        path: 'students',
        loadChildren: () => import('./components/students/students.module').then(m => m.StudentsModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Student', 'Teacher', 'Admin'] },
        pathMatch: 'full'
      },
      {
        path: 'class',
        loadChildren: () => import('./components/classes/classes.module').then(m => m.ClassesModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Teacher', 'Admin'] },
        pathMatch: 'full'
      },
      {
        path: 'teachers',
        loadChildren: () => import('./components/teachers/teachers.module').then(m => m.TeachersModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Teacher', 'Admin'] },
        pathMatch: 'full'
      },
      {
        path: 'attendance',
        loadChildren: () => import('./components/attendance/attendance.module').then(m => m.AttendanceModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Teacher', 'Admin'] },
        pathMatch: 'full'
      },
      {
        path: 'subjects',
        loadChildren: () => import('./components/subjects/subjects.module').then(m => m.SubjectsModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Teacher', 'Admin'] },
        pathMatch: 'full'
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default child route
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {}