import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Assignment } from '../models/assignment.model';
import { AssignmentMark } from '../models/assignment-mark.model';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  // In-memory storage
  private assignments: Assignment[] = [];
  private marks: AssignmentMark[] = [];

  // Reactive subjects
  private assignments$ = new BehaviorSubject<Assignment[]>(this.assignments);
  private marks$ = new BehaviorSubject<AssignmentMark[]>(this.marks);

  constructor() {
    this.mockInitialData();
  }

  getAssignments(classId: number, gradeSubjectId: number): Observable<Assignment[]> {
    const filtered = this.assignments.filter(
      (a) => a.classId === classId && a.gradeSubjectId === gradeSubjectId
    );
    return of(filtered);
  }

  saveAssignment(assignment: Assignment): Observable<Assignment> {
    const index = this.assignments.findIndex((a) => a.id === assignment.id);
    if (index >= 0) {
      this.assignments[index] = assignment;
    } else {
      this.assignments.push(assignment);
    }
    this.assignments$.next(this.assignments);
    return of(assignment);
  }

  deleteAssignment(id: number): Observable<boolean> {
    this.assignments = this.assignments.filter((a) => a.id !== id);
    this.assignments$.next(this.assignments);

    this.marks = this.marks.filter((m) => m.assignmentId !== id);
    this.marks$.next(this.marks);

    return of(true);
  }

  getAssignmentsStream(): Observable<Assignment[]> {
    return this.assignments$.asObservable();
  }

  getMarks(classId: number, assignmentId: number): Observable<AssignmentMark[]> {
    const filtered = this.marks.filter(
      (m) => m.assignmentId === assignmentId
    );
    return of(filtered);
  }

  saveMarks(marks: AssignmentMark[]): Observable<AssignmentMark[]> {
    marks.forEach(mark => {
      const index = this.marks.findIndex(m => m.id === mark.id);
      if (index >= 0) {
        this.marks[index] = mark;
      } else {
        this.marks.push(mark);
      }
    });
    this.marks$.next(this.marks);
    return of(marks);
  }

  getMarksStream(): Observable<AssignmentMark[]> {
    return this.marks$.asObservable();
  }

  private mockInitialData() {
    this.assignments = [
      {
        id: 1,
        classId: 1,
        gradeSubjectId: 22,
        name: 'Fractions Test 1',
        dueDate: '2025-12-15',
        weight: 10,
        total: 30,
        sections: [
          { id: 1, name: 'Part A', total: 10 },
          { id: 2, name: 'Part B', total: 20 },
        ],
      },
      {
        id: 2,
        classId: 1,
        gradeSubjectId: 22,
        name: 'Fractions Test 2',
        dueDate: '2025-12-22',
        weight: 15,
        total: 50,
        sections: [
          { id: 3, name: 'Part A', total: 20 },
          { id: 4, name: 'Part B', total: 30 },
        ],
      },
    ];

    this.marks = [
      {
        id: 1,
        assignmentId: 1,
        studentId: 1,
        studentname: 'Alice Johnson',
        sectionMarks: [{id: 1,sectionId: 1, mark: 10},{id: 2,sectionId: 2, mark: 10}],
        total: 15
      },
      {
        id: 2,
        assignmentId: 1,
        studentId: 2,
        studentname: 'Bob Smith',
        sectionMarks: [{id: 3,sectionId: 1,mark: 10},{id: 4,sectionId: 2, mark: 10}],
        total: 20
      }
    ];

    this.assignments$.next(this.assignments);
    this.marks$.next(this.marks);
  }
}
