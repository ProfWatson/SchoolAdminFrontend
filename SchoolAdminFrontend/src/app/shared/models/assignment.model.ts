import { AssignmentSection } from "./assignment-section.model";

export interface Assignment {
  id: number;
  classId: number;          
  gradeSubjectId: number;   
  name: string;
  weight: number;           
  total: number;            
  dueDate: string;
  sections: AssignmentSection[];
}