import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SubjectMaterialFile } from '../models/subject-material-file';

/**
 * Mock SubjectMaterialService
 * - In-memory store keyed by classId
 * - Replace with real HTTP API when backend is ready
 */
@Injectable({ providedIn: 'root' })
export class SubjectMaterialService {
  // In-memory store: classId -> files[]
  private store: Record<number, SubjectMaterialFile[]> = {
    // Example seed data for class 1 and 2
    1: [
      {
        id: '1001',
        title: 'Introduction to Algebra - Notes',
        fileUrl: '/assets/mock/intro-algebra-notes.pdf',
        uploadedAt: new Date('2025-01-10').toISOString(),
        type: 'notes',
        plannedItemId: 11
      },
      {
        id: '1002',
        title: 'Fractions Worksheet 1',
        fileUrl: '/assets/mock/fractions-worksheet-1.pdf',
        uploadedAt: new Date('2025-02-02').toISOString(),
        type: 'worksheet',
        plannedItemId: 12
      },
      {
        id: '1003',
        title: 'General Practice Pack',
        fileUrl: '/assets/mock/general-practice.zip',
        uploadedAt: new Date('2025-01-05').toISOString(),
        type: 'resource'
      }
    ],
    2: [
      {
        id: '2001',
        title: 'Grammar Foundations - Handout',
        fileUrl: '/assets/mock/grammar-handout.pdf',
        uploadedAt: new Date('2025-01-08').toISOString(),
        type: 'notes',
        plannedItemId: 21
      }
    ]
  };

  constructor() {}

  /** Get all materials for a class */
  getMaterialsForClass(classId: number): Observable<SubjectMaterialFile[]> {
    return of(this.store[classId] ? [...this.store[classId]] : []);
  }

  /**
   * Upload a material (mock)
   * model: { title, type, relatedId, file } where file is a File object (optional for mock)
   * Returns the created SubjectMaterialFile
   */
  uploadMaterial(
    classId: number,
    model: { title: string; type: SubjectMaterialFile['type']; plannedItemId?: number | ''; file?: File | null }
  ): Observable<SubjectMaterialFile> {
    const id = Date.now().toString();
    const fileName = model.file?.name ?? `${model.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;
    // Create a mock file URL. In real app you'd POST the file and get back a URL.
    const fileUrl = `/assets/uploads/${id}_${fileName}`;

    const entry: SubjectMaterialFile = {
      id,
      title: model.title,
      fileUrl,
      uploadedAt: new Date().toISOString(),
      type: model.type,
      plannedItemId: model.plannedItemId ? Number(model.plannedItemId) : undefined
    };

    if (!this.store[classId]) this.store[classId] = [];
    this.store[classId].push(entry);

    return of(entry);
  }

  deleteMaterial(classId: number, materialId: string): Observable<boolean> {
    if (!this.store[classId]) return of(false);

    const before = this.store[classId].length;
    this.store[classId] = this.store[classId].filter((m) => m.id !== materialId);
    const after = this.store[classId].length;
    return of(after < before);
  }

  getMaterialById(materialId: string): Observable<SubjectMaterialFile | undefined> {
    for (const key of Object.keys(this.store)) {
      const found = this.store[Number(key)].find((m) => m.id === materialId);
      if (found) return of(found);
    }
    return of(undefined);
  }
}
