import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ScheduleEntry } from 'src/app/shared/models/schedule-entry';
import { ClassroomScheduleService } from 'src/app/shared/services/classroom-schedule.service';

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
export class ClassroomScheduleWidgetComponent implements OnInit{
  // Create a reference for the table's dataSource
  dataSource: ScheduleEntry[] = [];
  isLoading: boolean = false;

  displayedColumns: string[] = ['day', ...Array.from({ length: 8 }, (_, i) => `period${i + 1}`)];

  constructor(private scheduleService: ClassroomScheduleService) {}

  ngOnInit(): void {
    // Call the service to get schedule data
    this.scheduleService.getScheduleData().subscribe(
      (data: ScheduleEntry[]) => {
        this.dataSource = data;
        this.isLoading = false;  // Stop loading after data is received
      },
      (error) => {
        console.error('Error loading schedule data', error);
        this.isLoading = false;  // Stop loading even if there was an error
      }
    );
  }
}
