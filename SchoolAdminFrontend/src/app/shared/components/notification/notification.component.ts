import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-notification',
  template: `
    <div *ngIf="message" class="notification-popup">
      {{ message }}
    </div>
  `,
  styles: [`
    .notification-popup {
      position: fixed;
      top: 20px;
      right: 20px;
      background-color: rgba(255, 0, 0, 0.8);
      color: white;
      padding: 10px;
      border-radius: 5px;
      z-index: 1000;
    }
  `],
    standalone: true,
    imports: [NgIf]
})
export class NotificationComponent implements OnInit {
  message: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.notification$.subscribe(msg => {
      this.message = msg;
      setTimeout(() => this.message = null, 3000); // Automatically hide after 3 seconds
    });
  }
}