import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { PlanItem } from 'src/app/shared/models/plan-item.model';
import { SubjectMaterialService } from 'src/app/shared/services/subject-material.service';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-material-upload-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgFor],
  templateUrl: './material-upload-modal.component.html',
  styleUrls: ['./material-upload-modal.component.scss']
})
export class MaterialUploadModalComponent {
  @Input() classId!: number;
  @Input() plannedItems: PlanItem[] = [];
  @Input() gradeSubjectId: number | null = null;

  @Output() close = new EventEmitter();
  @Output() uploaded = new EventEmitter();

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    type: new FormControl<'worksheet' | 'notes' | 'textbook' | 'resource'>(
      'worksheet',
      Validators.required
    ),
    plannedItemId: new FormControl<number | ''>(''),
    file: new FormControl<File | null>(null, Validators.required)
  });

  constructor(private materialService: SubjectMaterialService, private snackbar: SnackbarService) {}

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    if (files.length > 1) {
      this.form.get('file')?.setErrors({ multiple: true });
      this.form.patchValue({ file: null });
      return;
    }

    this.form.patchValue({ file: files[0] });
    this.form.get('file')?.updateValueAndValidity();
  }

  upload() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, type, plannedItemId, file } = this.form.value;

    if (!this.gradeSubjectId) return;
    const payload = {
      title: title ?? '',
      type: type ?? 'worksheet',
      plannedItemId: Number(plannedItemId) ?? undefined,
      file: file!,
      classId: this.classId,
      gradeSubjectId: this.gradeSubjectId
    };
    this.materialService
      .uploadMaterial(payload)
      .subscribe(() => {
        this.snackbar.showSuccess('Uploaded successfully!');
        this.uploaded.emit()
  });
  }
}
