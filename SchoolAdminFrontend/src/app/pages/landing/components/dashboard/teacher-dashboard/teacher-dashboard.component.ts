import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClassroomScheduleWidgetComponent } from 'src/app/shared/components/widget/classroom-schedule-widget/classroom-schedule-widget.component';
import { NotificationWidgetComponent } from 'src/app/shared/components/widget/notification-widget/notification-widget.component';
import { WidgetComponent } from 'src/app/shared/components/widget/widget.component';
import { WidgetState } from 'src/app/shared/models/widget-state';
import { DashboardService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [WidgetComponent, NgFor, NgIf, NotificationWidgetComponent, ClassroomScheduleWidgetComponent],
  templateUrl: './teacher-dashboard.component.html',
  styleUrl: './teacher-dashboard.component.scss'
})
export class TeacherDashboardComponent implements OnInit{
  widgetStates: WidgetState[] = [];
  closedWidgets: WidgetState[] = [];

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
}
