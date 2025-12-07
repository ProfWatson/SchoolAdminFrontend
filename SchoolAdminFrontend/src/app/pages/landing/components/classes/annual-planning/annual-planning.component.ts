import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlanItem } from 'src/app/shared/models/plan-item.model';
import { AnnualPlanningService } from 'src/app/shared/services/annual-planning.service';
import { ClassStateService } from 'src/app/shared/services/my-classes.service';
import { AddPlanItemModalComponent } from "../../../../../shared/components/modal/add-plan-item/add-plan-item-modal.component";

@Component({
  selector: 'app-annual-planning',
  standalone: true,
  imports: [NgFor, FormsModule, CommonModule, AddPlanItemModalComponent],
  templateUrl: './annual-planning.component.html',
  styleUrl: './annual-planning.component.scss'
})
export class AnnualPlanningComponent implements OnChanges {
@Input() classId!: number | null;
  allItems: PlanItem[] = [];
  filteredItems: PlanItem[] = [];
  viewMode: 'list' | 'flow' = 'list';
  today = new Date();
  showAddModal = false;

  filters = {
    planned: true,
    assignment: true,
  };

  constructor(
    private planningService: AnnualPlanningService,
    private classState: ClassStateService
    ) {}

  ngOnChanges() {
    if (this.classId) {
      this.planningService.getPlanForClass(this.classId).subscribe((data) => {
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
    if (this.isPast(item)) return; // disable navigation for past items
    const tab = item.type === 'assignment' ? 'assignments' : 'material';
    this.classState.activeTab.set(tab);
    this.classState.highlightedItemId.set(item.relatedId!);
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
