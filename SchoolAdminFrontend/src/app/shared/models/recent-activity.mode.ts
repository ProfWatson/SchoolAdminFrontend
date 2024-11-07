export interface RecentActivity {
    id: number;             // Unique ID of the assignment
    subject: string;        // Subject of the assignment (e.g., "Math")
    grade: string;          // Grade level (e.g., "Grade 9")
    assignmentTitle: string; // Assignment title (e.g., "Assignment 1")
    timestamp: Date;        // Timestamp of the activity
    navTag: string;
  }