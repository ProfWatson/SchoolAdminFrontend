import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlanItem } from 'src/app/shared/models/plan-item.model';
import { Class } from 'src/app/shared/models/class.model';
import { GradeSubject } from 'src/app/shared/models/grade-subject.model';

@Component({
  selector: 'app-add-plan-item-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-plan-item-modal.component.html',
  styleUrls: ['./add-plan-item-modal.component.scss']
})
export class AddPlanItemModalComponent implements OnInit {
  @Input() classes: Class[] = [];
  @Input() currentClassId!: number;
  @Input() gradeSubjects: Record<number, GradeSubject> = {};

  @Output() saveItem = new EventEmitter<PlanItem>();
  @Output() closeModal = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      classId: [null], // null = all classes
      title: ['', Validators.required],
      type: ['planned', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const currentClass = this.classes.find(c => c.id === this.currentClassId);
    if (!currentClass) return;

    const formValue = this.form.value;

    const item: PlanItem = {
      id: Date.now(),
      title: formValue.title,
      type: formValue.type,
      start: formValue.start,
      end: formValue.end,
      classId: formValue.classId, // null = all classes
      gradeSubjectId: currentClass.gradeSubjectId,
      relatedId: 0,
    };

    this.saveItem.emit(item);
    this.close();
  }

  close() {
    this.closeModal.emit();
  }
}
