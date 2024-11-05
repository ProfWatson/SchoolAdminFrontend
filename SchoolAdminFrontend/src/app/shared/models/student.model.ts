export interface Student {
    id: string;                 // Unique identifier
    firstName: string;          // Student's first name
    lastName: string;           // Student's last name
    age: number;                // Student's age
    grade: string;              // Grade level (e.g., "10th Grade")
    email: string;              // Contact email
    enrolledDate: Date;         // Date the student was enrolled
    classId?: string;           // Foreign key to the class, optional if not always assigned
  }