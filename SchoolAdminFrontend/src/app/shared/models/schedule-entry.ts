export interface ScheduleEntry {
    day: string;
    periods: { subject?: string; gradeClass?: string; roomNumber?: string }[];
  }