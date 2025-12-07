import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SubjectMaterialFile } from '../models/subject-material-file';

@Injectable({ providedIn: 'root' })
export class SubjectMaterialService {

  // Simulating a database table
  private materials: SubjectMaterialFile[] = [];

  // Reactive stream (UI auto-refresh)
  private materials$ = new BehaviorSubject<SubjectMaterialFile[]>(this.materials);
  materialsStream$ = this.materials$.asObservable();

  // Focus
  private _focusSubject = new BehaviorSubject<{ classId: number | null; id: number; type: string } | null>(null);
  focus$ = this._focusSubject.asObservable();

  constructor() {
    this.seedMockData();
  }

  // --------------------------------------------------------
  // GET MATERIALS
  // --------------------------------------------------------
  getMaterials(classId: number | null, gradeSubjectId: number | null): Observable<SubjectMaterialFile[]> {
    const filtered = this.materials.filter(m =>
      (m.classId === classId || m.classId == null) &&
      m.gradeSubjectId === gradeSubjectId
    );

    return of([...filtered]); // simulate HTTP response
  }

  // --------------------------------------------------------
  // UPLOAD / CREATE MATERIAL
  // --------------------------------------------------------
  uploadMaterial(model: {
    title: string;
    type: SubjectMaterialFile['type'];
    classId: number | null;
    gradeSubjectId: number;
    plannedItemId?: number;
    file?: File | null;
  }): Observable<SubjectMaterialFile> {

    const id = Date.now().toString();

    // Mock file URL
    const fileName =
      model.file?.name ?? `${model.title.replace(/\s+/g, '-').toLowerCase()}.pdf`;

    const fileUrl = `/mock-uploads/${id}_${fileName}`;

    const entry: SubjectMaterialFile = {
      id,
      title: model.title,
      fileUrl,
      uploadedAt: new Date().toISOString(),
      classId: model.classId ?? null,  // null means gradeSubject-wide material
      gradeSubjectId: model.gradeSubjectId,
      type: model.type,
      plannedItemId: model.plannedItemId
    };

    this.materials.push(entry);
    this.materials$.next([...this.materials]);

    return of(entry);
  }

  // --------------------------------------------------------
  // DELETE MATERIAL
  // --------------------------------------------------------
  deleteMaterial(id: string): Observable<boolean> {
    const before = this.materials.length;
    this.materials = this.materials.filter(m => m.id !== id);
    const after = this.materials.length;

    this.materials$.next([...this.materials]);

    return of(after < before);
  }

  // --------------------------------------------------------
  // GET SINGLE ITEM
  // --------------------------------------------------------
  getMaterialById(id: string): Observable<SubjectMaterialFile | undefined> {
    const found = this.materials.find(m => m.id === id);
    return of(found);
  }

  // --------------------------------------------------------
  // CHECK IF ITEM EXISTS
  // --------------------------------------------------------
  exists(classId: number | null, plannedItemId: number): boolean {
    return this.materials.some(
      m => m.plannedItemId === plannedItemId && (m.classId === classId || m.classId === null)
    );
  }

  // --------------------------------------------------------
  // FOCUS
  // --------------------------------------------------------
  focusOnItem(classId: number | null, id: number) {
    this._focusSubject.next({ classId, id, type: 'material' });
  }

  // --------------------------------------------------------
  // MOCK DATA SEEDING
  // --------------------------------------------------------
  private seedMockData() {
    this.materials = [
      {
        id: '1001',
        title: 'Introduction to Algebra - Notes',
        fileUrl: '/assets/mock/intro-algebra-notes.pdf',
        uploadedAt: new Date('2025-01-10').toISOString(),
        classId: 1,
        gradeSubjectId: 22,
        type: 'notes',
        plannedItemId: 11
      },
      {
        id: '1002',
        title: 'Fractions Worksheet 1',
        fileUrl: '/assets/mock/fractions-worksheet-1.pdf',
        uploadedAt: new Date('2025-02-02').toISOString(),
        classId: 1,
        gradeSubjectId: 22,
        type: 'worksheet',
        plannedItemId: 12
      },
      {
        id: '1003',
        title: 'General Practice Pack',
        fileUrl: '/assets/mock/general-practice.zip',
        uploadedAt: new Date('2025-01-05').toISOString(),
        classId: null,
        gradeSubjectId: 22,
        type: 'resource'
      }
    ];

    this.materials$.next([...this.materials]);
  }
}
