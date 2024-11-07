import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker'

@Component({
  selector: 'app-calendar-widget',
  standalone: true,
  imports: [
    CommonModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  templateUrl: './calendar-widget.component.html',
  styleUrl: './calendar-widget.component.scss'
})
export class CalendarWidgetComponent {

}
