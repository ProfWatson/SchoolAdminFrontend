import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialUploadModalComponent } from 'src/app/shared/components/modal/material-upload-modal/material-upload-modal.component';
import { PlanItem } from 'src/app/shared/models/plan-item.model';
import { SubjectMaterialFile } from 'src/app/shared/models/subject-material-file';
import { AnnualPlanningService } from 'src/app/shared/services/annual-planning.service';
import { SubjectMaterialService } from 'src/app/shared/services/subject-material.service';

@Component({
  selector: 'app-subject-material',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    FormsModule,
    MaterialUploadModalComponent
  ],
  templateUrl: './subject-material.component.html',
  styleUrl: './subject-material.component.scss'
})
export class SubjectMaterialComponent implements OnChanges{
  @Input() classId!: number | null;
  plannedItems: PlanItem[] = [];
  files: SubjectMaterialFile[] = [];

  grouped: {
    byPlanned: { title: string; id: number; materials: SubjectMaterialFile[] }[];
    general: SubjectMaterialFile[];
  } = { byPlanned: [], general: [] };

  showUploadModal = false;

  constructor(
    private planningService: AnnualPlanningService,
    private materialService: SubjectMaterialService
  ) {}

  ngOnChanges() {
    if (!this.classId) return;

    this.planningService.getPlanForClass(this.classId).subscribe((plans) => {
      this.plannedItems = plans;

      this.materialService.getMaterialsForClass(this.classId!).subscribe((files) => {
        this.files = files;
        this.groupMaterial();
      });
    });
  }

  groupMaterial() {
    const groupedByPlanned: { [key: number]: SubjectMaterialFile[] } = {};
    const general: SubjectMaterialFile[] = [];

    for (const file of this.files) {
      if (file.plannedItemId) {
        if (!groupedByPlanned[file.plannedItemId]) groupedByPlanned[file.plannedItemId] = [];
        groupedByPlanned[file.plannedItemId].push(file);
      } else {
        general.push(file);
      }
    }

    this.grouped.byPlanned = Object.keys(groupedByPlanned).map((id) => {
      const related = this.plannedItems.find((p) => p.relatedId === Number(id));

      return {
        id: Number(id),
        title: related ? related.title : 'Linked Lesson',
        materials: groupedByPlanned[Number(id)],
      };
    });

    this.grouped.general = general;
  }

  openUploadModal() {
    this.showUploadModal = true;
  }

  closeUploadModal() {
    this.showUploadModal = false;
  }

  handleUploaded() {
    this.closeUploadModal();
    this.ngOnChanges(); // reload list
  }

  download(item: SubjectMaterialFile) {
    window.open(item.fileUrl, '_blank');
  }

  preview(item: SubjectMaterialFile) {
    // Optional: open PDF viewer modal
    window.open(item.fileUrl, '_blank');
  }

}
