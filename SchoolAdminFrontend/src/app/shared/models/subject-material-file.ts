export interface SubjectMaterialFile {
  id: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;
  classId?: number | null;
  gradeSubjectId?: number | null; 
  type: 'worksheet' | 'notes' | 'textbook' | 'resource';
  plannedItemId?: number;
}
