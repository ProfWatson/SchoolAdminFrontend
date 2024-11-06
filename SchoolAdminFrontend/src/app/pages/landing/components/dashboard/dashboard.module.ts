import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { RouterModule } from '@angular/router';
import { WidgetComponent } from 'src/app/shared/components/widget/widget.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ // Set up the child route within this module
      {
        path: '',
        component: DashboardComponent
      }
    ]),
    StudentDashboardComponent,
    TeacherDashboardComponent,
    WidgetComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
