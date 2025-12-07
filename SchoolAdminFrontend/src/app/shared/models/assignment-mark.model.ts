import { SectionMark } from "./section-mark.model";

export interface AssignmentMark {
  id: number;
  assignmentId?: number | null;
  studentId: number;
  studentname: string;
  sectionMarks: SectionMark[];
  total?: number;
}
