import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.scss'
})
export class AssignmentsComponent implements OnChanges {
  @Input() classId!: number | null;
  @Input() gradeSubjectId!: number | null;
  assignments: any[] = [];

  ngOnChanges() {
    if (this.classId) {
      this.loadAssignments(this.classId);
    }
  }

  loadAssignments(classId: number) {
    // Replace with API call later
    this.assignments = [
      { title: 'Essay', dueDate: new Date('2025-02-01') },
      { title: 'Test', dueDate: new Date('2025-03-15') },
    ];
  }
}
