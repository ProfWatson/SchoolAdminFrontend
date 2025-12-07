import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AssignmentModalComponent } from '../../../../../shared/components/modal/assignment-modal/assignment-modal.component';
import { Assignment } from 'src/app/shared/models/assignment.model';
import { PlanItem } from 'src/app/shared/models/plan-item.model';
import { AssignmentService } from 'src/app/shared/services/assignment.service';
import { StudentMarksModalComponent } from 'src/app/shared/components/modal/student-marks-modal/student-marks-modal.component';
import { AnnualPlanningService } from 'src/app/shared/services/annual-planning.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [FormsModule, CommonModule, AssignmentModalComponent, StudentMarksModalComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.scss'
})
export class AssignmentsComponent implements OnInit, OnChanges{
  @Input() classId!: number | null;
  @Input() gradeSubjectId!: number | null;
  @Input() assignments: Assignment[] = [];
  selectedAssignmentId: number | null = null
  plannedItems: PlanItem[] = [];
  showCreateModal = false;
  showMarksModal = false;

  constructor(private planningService: AnnualPlanningService, private assignmentService: AssignmentService) {}

  ngOnInit() {
    if (this.classId && this.gradeSubjectId) {
      this.loadAssignments();
    }
  }

  ngOnChanges() {
    if (!this.classId || !this.gradeSubjectId) return;

    this.planningService.getPlanForClass(this.classId, this.gradeSubjectId).subscribe((plans) => {
      this.plannedItems = plans;
    });
  }

  loadAssignments() {
    this.assignmentService
      .getAssignments(this.classId!, this.gradeSubjectId!)
      .subscribe((data) => (this.assignments = data));
  }

  handleItemSaved(item: Assignment) {
    this.assignmentService.saveAssignment(item).subscribe((saved) => {
    this.loadAssignments();
    this.closeCreateModal();
  });
    
  }

  deleteAssignment(id: number) {
  this.assignmentService.deleteAssignment(id).subscribe(() => this.loadAssignments());
}

  openCreateModal() {
    this.showCreateModal = true;
  }

  openMarks(assignmentId: number) {
    this.selectedAssignmentId = assignmentId;
    this.showMarksModal = true;
  }

  closeMarksModal() {
    this.showMarksModal = false;
    this.selectedAssignmentId = null;
  }

  getAssignmentStats(a: Assignment) {
    return {
      passRate: 0,
      average: 0,
      completion: 0
    };
  }

    closeCreateModal() {
    this.showCreateModal = false;
  }

}
