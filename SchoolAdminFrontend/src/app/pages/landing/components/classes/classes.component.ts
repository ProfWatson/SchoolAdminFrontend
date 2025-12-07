import { Component, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { Class } from 'src/app/shared/models/class.model';
import { GradeSubject } from 'src/app/shared/models/grade-subject.model';
import { GradeSubjectService } from 'src/app/shared/services/grade-subject.service';
import { MyClassesService } from 'src/app/shared/services/my-classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: Class[] = [];
  selectedClass = signal<number | null>(null);
  selectedGradeSubject = signal<number | null>(null);
  activeTab: WritableSignal<string> = signal('planning');
  assignments: any[] = []; // All assignments fetched for teacher
  assignmentsForSelectedClass = computed(() => 
    this.assignments.filter(a => a.classId === this.selectedClass())
  );
  gradeSubjects: Record<number, GradeSubject> = {};

  constructor(private myClassesService: MyClassesService, private gradeSubjectService: GradeSubjectService) {}

  ngOnInit(): void {
    this.gradeSubjectService.getAllGradeSubjects().subscribe(gsList => {
      this.gradeSubjects = gsList.reduce((acc, gs) => {
        acc[gs.id] = gs;
        return acc;
      }, {} as Record<number, GradeSubject>);
    });

    this.myClassesService.getClasses().subscribe(classes => {
      this.classes = classes;
      if (this.classes.length > 0) {
        this.selectedClass.set(this.classes[0].id);
        this.selectedGradeSubject.set(this.classes[0].gradeSubjectId);
      }
    });
  }

  getSubjectCode(classItem: Class): string {
    return this.gradeSubjects[classItem.gradeSubjectId]?.subjectCode ?? '';
  }

  selectClass(classId: number) {
  this.selectedClass.set(classId);

  // Find the class object
  const selected = this.classes.find(c => c.id === classId);
  if (selected) {
    // Get the gradeSubjectId from the selected class
    this.selectedGradeSubject.set(selected.gradeSubjectId);
  } else {
    this.selectedGradeSubject.set(null);
  }

  // Reset inner tab when switching class
  this.activeTab.set('planning');
}


  switchTab(tabName: string) {
    this.activeTab.set(tabName);
  }

  getSelectedClassName(): string {
    const current = this.classes.find(c => c.id === this.selectedClass());
    return current ? current.name : '';
  }

  openAssignmentModal() {
    console.log(`Add assignment for class ${this.selectedClass()}`);
    // TODO: open modal logic
  }
}
