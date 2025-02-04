import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http-client.service';
import { Class } from '../models/class.model';
import { Student } from '../models/student.model';
import { Assignment } from '../models/assignment.model';
import { Mark } from '../models/mark.model';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private httpService: HttpService) {}

  // 1. Get classes for the logged-in teacher
  getClassesForTeacher(teacherId: number): Observable<Class[]> {
    return this.httpService.get<Class[]>(`teachers/${teacherId}/classes`);
  }

  // 2. Get students for a specific class
  getStudentsForClass(classId: number): Observable<Student[]> {
    return this.httpService.get<Student[]>(`classes/${classId}/students`);
  }

  // 3. Get assignments for a specific class
  getAssignmentsForClass(classId: number): Observable<Assignment[]> {
    return this.httpService.get<Assignment[]>(`classes/${classId}/assignments`);
  }

  // 4. Add a new assignment to a class
  addAssignment(classId: number, assignment: Assignment): Observable<Assignment> {
    return this.httpService.post<Assignment>(`classes/${classId}/assignments`, assignment);
  }

  // 5. Update an existing assignment
  updateAssignment(classId: number, assignment: Assignment): Observable<Assignment> {
    return this.httpService.put<Assignment>(`classes/${classId}/assignments/${assignment.id}`, assignment);
  }

  // 6. Delete an assignment
  deleteAssignment(classId: number, assignmentId: number): Observable<void> {
    return this.httpService.delete<void>(`classes/${classId}/assignments/${assignmentId}`);
  }

  // 7. Get marks for a specific assignment in a class
  getMarksForAssignment(classId: number, assignmentId: number): Observable<Mark[]> {
    return this.httpService.get<Mark[]>(`classes/${classId}/assignments/${assignmentId}/marks`);
  }

  // 8. Update a student's mark for an assignment
  updateMark(classId: number, assignmentId: number, studentId: number, mark: Mark): Observable<Mark> {
    return this.httpService.put<Mark>(`classes/${classId}/assignments/${assignmentId}/marks/${studentId}`, mark);
  }
}
