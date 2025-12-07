import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { GradeSubject } from '../models/grade-subject.model';

@Injectable({ providedIn: 'root' })
export class GradeSubjectService {
  private gradeSubjects: GradeSubject[] = [
  // Grade 7
  { id: 1, grade: '7', subject: 'Math', subjectCode: 'MATH' },
  { id: 2, grade: '7', subject: 'English', subjectCode: 'ENG' },
  { id: 3, grade: '7', subject: 'Science', subjectCode: 'SCI' },
  { id: 4, grade: '7', subject: 'History', subjectCode: 'HIST' },
  { id: 5, grade: '7', subject: 'Geography', subjectCode: 'GEO' },
  { id: 6, grade: '7', subject: 'Art', subjectCode: 'ART' },
  { id: 7, grade: '7', subject: 'Physical Education', subjectCode: 'PE' },

  // Grade 8
  { id: 8, grade: '8', subject: 'Math', subjectCode: 'MATH' },
  { id: 9, grade: '8', subject: 'English', subjectCode: 'ENG' },
  { id: 10, grade: '8', subject: 'Science', subjectCode: 'SCI' },
  { id: 11, grade: '8', subject: 'History', subjectCode: 'HIST' },
  { id: 12, grade: '8', subject: 'Geography', subjectCode: 'GEO' },
  { id: 13, grade: '8', subject: 'Art', subjectCode: 'ART' },
  { id: 14, grade: '8', subject: 'Physical Education', subjectCode: 'PE' },

  // Grade 9
  { id: 15, grade: '9', subject: 'Math', subjectCode: 'MATH' },
  { id: 16, grade: '9', subject: 'English', subjectCode: 'ENG' },
  { id: 17, grade: '9', subject: 'Science', subjectCode: 'SCI' },
  { id: 18, grade: '9', subject: 'History', subjectCode: 'HIST' },
  { id: 19, grade: '9', subject: 'Geography', subjectCode: 'GEO' },
  { id: 20, grade: '9', subject: 'Art', subjectCode: 'ART' },
  { id: 21, grade: '9', subject: 'Physical Education', subjectCode: 'PE' },

  // Grade 10
  { id: 22, grade: '10', subject: 'Math', subjectCode: 'MATH' },
  { id: 23, grade: '10', subject: 'English', subjectCode: 'ENG' },
  { id: 24, grade: '10', subject: 'Science', subjectCode: 'SCI' },
  { id: 25, grade: '10', subject: 'History', subjectCode: 'HIST' },
  { id: 26, grade: '10', subject: 'Geography', subjectCode: 'GEO' },
  { id: 27, grade: '10', subject: 'Art', subjectCode: 'ART' },
  { id: 28, grade: '10', subject: 'Physical Education', subjectCode: 'PE' },

  // Grade 11
  { id: 29, grade: '11', subject: 'Math', subjectCode: 'MATH' },
  { id: 30, grade: '11', subject: 'English', subjectCode: 'ENG' },
  { id: 31, grade: '11', subject: 'Physics', subjectCode: 'PHYS' },
  { id: 32, grade: '11', subject: 'Chemistry', subjectCode: 'CHEM' },
  { id: 33, grade: '11', subject: 'Biology', subjectCode: 'BIO' },
  { id: 34, grade: '11', subject: 'History', subjectCode: 'HIST' },
  { id: 35, grade: '11', subject: 'Geography', subjectCode: 'GEO' },

  // Grade 12
  { id: 36, grade: '12', subject: 'Math', subjectCode: 'MATH' },
  { id: 37, grade: '12', subject: 'English', subjectCode: 'ENG' },
  { id: 38, grade: '12', subject: 'Physics', subjectCode: 'PHYS' },
  { id: 39, grade: '12', subject: 'Chemistry', subjectCode: 'CHEM' },
  { id: 40, grade: '12', subject: 'Biology', subjectCode: 'BIO' },
  { id: 41, grade: '12', subject: 'History', subjectCode: 'HIST' },
  { id: 42, grade: '12', subject: 'Geography', subjectCode: 'GEO' },
];


  constructor() {}

  getAllGradeSubjects(): Observable<GradeSubject[]> {
    return of(this.gradeSubjects);
  }

  getGradeSubjectById(id: number): Observable<GradeSubject | undefined> {
    return of(this.gradeSubjects.find(gs => gs.id === id));
  }

  getGradeSubjectsByGrade(grade: string): Observable<GradeSubject[]> {
    return of(this.gradeSubjects.filter(gs => gs.grade === grade));
  }

  getGradeSubjectsBySubject(subject: string): Observable<GradeSubject[]> {
    return of(this.gradeSubjects.filter(gs => gs.subject === subject));
  }
}
