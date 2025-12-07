import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanItem } from 'src/app/shared/models/plan-item.model';

@Component({
  selector: 'app-add-plan-item-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close()"></div>

    <div class="modal-content">
      <h3>Add Plan Item</h3>

      <form (ngSubmit)="save()" #form="ngForm">
        <label>
          Title:
          <input type="text" [(ngModel)]="newItem.title" name="title" required />
        </label>

        <label>
          Type:
          <select [(ngModel)]="newItem.type" name="type" required>
            <option value="planned">Planned Work</option>
            <option value="assignment">Assignment</option>
          </select>
        </label>

        <label>
          Start Date:
          <input type="date" [(ngModel)]="newItem.start" name="start" required />
        </label>

        <label>
          End Date:
          <input type="date" [(ngModel)]="newItem.end" name="end" required />
        </label>

        <div class="actions">
          <button type="button" class="cancel" (click)="close()">Cancel</button>
          <button type="submit" [disabled]="!form.valid">Save</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./add-plan-item-modal.component.scss']
})
export class AddPlanItemModalComponent {
  @Output() saveItem = new EventEmitter<PlanItem>();
  @Output() closeModal = new EventEmitter<void>();

  newItem: Partial<PlanItem> = {
    title: '',
    type: 'planned',
    start: '',
    end: '',
  };

  save() {
    const item: PlanItem = {
        id: Date.now(),
        title: this.newItem.title!,
        start: this.newItem.start!,
        end: this.newItem.end!,
        type: this.newItem.type as 'planned' | 'assignment',
        relatedId: 0
    };
    this.saveItem.emit(item);
    this.close();
  }

  close() {
    this.closeModal.emit();
  }
}