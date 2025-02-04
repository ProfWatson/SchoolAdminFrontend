import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/shared/models/student.model';
import { ClassService } from 'src/app/shared/services/class.service';
import { MyClassesService } from 'src/app/shared/services/my-classes.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  classes: any[] = [];
  students: Student[] = [];
  selectedClassId: number | null = null;
  selectedDate: string = new Date().toISOString().split('T')[0]; // Default to today
  attendanceRecords: { [studentId: number]: boolean | null } = {};

  constructor(private classService: ClassService, private myClassesService: MyClassesService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses(): void {
    // Fetch classes for the logged-in teacher
    // this.classService.getClassesForTeacher(1).subscribe(classes => {
    //   this.classes = classes;
    // });
    this.myClassesService.getClasses().subscribe(classes => {
      this.classes = classes;
    });
  }

  loadStudents(): void {
    if (!this.selectedClassId) return;
    this.classService.getStudentsForClass(this.selectedClassId).subscribe(students => {
      this.students = students;
      this.attendanceRecords = {}; // Reset records
    });
  }

  submitAttendance(): void {
    const attendanceData = Object.keys(this.attendanceRecords).map(studentId => ({
      studentId: Number(studentId),
      present: this.attendanceRecords[Number(studentId)],
      date: this.selectedDate,
      classId: this.selectedClassId
    }));

    console.log('Submitting Attendance:', attendanceData);
    // API call to save attendance can be added here
  }
}