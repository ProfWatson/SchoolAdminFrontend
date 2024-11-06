import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-classroom-schedule-widget',
  standalone: true,
  imports: [NgFor],
  templateUrl: './classroom-schedule-widget.component.html',
  styleUrl: './classroom-schedule-widget.component.scss'
})
export class ClassroomScheduleWidgetComponent {
  schedule = [
    { day: 'Monday', subject: 'Math', time: '9:00 AM' },
    { day: 'Tuesday', subject: 'English', time: '10:00 AM' },
    { day: 'Wednesday', subject: 'Science', time: '11:00 AM' },
    { day: 'Thursday', subject: 'History', time: '1:00 PM' },
    { day: 'Friday', subject: 'Geography', time: '2:00 PM' }
  ];
}
