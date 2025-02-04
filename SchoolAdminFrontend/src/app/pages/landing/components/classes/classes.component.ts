import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ClassService } from 'src/app/shared/services/class.service';
import { MyClassesService } from 'src/app/shared/services/my-classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss'
})
export class ClassesComponent implements OnInit {
  classes: { id: number; name: string }[] = [];
  selectedClass = signal<number | null>(null);
  activeTab: WritableSignal<string> = signal<string>('planning'); // Default to 'planning'

  constructor(private classService: ClassService, private myClassesService: MyClassesService) {}

  ngOnInit(): void {
    // this.classService.getTeacherClasses().subscribe((data) => {
    //   this.classes = data;
    //   if (data.length > 0) {
    //     this.selectedClass.set(data[0].id); // Set the first class by default
    //   }
    // });
    this.myClassesService.getClasses().subscribe(classes => {
      this.classes = classes;
      if (this.classes.length > 0) {
         this.selectedClass.set(this.classes[0].id); // Set the first class by default
      }
    });
  }

  switchTab(tabName: string) {
    this.activeTab.set(tabName);
  }
}
