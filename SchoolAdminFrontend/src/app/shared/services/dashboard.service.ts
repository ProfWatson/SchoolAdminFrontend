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
        widgetPosition: { top: 60, left: 50 }, 
        originalPosition: { top: 60, left: 50 }, 
        newPosition: { top: 60, left: 50 }, 
        isVisible: true 
      },
      { 
        id: 2, 
        widgetName: 'Classroom Schedule', 
        width: '800px', 
        height: '380px', 
        widgetPosition: { top: 60, left: 360 }, 
        originalPosition: { top: 60, left: 360},
        newPosition: { top: 60, left: 360 }, 
        isVisible: true 
      },
      { 
        id: 3, 
        widgetName: 'Calendar', 
        width: '300px', 
        height: '380px', 
        widgetPosition: { top: 60, left: 1170 }, 
        originalPosition: { top: 60, left: 1170 },
        newPosition: { top: 60, left: 1170 }, 
        isVisible: true 
      },
      { 
        id: 4, 
        widgetName: 'Recent Activity', 
        width: '300px', 
        height: '400px', 
        widgetPosition: { top: 370, left: 50 }, 
        originalPosition: { top: 370, left: 50 }, 
        newPosition: { top: 370, left: 50 }, 
        isVisible: true 
      },
      { 
        id: 5, 
        widgetName: 'My Classes', 
        width: '300px', 
        height: '200px', 
        widgetPosition: { top: 450, left: 360 }, 
        originalPosition: { top: 450, left: 360 },
        newPosition: { top: 450, left: 360 },
        isVisible: true 
      },
      
      { 
        id: 6, 
        widgetName: 'To-Do List', 
        width: '300px', 
        height: '200px', 
        widgetPosition: { top: 450, left: 860 }, 
        originalPosition: { top: 450, left: 860 },
        newPosition: { top: 450, left: 860 }, 
        isVisible: true 
      },
      { 
        id: 7, 
        widgetName: 'Student Communication', 
        width: '300px', 
        height: '300px', 
        widgetPosition: { top: 450, left: 1170 }, 
        originalPosition: { top: 450, left: 1170 }, 
        newPosition: { top: 450, left: 1170 }, 
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

  resetWidgets(): void {
    const updatedWidgets = this.widgetStatesSubject.value.map(widget => ({
      ...widget,
      isVisible: true // Reset all widgets to be visible by default
    }));
  
    // Update the widget state in the service and save the layout
    this.widgetStatesSubject.next(updatedWidgets);
    this.saveLayout();
  }
}
