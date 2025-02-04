import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarWidgetComponent } from 'src/app/shared/components/widget/calendar-widget/calendar-widget.component';
import { ClassroomScheduleWidgetComponent } from 'src/app/shared/components/widget/classroom-schedule-widget/classroom-schedule-widget.component';
import { MyClassesWidgetComponent } from 'src/app/shared/components/widget/my-classes-widget/my-classes-widget.component';
import { NotificationWidgetComponent } from 'src/app/shared/components/widget/notification-widget/notification-widget.component';
import { RecentActivityWidgetComponent } from 'src/app/shared/components/widget/recent-activity-widget/recent-activity-widget.component';
import { StudentCommunicationWidgetComponent } from 'src/app/shared/components/widget/student-communication-widget/student-communication-widget.component';
import { TodoListWidgetComponent } from 'src/app/shared/components/widget/todo-list-widget/todo-list-widget.component';
import { WidgetComponent } from 'src/app/shared/components/widget/widget.component';
import { WidgetState } from 'src/app/shared/models/widget-state';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [
    WidgetComponent, 
    NgFor, 
    NgIf, 
    NotificationWidgetComponent, 
    ClassroomScheduleWidgetComponent, 
    NgClass,
    CalendarWidgetComponent,
    MyClassesWidgetComponent,
    RecentActivityWidgetComponent,
    TodoListWidgetComponent,
    StudentCommunicationWidgetComponent
  ],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.scss',
})
export class TeacherDashboardComponent implements OnInit{
  widgetStates: WidgetState[] = [];
  closedWidgets: WidgetState[] = [];

  // Initial state for the drawer
  isDrawerOpen: boolean = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.widgetStates$.subscribe(widgetStates => {
      this.widgetStates = widgetStates;
      this.closedWidgets = widgetStates.filter(widget => !widget.isVisible);
    });
  }
  
  closeWidget(id: number): void {
    this.dashboardService.closeWidget(id);
  }

  reopenWidget(id: number): void {
    this.dashboardService.reopenWidget(id);
  }

  updateWidget(widget: WidgetState): void {
    this.dashboardService.updateWidget(widget);
  }

  // Toggle the drawer open/closed
  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
    this.dashboardService.widgetStates$.subscribe(widgetStates => {
      this.closedWidgets = widgetStates.filter(widget => !widget.isVisible);
    });
  }

  resetWidgets(): void {
    this.dashboardService.resetWidgets();
  }
}
