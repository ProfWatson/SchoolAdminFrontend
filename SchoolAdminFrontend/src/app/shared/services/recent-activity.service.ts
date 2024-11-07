import { Injectable } from '@angular/core';
import { RecentActivity } from '../models/recent-activity.mode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecentActivityService {
  private recentActivities: RecentActivity[] = [
    { id: 1, subject: 'Math', grade: 'Grade 9', assignmentTitle: 'Assignment 1', timestamp: new Date('2024-11-01T10:00:00'), navTag: '' },
    { id: 2, subject: 'Science', grade: 'Grade 8', assignmentTitle: 'Lab Report', timestamp: new Date('2024-10-30T14:30:00'), navTag: '' },
    { id: 3, subject: 'History', grade: 'Grade 10', assignmentTitle: 'Project', timestamp: new Date('2024-10-29T09:45:00'), navTag: '' },
    { id: 4, subject: 'English', grade: 'Grade 7', assignmentTitle: 'Essay', timestamp: new Date('2024-10-28T16:00:00'), navTag: '' },
    { id: 5, subject: 'Art', grade: 'Grade 6', assignmentTitle: 'Sketch', timestamp: new Date('2024-10-27T11:15:00'), navTag: '' },
    { id: 6, subject: 'Math', grade: 'Grade 11', assignmentTitle: 'Quiz 2', timestamp: new Date('2024-10-26T13:10:00'), navTag: '' },
    { id: 7, subject: 'Math', grade: 'Grade 11', assignmentTitle: 'Quiz 2', timestamp: new Date('2024-10-26T13:10:00'), navTag: '' },
  ];

  constructor() {}

  // Get the top 5 recent activities
  getRecentActivities(): Observable<RecentActivity[]> {
    return of(this.recentActivities.slice(0, 5));
  }

  // Method to remove an activity by ID
  removeActivity(activityId: number): Observable<RecentActivity[]> {
    this.recentActivities = this.recentActivities.filter(activity => activity.id !== activityId);
    return of(this.recentActivities.slice(0, 5));  // Return updated list of top 5 activities
  }

  addRecentActivities(): Observable<any> {
    return of(true);
  }
}
