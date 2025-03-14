import { Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string;
}

const STORAGE_KEY = 'todos';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoDueDate: string = '';
  descriptionTodo: string = '';
  showCompleted: boolean = false;
  dateToFilter: string = '';
  isAscending: boolean = false;
  editingTodoId: string | null = null;
  editedTitle: string = '';
  editedDueDate: string = '';
  editedDescription: string = '';

  constructor() {
    this.loadFromLocalStorage();
  }

  getFilteredTodos(): Todo[] {
    let filteredTodos = this.todos;

    if (this.dateToFilter) {
      filteredTodos = filteredTodos.filter(todo => todo.dueDate === this.dateToFilter);
    }

    if (this.showCompleted) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    return filteredTodos;
  }

  deleteFilteredTodos() {
    this.dateToFilter = '';
  }

  addTodo() {
    if (this.newTodoTitle.trim() && this.newTodoDueDate) {
      const newTodo: Todo = {
        id: uuidv4(),
        title: this.newTodoTitle,
        description: this.descriptionTodo,
        completed: false,
        dueDate: this.newTodoDueDate
      };
      this.todos.push(newTodo);
      this.newTodoTitle = '';
      this.descriptionTodo = '';
      this.newTodoDueDate = '';
      this.saveToLocalStorage();
    }
  }

  toggleTodoCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveToLocalStorage();
  }

  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.saveToLocalStorage();
  }

  toggleView() {
    this.showCompleted = !this.showCompleted;
  }

  private loadFromLocalStorage() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    this.todos = savedTodos ? JSON.parse(savedTodos) : [];
  }

  private saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
  }

  getEstadoTarea(dueDate: string): string {
    const hoy = new Date();
    const fechaTarea = new Date(dueDate);
    const diferenciaDias = Math.floor((fechaTarea.getTime() - hoy.getTime()) / (1000 * 3600 * 24));

    if (diferenciaDias === 0) {
      return 'rojo';
    } else if (diferenciaDias >= 1 && diferenciaDias <= 3) {
      return 'naranja';
    } else if (diferenciaDias > 3) {
      return 'verde';
    } else {
      return 'vencida';
    }
  }

  sortTodos() {
    this.todos.sort((a, b) => {
      const fechaA = new Date(a.dueDate).getTime();
      const fechaB = new Date(b.dueDate).getTime();

      return this.isAscending ? fechaA - fechaB : fechaB - fechaA;
    });

    this.isAscending = !this.isAscending;

    this.saveToLocalStorage();
  }

  startEditing(todo: Todo) {
    this.editingTodoId = todo.id;
    this.editedTitle = todo.title;
    this.descriptionTodo = todo.description
    this.editedDueDate = todo.dueDate;
  }

  saveEditing() {
    const todo = this.todos.find(t => t.id === this.editingTodoId);
    if (todo) {
      todo.title = this.editedTitle;
      todo.description = this.editedDescription
      todo.dueDate = this.editedDueDate;
      this.saveToLocalStorage();
    }
    this.cancelEditing();
  }

  cancelEditing() {
    this.editingTodoId = null;
    this.editedTitle = '';
    this.editedDescription = ''
    this.editedDueDate = '';
  }
}