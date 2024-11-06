import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClassroomScheduleService {

  constructor() { }

  scheduleData: any = {
    // Sample data for each day and period with placeholders
    'Monday': {
      1: { subject: 'Assembly'},
      2: { subject: 'LO Hall'},
      3: { subject: 'ENG', gradeClass: '8 E', roomNumber: '103' }, // Only two fields
      4: { subject: 'Geography', gradeClass: '8 E', roomNumber: '103'  }, // Only subject
      5: { subject: 'Geography', gradeClass: '8 E', roomNumber: '103'  }, // Only room number
      6: { subject: 'Geography', gradeClass: '8 E', roomNumber: '103'  }, // Only room number
      7: { subject: 'Geography', gradeClass: '8 E', roomNumber: '103'  }, // Only room number
      8: { subject: 'Geography', gradeClass: '8 E', roomNumber: '103'  }, // Only room number
    },
    // Add other days similarly
  };
}
