import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WidgetState } from '../models/widget-state';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private widgetStatesSubject = new BehaviorSubject<WidgetState[]>([]);
  widgetStates$ = this.widgetStatesSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  loadInitialData(): void {
    // const savedLayout = this.getSavedLayout();

    // if (savedLayout) {
    //   this.widgetStatesSubject.next(savedLayout);
    // } else {
    // }
    this.widgetStatesSubject.next(this.getDefaultTeacherWidgetLayout());
  }

  getDefaultTeacherWidgetLayout(): WidgetState[] {
    return [
      // Main Widgets
      { 
        id: 1, 
        widgetName: 'Notifications', 
        width: '300px', 
        height: '300px', 
        widgetPosition: { top: 50, left: 50 }, 
        originalPosition: { top: 50, left: 50 }, 
        newPosition: { top: 50, left: 50 }, 
        isVisible: true 
      },
      { 
        id: 2, 
        widgetName: 'Classroom Schedule', 
        width: '800px', 
        height: '300px', 
        widgetPosition: { top: 50, left: 360 }, 
        originalPosition: { top: 50, left: 360},
        newPosition: { top: 50, left: 360 }, 
        isVisible: true 
      },
      { 
        id: 3, 
        widgetName: 'Calendar', 
        width: '300px', 
        height: '420px', 
        widgetPosition: { top: 50, left: 1170 }, 
        originalPosition: { top: 50, left: 1170 },
        newPosition: { top: 50, left: 1170 }, 
        isVisible: true 
      },
      { 
        id: 4, 
        widgetName: 'Grades Overview', 
        width: '300px', 
        height: '300px', 
        widgetPosition: { top: 360, left: 50 }, 
        originalPosition: { top: 360, left: 50 }, 
        newPosition: { top: 360, left: 50 }, 
        isVisible: true 
      },
      { 
        id: 5, 
        widgetName: 'Recent Activity', 
        width: '300px', 
        height: '200px', 
        widgetPosition: { top: 360, left: 360 }, 
        originalPosition: { top: 360, left: 360 },
        newPosition: { top: 360, left: 360 }, 
        isVisible: true 
      },
      { 
        id: 6, 
        widgetName: 'To-Do List', 
        width: '300px', 
        height: '200px', 
        widgetPosition: { top: 360, left: 860 }, 
        originalPosition: { top: 360, left: 860 },
        newPosition: { top: 360, left: 860 }, 
        isVisible: true 
      },
      { 
        id: 7, 
        widgetName: 'Student Communication', 
        width: '300px', 
        height: '300px', 
        widgetPosition: { top: 480, left: 1170 }, 
        originalPosition: { top: 480, left: 1170 }, 
        newPosition: { top: 480, left: 1170 }, 
        isVisible: true 
      },
    ];
  }

  getDefaultStudentWidgetLayout(): WidgetState[] {
    return [

      // Add other default widgets
    ];
  }

  // getSavedLayout(): WidgetState[] | null {
  //   const layout = localStorage.getItem('teacherDashboardLayout');
  //   return layout ? JSON.parse(layout) : null;
  // }

  saveLayout(): void {
    const layout = this.widgetStatesSubject.value;
    localStorage.setItem('teacherDashboardLayout', JSON.stringify(layout));
  }

  updateWidget(widget: WidgetState): void {
    const updatedWidgets = this.widgetStatesSubject.value.map(w => 
      w.id === widget.id ? widget : w
    );
    this.widgetStatesSubject.next(updatedWidgets);
    this.saveLayout();
  }

  closeWidget(id: number): void {
    const updatedWidgets = this.widgetStatesSubject.value.map(w => 
      w.id === id ? { ...w, isVisible: false } : w
    );
    this.widgetStatesSubject.next(updatedWidgets);
    this.saveLayout();
  }

  reopenWidget(id: number): void {
    const updatedWidgets = this.widgetStatesSubject.value.map(w => 
      w.id === id ? { ...w, isVisible: true } : w
    );
    this.widgetStatesSubject.next(updatedWidgets);
    this.saveLayout();
  }
}
