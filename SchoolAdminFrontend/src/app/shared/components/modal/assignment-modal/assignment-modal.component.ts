import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Assignment } from 'src/app/shared/models/assignment.model';
import { AssignmentSection } from 'src/app/shared/models/assignment-section.model';
import { PlanItem } from 'src/app/shared/models/plan-item.model';

@Component({
  selector: 'app-assignment-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assignment-modal.component.html',
  styleUrls: ['./assignment-modal.component.scss']
})
export class AssignmentModalComponent implements OnInit{
  @Input() assignment: Assignment | null = null;
  @Input() classId: number | null = null;
  @Input() gradeSubjectId: number | null = null;
  @Input() plannedItems: PlanItem[] = [];
  @Output() saveItem = new EventEmitter<Assignment>();
  @Output() closeModal = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.assignment?.id ?? crypto.randomUUID()],
      name: [this.assignment?.name ?? '', Validators.required],
      dueDate: [this.assignment?.dueDate ?? '', Validators.required],
      weight: [this.assignment?.weight ?? 0, Validators.required],
      total: [this.assignment?.total ?? 0],
      sections: this.fb.array([]),
      plannedItemId: [this.assignment?.plannedItemId ?? '', Validators.required],
    });

    if (this.assignment?.sections?.length) {
      this.assignment.sections.forEach(s => this.addSection(s));
    }

    this.updateTotal();
  }

  get sectionsArray(): FormArray<FormGroup> {
    return this.form.get('sections') as FormArray<FormGroup>;
  }

  createSection(section?: AssignmentSection): FormGroup {
    return this.fb.group({
      id: [section?.id ?? crypto.randomUUID()],
      name: [section?.name ?? '', Validators.required],
      total: [section?.total ?? 0, [Validators.required, Validators.min(1)]]
    });
  }

  addSection(section?: AssignmentSection) {
    this.sectionsArray.push(this.createSection(section));
    this.updateTotal();
  }

  removeSection(i: number) {
    this.sectionsArray.removeAt(i);
    this.updateTotal();
  }

  updateTotal() {
    const sum = this.sectionsArray.controls
      .reduce((acc, ctrl) => acc + (ctrl.get('total')?.value ?? 0), 0);

    this.form.get('total')?.setValue(sum, { emitEvent: false });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.value;

    const item: Assignment = {
      classId: this.classId ?? 0,
      gradeSubjectId: this.gradeSubjectId ?? 0,
      id: v.id,
      name: v.name,
      weight: v.weight,
      total: v.total,
      dueDate: v.dueDate,
      sections: v.sections
    };

    this.saveItem.emit(item);
    this.closeModal.emit();
  }
}
