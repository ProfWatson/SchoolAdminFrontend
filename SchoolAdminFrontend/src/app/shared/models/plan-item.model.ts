export interface PlanItem {
  id: number;
  title: string;
  start: string;
  end: string;
  type: 'planned' | 'assignment';
  relatedId: number;
}