import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './landing-routing.module';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { LandingComponent } from './landing.component';
import { ClassesModule } from './components/classes/classes.module';
import { AttendanceModule } from './components/attendance/attendance.module';
import { StudentsModule } from './components/students/students.module';
import { SubjectsModule } from './components/subjects/subjects.module';
import { TeachersModule } from './components/teachers/teachers.module';

@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    NavbarComponent,
    FooterComponent,
    AttendanceModule,
    ClassesModule,
    DashboardModule,
    StudentsModule,
    SubjectsModule,
    TeachersModule
  ],
  exports: [
    LandingComponent,
    AttendanceModule,
    ClassesModule,
    DashboardModule,
    StudentsModule,
    SubjectsModule,
    TeachersModule,
  ]
})
export class LandingModule { }
