import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AssignmentService } from 'src/app/shared/services/assignment.service';
import { AssignmentMark } from 'src/app/shared/models/assignment-mark.model';
import { AssignmentSection } from 'src/app/shared/models/assignment-section.model';
import { SectionMark } from 'src/app/shared/models/section-mark.model';

interface Student {
  id: number;
  name: string;
}

@Component({
  selector: 'app-student-marks-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-marks-modal.component.html',
  styleUrls: ['./student-marks-modal.component.scss']
})
export class StudentMarksModalComponent implements OnInit {
  @Input() classId!: number | null;
  @Input() gradeSubjectId: number | null = null;
  @Input() assignmentId!: number | null;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveMarks = new EventEmitter<AssignmentMark[]>();

  marksForm: FormGroup = this.fb.group({
    students: this.fb.array([]),
  });

  students: Student[] = [];
  sections: AssignmentSection[] = [];
  loading = true;

  getSectionMarks(student: FormGroup): FormArray {
    return student.get('sectionMarks') as FormArray;
  }

  constructor(private fb: FormBuilder, private assignmentService: AssignmentService) {}

  ngOnInit() {
    if (!this.classId || !this.assignmentId || !this.gradeSubjectId) return;

    this.loading = true;

    // Fetch assignment
    this.assignmentService.getAssignments(this.classId, this.gradeSubjectId).subscribe(assignments => {
      console.log('a1', assignments);
      console.log('a2', this.assignmentId);
      
      
      const assignment = assignments.find(a => a.id === this.assignmentId);
      console.log('a', assignment);
      
      if (!assignment) return;

      this.sections = assignment.sections;
      console.log('b',this.sections);
      

      // Fetch students (for now mocked)
      this.students = this.mockFetchStudents(this.classId!);
      console.log('c',this.students);
      // Fetch existing marks
      this.assignmentService.getMarks(this.classId!, this.assignmentId!).subscribe(existingMarks => {

        // Ensure every student has a SectionMark for every section
        const marksData: AssignmentMark[] = this.students.map(student => {
          const existing = existingMarks.find(m => m.studentId === student.id);

          const sectionMarks: SectionMark[] = this.sections.map(sec => {
            if (existing) {
              const found = existing.sectionMarks.find(sm => sm.sectionId === sec.id);
              return found ?? { id: Math.floor(Math.random() * 100000), sectionId: sec.id, mark: 0 };
            } else {
              return { id: Math.floor(Math.random() * 100000), sectionId: sec.id, mark: 0 };
            }
          });

          return existing
            ? { ...existing, sectionMarks, total: sectionMarks.reduce((sum, sm) => sum + sm.mark, 0) }
            : {
                id: Math.floor(Math.random() * 100000),
                assignmentId: this.assignmentId!,
                studentId: student.id,
                studentname: student.name,
                sectionMarks,
                total: 0
              };
        });

        const studentsArray = this.marksForm.get('students') as FormArray;
        marksData.forEach(m => studentsArray.push(this.createStudentFormGroup(m)));

        this.loading = false;
      });
    });
  }

  get studentsArray(): FormArray<FormGroup> {
    return this.marksForm.get('students') as FormArray<FormGroup>;
  }

  createStudentFormGroup(mark: AssignmentMark): FormGroup {
    const group = this.fb.group({
      studentId: [mark.studentId],
      studentname: [mark.studentname],
      sectionMarks: this.fb.array(
        mark.sectionMarks.map(sm =>
          this.fb.group({
            id: [sm.id],
            sectionId: [sm.sectionId],
            mark: [sm.mark]
          })
        )
      ),
      total: [mark.total]
    });

    // Auto-calculate total whenever section marks change
    (group.get('sectionMarks') as FormArray).valueChanges.subscribe((marks: SectionMark[]) => {
      const total = marks.reduce((sum, m) => sum + Number(m.mark || 0), 0);
      group.get('total')?.setValue(total, { emitEvent: false });
    });

    return group;
  }

  save() {
    const formValue = this.marksForm.value.students;
    const updatedMarks: AssignmentMark[] = formValue.map((s: any) => ({
      id: Math.floor(Math.random() * 100000),
      assignmentId: this.assignmentId!,
      studentId: s.studentId,
      studentname: s.studentname,
      sectionMarks: s.sectionMarks,
      total: s.total
    }));

    this.assignmentService.saveMarks(updatedMarks).subscribe(() => {
      this.saveMarks.emit(updatedMarks);
      this.closeModal.emit();
    });
  }

  cancel() {
    this.closeModal.emit();
  }

  private mockFetchStudents(classId: number): Student[] {
    return [
      { id: 1, name: 'Alice Johnson' },
      { id: 2, name: 'Bob Smith' },
      { id: 3, name: 'Charlie Brown' }
    ];
  }
}
