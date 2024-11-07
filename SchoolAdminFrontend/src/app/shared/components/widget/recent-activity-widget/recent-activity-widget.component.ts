import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RecentActivity } from 'src/app/shared/models/recent-activity.mode';
import { RecentActivityService } from 'src/app/shared/services/recent-activity.service';

@Component({
  selector: 'app-recent-activity-widget',
  standalone: true,
  imports: [NgFor, DatePipe],
  templateUrl: './recent-activity-widget.component.html',
  styleUrl: './recent-activity-widget.component.scss'
})
export class RecentActivityWidgetComponent {
  recentActivities: RecentActivity[] = [];

  constructor(private recentActivitiesService: RecentActivityService) {}

  ngOnInit(): void {
    this.loadRecentActivities();
  }

  loadRecentActivities(): void {
    this.recentActivitiesService.getRecentActivities().subscribe((data: RecentActivity[]) => {
      this.recentActivities = data;
    });
  }

  // Remove activity and update the list
  removeActivity(activityId: number): void {
    this.recentActivitiesService.removeActivity(activityId).subscribe((updatedActivities: RecentActivity[]) => {
      this.recentActivities = updatedActivities;
    });
  }

  // Navigate to the specific assignment page
  navigateToActivity(activityId: number): void {
    console.log(`Navigating to navtag with ID: ${activityId}`);
    // This can later be replaced with actual navigation logic
  }
}
