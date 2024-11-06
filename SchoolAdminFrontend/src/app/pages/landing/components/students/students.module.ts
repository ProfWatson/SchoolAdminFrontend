import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    StudentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ // Set up the child route within this module
      {
        path: '',
        component: StudentsComponent
      }
    ]),
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
