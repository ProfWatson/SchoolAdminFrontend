import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ScheduleEntry } from 'src/app/shared/models/schedule-entry';

@Component({
  selector: 'app-classroom-schedule-widget',
  standalone: true,
  imports: [
    NgFor, 
    NgIf,
    CommonModule, 
    MatTableModule,
  ],
  templateUrl: './classroom-schedule-widget.component.html',
  styleUrl: './classroom-schedule-widget.component.scss'
})
export class ClassroomScheduleWidgetComponent {
  displayedColumns: string[] = ['day', ...Array.from({ length: 8 }, (_, i) => `period${i + 1}`)];
  scheduleData: ScheduleEntry[] = [
    {
      day: 'Day 1',
      periods: [
        { subject: 'Math', gradeClass: '10A', roomNumber: '101' },
        { subject: 'Science', gradeClass: '11B', roomNumber: '102' },
        { subject: 'History', roomNumber: '103' },
        { subject: 'Geography' },
        { roomNumber: '104' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
    {
      day: 'Day 2',
      periods: [
        { subject: 'Math', gradeClass: '10A', roomNumber: '101' },
        { subject: 'Science', gradeClass: '11B', roomNumber: '102' },
        { subject: 'History', roomNumber: '103' },
        { subject: 'Geography' },
        { roomNumber: '104' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
    {
      day: 'Day 3',
      periods: [
        { subject: 'Math', gradeClass: '10A', roomNumber: '101' },
        { subject: 'Science', gradeClass: '11B', roomNumber: '102' },
        { subject: 'History', roomNumber: '103' },
        { subject: 'Geography' },
        { roomNumber: '104' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
    {
      day: 'Day 4',
      periods: [
        { subject: 'Math', gradeClass: '10A', roomNumber: '101' },
        { subject: 'Science', gradeClass: '11B', roomNumber: '102' },
        { subject: 'History', roomNumber: '103' },
        { subject: 'Geography' },
        { roomNumber: '104' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
    {
      day: 'Day 5',
      periods: [
        { subject: 'Math', gradeClass: '10A', roomNumber: '101' },
        { subject: 'Science', gradeClass: '11B', roomNumber: '102' },
        { subject: 'History', roomNumber: '103' },
        { subject: 'Geography' },
        { roomNumber: '104' },
        { subject: 'Physics', gradeClass: '12C' },
        { subject: 'Chemistry' },
        { subject: 'PE', roomNumber: 'Gym' }
      ]
    },
  ];

  // Create a reference for the table's dataSource
  dataSource = this.scheduleData;

  getCellContent(period: any): string {
    const { subject, gradeClass, roomNumber } = period;
    return [subject, gradeClass, roomNumber].filter(Boolean).join(' | ');
  }
}
