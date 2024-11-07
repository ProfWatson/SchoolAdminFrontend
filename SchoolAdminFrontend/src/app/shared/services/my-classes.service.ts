import { Injectable } from '@angular/core';
import { Class } from '../models/class.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyClassesService {
  // Mock data for classes - this can be replaced with an HTTP request in the future
  private classes: Class[] = [
    { id: 1, name: 'English 8E', classYear: '2024', grade: '8' },
    { id: 2, name: 'Math 10A', classYear: '2024', grade: '8' },
    { id: 3, name: 'History 9B', classYear: '2024', grade: '8' },
    { id: 4, name: 'Science 7A', classYear: '2024', grade: '8' },
    // Add more mock classes as needed
  ];

  constructor() {}

  // Function to fetch classes linked to a teacher
  getClasses(): Observable<Class[]> {
    // Simulate an HTTP call with `of` which creates an Observable from the array
    return of(this.classes);
  }
}
