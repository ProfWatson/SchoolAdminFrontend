import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PlanItem } from '../models/plan-item.model';

@Injectable({ providedIn: 'root' })
export class AnnualPlanningService {
  private plans: PlanItem[] = [
    // Class-specific plans
    { id: 1, title: 'Introduction to Algebra', start: '2025-01-15', end: '2025-01-30', type: 'planned', relatedId: 11, classId: null, gradeSubjectId: 22 },
    { id: 2, title: 'Assignment 1: Algebra Basics', start: '2025-01-28', end: '2025-02-03', type: 'assignment', relatedId: 101, classId: null, gradeSubjectId: 22 },
    { id: 3, title: 'Fractions & Decimals', start: '2025-02-05', end: '2025-02-20', type: 'planned', relatedId: 12, classId: null, gradeSubjectId: 22 },
    { id: 4, title: 'Assignment 2: Fractions Challenge', start: '2025-02-18', end: '2025-02-25', type: 'assignment', relatedId: 102, classId: null, gradeSubjectId: 22 },

    { id: 5, title: 'Grammar Foundations', start: '2025-01-10', end: '2025-01-25', type: 'planned', relatedId: 21, classId: 3, gradeSubjectId: 23 },
    { id: 6, title: 'Essay Writing Assignment', start: '2025-01-24', end: '2025-02-01', type: 'assignment', relatedId: 201, classId: 3, gradeSubjectId: 23 },

    // Grade-subject-wide plans (applies to all classes in that grade-subject)
    { id: 1001, title: 'Common Algebra Intro', start: '2025-01-05', end: '2025-01-12', type: 'planned', relatedId: 999, classId: null, gradeSubjectId: 29 },
    { id: 1002, title: 'Common Essay Skills', start: '2025-01-05', end: '2025-01-12', type: 'planned', relatedId: 998, classId: null, gradeSubjectId: 30 },
  ];

  getPlanForClass(classId: number, gradeSubjectId: number) {
    const filtered = this.plans.filter(p =>
      (p.classId === classId) || (p.classId === null && p.gradeSubjectId === gradeSubjectId)
    );
    return of(filtered);
  }

  addPlanItem(item: PlanItem) {
    this.plans.push(item);
  }

  updatePlanItem(item: PlanItem) {
    const index = this.plans.findIndex(i => i.id === item.id);
    this.plans[index] = item;
    
  }

  removePlanItem(itemId: number) {
    this.plans = this.plans.filter(p => p.id !== itemId);
  }
}