import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { BroadcastMessage } from '../models/broadcast-message.model';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  // Using BehaviorSubject to store the list of broadcast messages
  private broadcastMessagesSubject = new BehaviorSubject<BroadcastMessage[]>([]);
  broadcastMessages$ = this.broadcastMessagesSubject.asObservable();  // Observable to be subscribed to

  // Placeholder for Grades, Subjects, and Classes
  grades = ['Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  subjects = ['English', 'Math', 'Science'];
  classes = ['A', 'B', 'C'];

  mockBroadcasts: BroadcastMessage[] = [
    {
      grade: 'Grade 10',
      subject: '',
      className: '',
      messageTitle: 'Welcome',
      message: 'Welcome to Grade 10! Let’s have an amazing year ahead!',
      dateSent: new Date().toISOString(),
      sender: 'default',
      isFlipped: false
    },
    {
      grade: 'Grade 10',
      subject: 'English',
      className: '',
      messageTitle: 'assignments',
      message: 'English assignments due on Monday. Make sure to submit them on time.',
      dateSent: new Date().toISOString(),
      sender: 'default',
      isFlipped: false
    },
    {
      grade: 'Grade 10',
      subject: 'English',
      className: '8E',
      messageTitle: 'Reminder',
      message: 'Reminder: Your English test is next week!',
      dateSent: new Date().toISOString(),
      sender: 'default',
      isFlipped: false
    },
    {
      grade: 'Grade 11',
      subject: '',
      className: '',
      messageTitle: 'orientation',
      message: 'Grade 11 orientation session on Thursday.',
      dateSent: new Date().toISOString(),
      sender: 'default',
      isFlipped: false
    }
  ];

  constructor() {
    this.broadcastMessagesSubject.next([...this.mockBroadcasts])
  }

  // Method to add a broadcast message
  addBroadcast(broadcast: BroadcastMessage): void {
    console.log(broadcast);
    const currentMessages = this.broadcastMessagesSubject.value;
    this.broadcastMessagesSubject.next([broadcast, ...currentMessages]);
  }

  // Example: method to filter broadcasts (this could be expanded for other use cases)
  getFilteredBroadcasts(grade: string, subject: string, className: string): BroadcastMessage[] {
    return this.broadcastMessagesSubject.value.filter(
      (broadcast) =>
        (grade ? broadcast.grade === grade : true) &&
        (subject ? broadcast.subject === subject : true) &&
        (className ? broadcast.className === className : true)
    );
  }

  getDropdownData(): void {

  }

  createBroadcast(broadcast: BroadcastMessage): Observable<any> {
    return of(true);
    // return this.http.post(this.apiUrl, broadcast);
  }

  getBroadcasts(): void {
    this.broadcastMessagesSubject.next([...this.mockBroadcasts])
    // return this.http.get<Broadcast[]>(this.apiUrl);
  }

  removeBroadcast(id: string): Observable<any> {
    return of(true);
    // return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
