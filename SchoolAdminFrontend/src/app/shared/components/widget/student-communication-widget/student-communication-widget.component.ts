import { DatePipe, NgClass, NgFor, NgIf, NgStyle, SlicePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BroadcastMessage } from 'src/app/shared/models/broadcast-message.model';
import { BroadcastService } from 'src/app/shared/services/broadcast.service';
import { BroadcastPopupComponent } from './broadcast-popup/broadcast-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student-communication-widget',
  standalone: true,
  imports: [NgIf, NgStyle, SlicePipe, FormsModule, NgFor, DatePipe, NgClass],
  templateUrl: './student-communication-widget.component.html',
  styleUrl: './student-communication-widget.component.scss'
})
export class StudentCommunicationWidgetComponent implements OnInit {

  broadcasts: BroadcastMessage[] = [];
  
  constructor(public dialog: MatDialog, private broadcastService: BroadcastService) {}

  ngOnInit(): void {
    // Subscribe to the broadcastMessages$ observable
    this.broadcastService.broadcastMessages$.subscribe(messages => {
      this.broadcasts = messages;
    });
  }

  openBroadcastPopup() {
    const broadcastDialog = this.dialog.open(BroadcastPopupComponent, {
      width: '500px', // Adjust width as needed
      height: '600px' // Adjust height as needed
    });

    // Listen for the dialog close event
    broadcastDialog.afterClosed().subscribe(result => {
      if (result) {
        this.broadcastService.addBroadcast(result);
      } else {
        console.log('Dialog was closed without result');
      }
    });
  }

  // Helper function to determine the background color
  getBroadcastColor(broadcast: BroadcastMessage): string {
    if (broadcast.className) {
      return 'rgba(255, 165, 0, 0.2)'; // Orange for class
    } else if (broadcast.subject) {
      return 'rgba(0, 0, 255, 0.2)'; // Blue for subject
    } else if (broadcast.grade) {
      return 'rgba(0, 255, 0, 0.2)'; // Green for grade
    }
    return 'transparent'; // Default
  }

  toggleFlip(broadcast: any) {
    broadcast.isFlipped = !broadcast.isFlipped;
}
}
