import { NgFor, NgIf, CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
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
export class SubjectMaterialComponent implements OnInit, OnChanges{
  @Input() classId!: number | null;
  @Input() gradeSubjectId!: number | null;
  plannedItems: PlanItem[] = [];
  files: SubjectMaterialFile[] = [];

  grouped: {
    byPlanned: { title: string; id: number; materials: SubjectMaterialFile[] }[];
    general: SubjectMaterialFile[];
  } = { byPlanned: [], general: [] };

  showUploadModal = false;
  private focusSub!: Subscription;

  constructor(
    private planningService: AnnualPlanningService,
    private materialService: SubjectMaterialService
  ) {}

   ngOnInit(): void {
    // Subscribe to focus events
    this.focusSub = this.materialService.focus$.subscribe((event) => {
      if (event && event.classId === this.classId) {
        const el = document.getElementById('material-' + event.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.add('highlight');

          // Remove highlight after 2 seconds
          setTimeout(() => el.classList.remove('highlight'), 2000);
        }
      }
    });
  }

  ngOnChanges() {
    if (!this.classId || !this.gradeSubjectId) return;

    this.planningService.getPlanForClass(this.classId, this.gradeSubjectId).subscribe((plans) => {     
      this.plannedItems = plans;

      this.materialService.getMaterials(this.classId, this.gradeSubjectId).subscribe((files) => {
        this.files = files;
        this.groupMaterial();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.focusSub) {
      this.focusSub.unsubscribe();
    }
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

  //TODO FINISH
  download(item: SubjectMaterialFile) {
    window.open(item.fileUrl, '_blank');
  }

  //TODO FINISH
  preview(item: SubjectMaterialFile) {
    // Optional: open PDF viewer modal
    window.open(item.fileUrl, '_blank');
  }
}
