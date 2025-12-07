import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlanItem } from 'src/app/shared/models/plan-item.model';
import { AnnualPlanningService } from 'src/app/shared/services/annual-planning.service';
import { ClassStateService, MyClassesService } from 'src/app/shared/services/my-classes.service';
import { AddPlanItemModalComponent } from "../../../../../shared/components/modal/add-plan-item/add-plan-item-modal.component";
import { SnackbarService } from 'src/app/shared/components/snackbar/snackbar.service';
import { SubjectMaterialService } from 'src/app/shared/services/subject-material.service';
import { Class } from 'src/app/shared/models/class.model';
import { GradeSubject } from 'src/app/shared/models/grade-subject.model';

@Component({
  selector: 'app-annual-planning',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule, AddPlanItemModalComponent],
  templateUrl: './annual-planning.component.html',
  styleUrl: './annual-planning.component.scss'
})
export class AnnualPlanningComponent implements OnChanges, OnInit {
@Input() classId!: number | null;
@Input() gradeSubjectId!: number | null;
@Input() gradeSubjects: Record<number, GradeSubject> = {};
@Output() switchTabEvent = new EventEmitter<'planning' | 'material' | 'assignments'>();

  allItems: PlanItem[] = [];
  filteredItems: PlanItem[] = [];
  viewMode: 'list' | 'flow' = 'list';
  today = new Date();
  showAddModal = false;
  allClasses: Class[] = [];

  filters = {
    planned: true,
    assignment: true,
  };

  constructor(
    private planningService: AnnualPlanningService,
    private classState: ClassStateService,
    private myClassesService: MyClassesService,
    private snackbar: SnackbarService,
    private subjectMaterialService: SubjectMaterialService
    ) {}

  ngOnInit() {
    if (this.classId && this.gradeSubjectId) {
      this.loadPlan();
    }

    this.myClassesService.getClasses().subscribe(classes => {
    this.allClasses = classes;
  });
  }

  ngOnChanges() {
    this.loadPlan();
  }

  private loadPlan() {
    if (this.classId && this.gradeSubjectId) {
      this.planningService.getPlanForClass(this.classId, this.gradeSubjectId)
        .subscribe((data) => {
          this.allItems = data;
          this.applyFilters();
        });
    }
  }

  isPast(item: PlanItem): boolean {
    return new Date(item.end) < this.today;
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'list' ? 'flow' : 'list';
  }

  toggleFilter(type: 'planned' | 'assignment') {
    this.filters[type] = !this.filters[type];
    this.applyFilters();
  }

  applyFilters() {
    this.filteredItems = this.allItems.filter((item) => this.filters[item.type]);
  }

  getDuration(start: string, end: string): number {
    const s = new Date(start);
    const e = new Date(end);
    return Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }

  goToLinkedItem(item: PlanItem) {
    if (!item.relatedId) {
      this.snackbar.showError('No related item has been created yet.');
      return;
    }

    console.log(item);
    
    if (item.type === 'planned') {
      const exists = this.subjectMaterialService.exists(this.classId!, item.relatedId);
      if (exists) {
        this.switchTabEvent.emit('material');
        this.subjectMaterialService.focusOnItem(this.classId!, item.relatedId);
      } else {
        this.snackbar.showError('Related Subject Material not found yet.');
      }
    } else if (item.type === 'assignment') {
      // For assignments, you might have an AssignmentService similar to SubjectMaterialService
      // const exists = this.assignmentService.existsAssignment(this.classId!, item.relatedId);
      // if (exists) {
      //   this.assignmentService.focusOnAssignment(this.classId!, item.relatedId);
      // } else {
      //   this.snackbar.showError('Related Assignment not found yet.');
      // }
    }
  }

  deleteItem(item: PlanItem, event: MouseEvent) {
    event.stopPropagation(); // prevent row click
    if (confirm(`Are you sure you want to delete "${item.title}"?`)) {
      this.allItems = this.allItems.filter(i => i.id !== item.id);
      this.applyFilters();
    }
  }

  openCreateModal() {
    this.showAddModal = true;
  }

  handleItemSaved(newItem: PlanItem) {
    this.allItems.push(newItem);
    this.applyFilters();
  }

  handleCloseModal() {
    this.showAddModal = false;
  }
}
