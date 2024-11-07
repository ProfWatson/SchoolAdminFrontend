import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
// Use BehaviorSubject to store tasks reactively
private todoListSubject = new BehaviorSubject<Todo[]>([]);
todoList$ = this.todoListSubject.asObservable(); // Observable to be subscribed to

constructor() {}

// Add a new task to the list
addTask(taskText: string): void {
  const newTask: Todo = { text: taskText, completed: false };
  const currentList = this.todoListSubject.value;
  this.todoListSubject.next([...currentList, newTask]);
}

// Remove a task from the list
removeTask(taskIndex: number): void {
  const currentList = this.todoListSubject.value;
  currentList.splice(taskIndex, 1); // Remove task at index
  this.todoListSubject.next([...currentList]); // Update the list
}

// Toggle the completion status of a task
toggleCompletion(taskIndex: number): void {
  const currentList = this.todoListSubject.value;
  const task = currentList[taskIndex];
  task.completed = !task.completed;
  this.todoListSubject.next([...currentList]); // Update the list
}

// Get the current list of tasks
getTasks(): Todo[] {
  return this.todoListSubject.value;
}
}
