import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsComponent } from './subjects.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SubjectsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([ // Set up the child route within this module
      {
        path: '',
        component: SubjectsComponent
      }
    ]),
  ],
  exports: [
    SubjectsComponent
  ]
})
export class SubjectsModule { }
