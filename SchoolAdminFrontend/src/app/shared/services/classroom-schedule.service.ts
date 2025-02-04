import { Injectable } from '@angular/core';
import { ScheduleEntry } from '../models/schedule-entry';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassroomScheduleService {

  constructor() { }

  scheduleData: ScheduleEntry[] = [
    {
      day: 'Day 1',
      periods: [
        { subject: 'Math', gradeClass: '10A'},
        { subject: 'Science', gradeClass: '11B'},
        { subject: 'History', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry',  gradeClass: '12C' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
    {
      day: 'Day 2',
      periods: [
        { subject: 'Math', gradeClass: '10A'},
        { subject: 'Science', gradeClass: '11B'},
        { subject: 'History', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry',  gradeClass: '12C' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
    {
      day: 'Day 3',
      periods: [
        { subject: 'Math', gradeClass: '10A'},
        { subject: 'Science', gradeClass: '11B'},
        { subject: 'History', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry',  gradeClass: '12C' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
    {
      day: 'Day 4',
      periods: [
        { subject: 'Math', gradeClass: '10A'},
        { subject: 'Science', gradeClass: '11B'},
        { subject: 'History', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry',  gradeClass: '12C' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
    {
      day: 'Day 5',
      periods: [
        { subject: 'Math', gradeClass: '10A'},
        { subject: 'Science', gradeClass: '11B'},
        { subject: 'History', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Geography', gradeClass: '10E' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry',  gradeClass: '12C' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
  ];

  // Method to get the schedule data
  getScheduleData() {
    return of(this.scheduleData);
  }
}
