import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TeachersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ // Set up the child route within this module
      {
        path: '',
        component: TeachersComponent
      }
    ]),
  ],
  exports: [
    TeachersComponent
  ]
})
export class TeachersModule { }
