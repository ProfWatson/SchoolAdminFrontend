export interface SubjectMaterialFile {
  id: string;
  title: string;
  fileUrl: string;
  uploadedAt: string;

  type: 'worksheet' | 'notes' | 'textbook' | 'resource';

  // Optional link to planned item
  plannedItemId?: number;
}
