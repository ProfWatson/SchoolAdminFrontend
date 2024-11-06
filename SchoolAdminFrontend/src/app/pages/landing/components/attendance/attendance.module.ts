import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ // Set up the child route within this module
      {
        path: '',
        component: AttendanceComponent
      }
    ]),
  ],
  exports: [
    AttendanceComponent
  ]
})
export class AttendanceModule { }
