import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
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
