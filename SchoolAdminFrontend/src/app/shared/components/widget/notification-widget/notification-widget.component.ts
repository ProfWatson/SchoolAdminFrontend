import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-notification-widget',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './notification-widget.component.html',
  styleUrl: './notification-widget.component.scss'
})
export class NotificationWidgetComponent {
  
  notifications = [
    { id: 1, message: 'You have a new assignment.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
    { id: 2, message: 'Class is cancelled tomorrow.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
    { id: 3, message: 'Reminder: Submit your homework.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
    { id: 4, message: 'New message from teacher.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
    { id: 5, message: 'Your grades have been updated.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
    { id: 6, message: 'Your grades have been updated.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
    { id: 7, message: 'Your grades have been updated.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
    { id: 8, message: 'Your grades have been updated.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
    { id: 9, message: 'Your grades have been updated.', pinned: false, timestamp: '2024-11-06 10:30 AM', read: false, },
  ];

  // Toggle pinning of a notification
  togglePin(index: number): void {
    this.notifications[index].pinned = !this.notifications[index].pinned;
    // Move pinned notifications to the top of the array
    if (this.notifications[index].pinned) {
      const pinnedNotification = this.notifications.splice(index, 1)[0];
      this.notifications.unshift(pinnedNotification);
    }
    //TODO Update database that notification has been pinned
  }

  // Dismiss a notification
  dismissNotification(index: number): void {
    this.notifications.splice(index, 1);
    //TODO Update database that notification can be removed
  }

  // Mark the notification as read (only if not pinned)
  markAsRead(notification: any) {
    if (!notification.pinned) {
      notification.read = true; // Mark as read when clicked, only if not pinned
    }
    //TODO Update database that notification can be removed
  }
}
