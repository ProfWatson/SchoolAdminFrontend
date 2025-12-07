import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PlanItem } from '../models/plan-item.model';

@Injectable({ providedIn: 'root' })
export class AnnualPlanningService {
  private plans: Record<number, PlanItem[]> = {
    1: [
      { id: 1, title: 'Introduction to Algebra', start: '2025-01-15', end: '2025-01-30', type: 'planned', relatedId: 11 },
      { id: 2, title: 'Assignment 1: Algebra Basics', start: '2025-01-28', end: '2025-02-03', type: 'assignment', relatedId: 101 },
      { id: 3, title: 'Fractions & Decimals', start: '2025-02-05', end: '2025-02-20', type: 'planned', relatedId: 12 },
      { id: 4, title: 'Assignment 2: Fractions Challenge', start: '2025-02-18', end: '2025-02-25', type: 'assignment', relatedId: 102 },
      { id: 5, title: 'Geometry Fundamentals', start: '2025-03-01', end: '2025-03-14', type: 'planned', relatedId: 13 },
      { id: 6, title: 'Assignment 3: Shapes & Angles', start: '2025-03-12', end: '2025-03-18', type: 'assignment', relatedId: 103 },
      { id: 7, title: 'Review & Assessment', start: '2025-11-20', end: '2025-11-25', type: 'planned', relatedId: 14 },
      { id: 7, title: 'Review & Assessment', start: '2025-11-20', end: '2025-12-25', type: 'assignment', relatedId: 15 },
      { id: 7, title: 'Review & Assessment', start: '2025-11-20', end: '2025-12-26', type: 'planned', relatedId: 16 },
      { id: 7, title: 'Review & Assessment', start: '2025-11-20', end: '2025-12-27', type: 'assignment', relatedId: 17 },
      { id: 7, title: 'Review & Assessment', start: '2025-11-20', end: '2025-12-28', type: 'planned', relatedId: 18 },
      { id: 7, title: 'Review & Assessment', start: '2025-11-20', end: '2025-12-29', type: 'planned', relatedId: 19 },
    ],
    2: [
      { id: 1, title: 'Grammar Foundations', start: '2025-01-10', end: '2025-01-25', type: 'planned', relatedId: 21 },
      { id: 2, title: 'Essay Writing Assignment', start: '2025-01-24', end: '2025-02-01', type: 'assignment', relatedId: 201 },
      { id: 3, title: 'Creative Writing Workshop', start: '2025-02-03', end: '2025-02-18', type: 'planned', relatedId: 22 },
      { id: 4, title: 'Short Story Assignment', start: '2025-02-16', end: '2025-02-24', type: 'assignment', relatedId: 202 },
      { id: 5, title: 'Poetry Exploration', start: '2025-02-25', end: '2025-03-10', type: 'planned', relatedId: 23 },
    ],
  };

  getPlanForClass(classId: number) {
    return of(this.plans[classId] ?? []);
  }
}