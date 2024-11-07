import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/shared/models/class.model';
import { MyClassesService } from 'src/app/shared/services/my-classes.service';

@Component({
  selector: 'app-my-classes-widget',
  standalone: true,
  imports: [NgFor],
  templateUrl: './my-classes-widget.component.html',
  styleUrl: './my-classes-widget.component.scss'
})
export class MyClassesWidgetComponent implements OnInit {
  classes: Class[] = [];

  constructor(private myClassesService: MyClassesService) {}

  ngOnInit(): void {
    // Fetch classes data from the service
    this.myClassesService.getClasses().subscribe((data: Class[]) => {
      this.classes = data;
    });
  }

  navigateToClass(classId: number): void {
    console.log('Navigating to class ID:', classId);
    // This will be replaced with actual navigation logic later
  }
}
