import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Todo } from '../shared/model/todo.model';
import { TodoDataService } from '../shared/data/todo-data.service';
import { BasicAuthService } from '../shared/auth/basic-auth.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  username: string;
  message: string;
  isLoading = false;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;

  constructor(private todoDataService: TodoDataService,
              private authService: BasicAuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    this.refreshTodoTable(() => {
      this.isLoading = false;
    });
  }

  onAdd() {
    this.router.navigate(['/todos', 'new']);
  }

  onUpdate(id: number): void {
    this.router.navigate(['todos', id, 'edit']);
  }

  onDelete(id: number): void {
    this.todoDataService.deleteTodo(this.username, id).subscribe(() => {
      this.refreshTodoTable(() => {
        this.message = `Delete successful for id = ${id}`;
        setTimeout(() => this.message = null, 5000);
        this.isLoading = false;
      });
    });
  }

  onToggleDone(checked: boolean, todo: Todo) {
    todo.done = checked;
    this.todoDataService.updateTodo(this.username, todo.id, todo).subscribe(() => {
    });
  }

  private refreshTodoTable(callback: () => void) {
    this.isLoading = true;
    this.todoDataService.getAllTodos(this.username).subscribe(todos => {
      this.todos = todos;
      callback();
    });
  }
}
