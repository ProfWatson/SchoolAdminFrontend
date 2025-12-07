import { Component, OnInit, signal, WritableSignal, computed } from '@angular/core';
import { MyClassesService } from 'src/app/shared/services/my-classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit {
  classes: { id: number; name: string }[] = [];
  selectedClass = signal<number | null>(null);
  activeTab: WritableSignal<string> = signal('planning');
  assignments: any[] = []; // All assignments fetched for teacher
  assignmentsForSelectedClass = computed(() => 
    this.assignments.filter(a => a.classId === this.selectedClass())
  );

  constructor(private myClassesService: MyClassesService) {}

  ngOnInit(): void {
    this.myClassesService.getClasses().subscribe(classes => {
      this.classes = classes;
      if (this.classes.length > 0) {
        this.selectedClass.set(this.classes[0].id);
      }
    });

    // For demo — load assignments (replace with API)
    this.assignments = [
      { id: 1, classId: 1, title: 'Term 1 Essay', dueDate: new Date('2025-02-01') },
      { id: 2, classId: 2, title: 'Algebra Test', dueDate: new Date('2025-02-15') },
    ];
  }

  selectClass(classId: number) {
    this.selectedClass.set(classId);
    this.activeTab.set('planning'); // Reset inner tab when switching class
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
