import { NgClass, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from 'src/app/shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo-list-widget',
  standalone: true,
  imports: [FormsModule, NgForOf, NgClass],
  templateUrl: './todo-list-widget.component.html',
  styleUrl: './todo-list-widget.component.scss'
})
export class TodoListWidgetComponent {
  newTask: string = ''; // To bind input text
  tasks: Todo[] = []; // Store tasks list

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Subscribe to the todo list observable to get the tasks
    this.todoService.todoList$.subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  // Add task when user presses Enter
  addTask(): void {
    if (this.newTask.trim()) {
      this.todoService.addTask(this.newTask); // Add task using the service
      this.newTask = ''; // Clear the input field
    }
  }

  // Remove task using the service
  removeTask(index: number): void {
    this.todoService.removeTask(index);
  }

  // Toggle the completion status of a task
  toggleCompletion(index: number): void {
    this.tasks[index].completed = !this.tasks[index].completed;
    this.todoService.toggleCompletion(index);
  }
}
