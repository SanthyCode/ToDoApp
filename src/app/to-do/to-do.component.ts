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

  //filtros para los todos ingresados
  getFilteredTodos(): Todo[] {
    let filteredTodos = this.todos;
  
    if (this.dateToFilter) {
      filteredTodos = filteredTodos.filter(todo => todo.dueDate === this.dateToFilter);
    } // nos filtra por la fecha
  
    if (this.showCompleted) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    } else {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } // Filtra por completados
  
    return filteredTodos;
  }

  //borra cualqiuer filtro
  deleteFilteredTodos() {
    this.dateToFilter = '';
  }

  //Función que nos ayuda a agregar nuevas tareas a la Pag
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
      this.saveToLocalStorage(); //guarda la información en local para que asi si recarga la pagina no se pierda la informacion agregada
    }
  }

  //controla el checkbox de completado
  toggleTodoCompletion(todo: Todo) {
    todo.completed = !todo.completed;
    this.saveToLocalStorage(); //actualiza el localStorage
  }

  // controla el boton para eliminar la tarea
  deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.saveToLocalStorage();//actualiza el localStorage
  }

  // controla el boton para ver las tareas completadas o las pendientes
  toggleView() {
    this.showCompleted = !this.showCompleted;
  }

  // funcion para guardar la informacion en local
  private loadFromLocalStorage() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    this.todos = savedTodos ? JSON.parse(savedTodos) : [];
  }

  private saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
  }

  // funcion que nos ayuda segun la fecha a comparacion del dia actual
  //nos retorne un color a la card segun la prioridad por vencimiento 
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

  // controla boton para ordenar las tareas ya sea de la mas antigua a la mas vieja o viceversa
  sortTodos() {
    this.todos.sort((a, b) => {
      const fechaA = new Date(a.dueDate).getTime();
      const fechaB = new Date(b.dueDate).getTime();

      return this.isAscending ? fechaA - fechaB : fechaB - fechaA;
    });

    this.isAscending = !this.isAscending;

    this.saveToLocalStorage();
  }

  // Controla el boton para editar la informacion de la si es necesario
  startEditing(todo: Todo) {
    this.editingTodoId = todo.id;
    this.editedTitle = todo.title;
    this.descriptionTodo = todo.description
    this.editedDueDate = todo.dueDate;
  }

  // guarda lo que se haya editado y actualiza el localStorage
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

  // cancela la edicion de la tarea
  cancelEditing() {
    this.editingTodoId = null;
    this.editedTitle = '';
    this.editedDescription = ''
    this.editedDueDate = '';
  }
}