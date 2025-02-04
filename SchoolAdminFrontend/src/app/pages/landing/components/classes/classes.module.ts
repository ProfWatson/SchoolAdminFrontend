import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClassesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([ // Set up the child route within this module
      {
        path: '',
        component: ClassesComponent
      }
    ]),
  ],
  exports: [
    ClassesComponent
  ]
})
export class ClassesModule { }
