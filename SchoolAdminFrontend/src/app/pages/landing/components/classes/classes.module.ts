import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesComponent } from './classes.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnnualPlanningComponent } from "./annual-planning/annual-planning.component";
import { SubjectMaterialComponent } from "./subject-material/subject-material.component";
import { AssignmentsComponent } from "./assignments/assignments.component";



@NgModule({
  declarations: [
    ClassesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
        {
            path: '',
            component: ClassesComponent
        }
    ]),
    AnnualPlanningComponent,
    SubjectMaterialComponent,
    AssignmentsComponent
],
  exports: [
    ClassesComponent
  ]
})
export class ClassesModule { }
