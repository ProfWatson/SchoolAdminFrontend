import { NgIf, NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CdkDrag, CdkDragEnd, CdkDragHandle} from '@angular/cdk/drag-drop';
import { WidgetState } from '../../models/widget-state';

@Component({
  selector: 'app-widget',
  standalone: true,
  imports: [NgStyle, CdkDrag, CdkDragHandle],
  templateUrl: './widget.component.html',
  styleUrl: './widget.component.scss'
})
export class WidgetComponent {
  @Input() height: string = '300px'; // Default height
  @Input() width: string = '300px'; // Default width
  @Input() widgetPosition = { top: 30, left: 30 }; // Default position
  @Input() widgetName = 'default';
  @Output() closed = new EventEmitter<void>(); // Event emitter to notify parent component
  @Input() widget!: WidgetState;
  @Output() update = new EventEmitter<WidgetState>();

  originalPostion = { top: 30, left: 30 };

  isClosed: boolean = false;

  constructor() {}

  closeWidget() {
    this.isClosed = true;
    this.closed.emit();
  }

  onDragEnd(event: CdkDragEnd): void {
    // Get the dragged element's current position
    const transform = event.source.element.nativeElement.style.transform;
    const match = transform.match(/translate3d\(([-\d.]+)px, ([-\d.]+)px, ([-\d.]+)px\)/);
    
    if (match) {
      const x = parseFloat(match[1]);
      const y = parseFloat(match[2]);
      this.widget.newPosition = {top: this.widget.originalPosition.top + y, left: this.widget.originalPosition.left + x};
      console.log('new position :' , this.widget.newPosition);
      this.update.emit(this.widget);
    }
  }
}
