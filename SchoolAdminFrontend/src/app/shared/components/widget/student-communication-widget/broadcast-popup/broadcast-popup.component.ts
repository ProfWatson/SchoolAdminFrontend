import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-broadcast-popup',
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule, 
    ReactiveFormsModule,
    MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule
  ],
  templateUrl: './broadcast-popup.component.html',
  styleUrl: './broadcast-popup.component.scss'
})
export class BroadcastPopupComponent {
  broadcastForm: FormGroup;
  // Example data to populate the dropdowns
  grades: string[] = ['Grade 9', 'Grade 10', 'Grade 11'];
  subjects: string[] = ['English', 'Math', 'Science'];;
  classes: string[] = ['A', 'B', 'C'];
  
  // Variables to hold the selected values
  selectedGrade: string = '';
  selectedSubject: string = '';
  selectedClass: string = '';
  message: string = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BroadcastPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.broadcastForm = this.fb.group({
      grade: ['', Validators.required],
      subject: [''],
      className: [''],
      messageTitle: ['', Validators.required],
      message: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onGradeChange(): void {
    // Depending on the selected grade, update subjects
    if (this.selectedGrade === 'Grade 9') {
      this.subjects = ['Math', 'Science', 'History'];
    } else if (this.selectedGrade === 'Grade 10') {
      this.subjects = ['English', 'Physics', 'Biology'];
    } else {
      this.subjects = ['Chemistry', 'Geography', 'Literature'];
    }
    this.selectedSubject = ''; // Reset subject when grade changes
    this.classes = []; // Reset classes when grade changes
  }

  onSubjectChange(): void {
    // Depending on the selected subject, update classes
    if (this.selectedSubject === 'Math') {
      this.classes = ['9A', '9B', '9C'];
    } else if (this.selectedSubject === 'English') {
      this.classes = ['10A', '10B', '10C'];
    } else {
      this.classes = ['11A', '11B', '11C'];
    }
  }

  onSendBroadcast(): void {
    const broadcast = {
      ...this.broadcastForm.value,
      sender: '',
      date: new Date().toISOString(),
      isFlipped: false
    };
    this.dialogRef.close(broadcast);
  }
}
