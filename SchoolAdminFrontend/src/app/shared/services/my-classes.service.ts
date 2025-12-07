import { Injectable, signal } from '@angular/core';
import { Class } from '../models/class.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyClassesService {
  // Mock data for classes - this can be replaced with an HTTP request in the future
  private classes: Class[] = [
    { id: 1, name: '10A', classYear: '2025', gradeSubjectId: 22 }, // 10 Math
    { id: 2, name: '10B', classYear: '2025', gradeSubjectId: 22 },
    { id: 3, name: '10A', classYear: '2025', gradeSubjectId: 23 }, // 10 English
    { id: 4, name: '10B', classYear: '2025', gradeSubjectId: 23 },
    { id: 5, name: '11A', classYear: '2025', gradeSubjectId: 29 }, // 11 Math
    { id: 6, name: '11B', classYear: '2025', gradeSubjectId: 29 },
    { id: 7, name: '11A', classYear: '2025', gradeSubjectId: 30 }, // 11 English
    { id: 8, name: '11B', classYear: '2025', gradeSubjectId: 30 },
    { id: 9, name: '12A', classYear: '2025', gradeSubjectId: 36 }, // 12 Math
    { id: 10, name: '12B', classYear: '2025', gradeSubjectId: 36 },
    { id: 11, name: '12A', classYear: '2025', gradeSubjectId: 37 }, // 12 English
    { id: 12, name: '12B', classYear: '2025', gradeSubjectId: 37 },
  ];

  constructor() {}

  // Function to fetch classes linked to a teacher
  getClasses(): Observable<Class[]> {
    // Simulate an HTTP call with `of` which creates an Observable from the array
    return of(this.classes);
  }
}

@Injectable({ providedIn: 'root' })
export class ClassStateService {
  selectedClassId = signal<number | null>(null);
  activeTab = signal<string>('planning');
  highlightedItemId = signal<number | null>(null);
}
