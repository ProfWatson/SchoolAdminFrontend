import { Injectable, signal } from '@angular/core';
import { Class } from '../models/class.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyClassesService {
  // Mock data for classes - this can be replaced with an HTTP request in the future
  private classes: Class[] = [
    { id: 1, name: 'Math 10A', classYear: '2024', grade: '10' },
    { id: 2, name: 'English 8E', classYear: '2024', grade: '8' },
    { id: 3, name: 'History 9B', classYear: '2024', grade: '9' },
    { id: 4, name: 'Science 9A', classYear: '2024', grade: '9' },
    // Add more mock classes as needed
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
