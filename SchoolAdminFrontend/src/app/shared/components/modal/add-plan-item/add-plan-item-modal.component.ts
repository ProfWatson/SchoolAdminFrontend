import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
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
  @Input() editItem: PlanItem | null = null;
  @Input() classes: Class[] = [];
  @Input() currentClassId!: number | null;
  @Input() gradeSubjects: Record<number, GradeSubject> = {};

  @Output() saveItem = new EventEmitter<PlanItem>();
  @Output() closeModal = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  startBeforeEndValidator(group: AbstractControl): ValidationErrors | null {
  const start = group.get('start')?.value;
  const end = group.get('end')?.value;

  if (!start || !end) {
    return null; // leave required validation to built-in Validators
  }

  const startDate = new Date(start);
  const endDate = new Date(end);

  return startDate <= endDate ? null : { startAfterEnd: true };
}

  ngOnInit(): void {
    this.form = this.fb.group({
      classId: [null], 
      title: ['', Validators.required],
      type: ['planned', Validators.required],
      start: ['', Validators.required],
      end: ['', Validators.required],
    }, { validators: this.startBeforeEndValidator });

    if (this.editItem) {
    this.form.patchValue({
      classId: this.editItem.classId,
      title: this.editItem.title,
      type: this.editItem.type,
      start: this.editItem.start,
      end: this.editItem.end
    });
  }
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
      id: this.editItem ? this.editItem.id : Date.now(),
      title: formValue.title,
      type: formValue.type,
      start: formValue.start,
      end: formValue.end,
      classId: formValue.classId,
      gradeSubjectId: currentClass.gradeSubjectId,
      relatedId: this.editItem ? this.editItem.relatedId : 0,  
    };
    this.saveItem.emit(item);
    this.close();
  }

  close() {
    this.closeModal.emit();
  }
}
