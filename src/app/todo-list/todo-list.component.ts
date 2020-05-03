import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { Todo } from '../shared/model/todo.model';
import { TodoDataService } from '../shared/data/todo-data.service';
import { HardcodedAuthService } from '../shared/auth/hardcoded-auth.service';

@Component({
  selector: 'app-list-todos',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {
  todos: Todo[];
  username: string;
  message: string;
  isLoading = false;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  private getTodosSubscription: Subscription;
  private deleteTodoSubscription: Subscription;

  constructor(private todoDataService: TodoDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = JSON.parse(sessionStorage.getItem(HardcodedAuthService.USER)).username;
    this.refreshTodoTable(() => {
      this.isLoading = false;
    });
  }

  onUpdate(id: number): void {
    this.router.navigate(['todos', id, 'edit']);
  }

  onDelete(id: number): void {
    this.deleteTodoSubscription = this.todoDataService.deleteTodo(this.username, id)
      .subscribe(() => {
        this.refreshTodoTable(() => {
          this.message = `Delete successful for id = ${id}`;
          setTimeout(() => this.message = null, 5000);
          this.isLoading = false;
        });
      });
  }

  ngOnDestroy(): void {
    if (this.getTodosSubscription) {
      this.getTodosSubscription.unsubscribe();
    }
    if (this.deleteTodoSubscription) {
      this.deleteTodoSubscription.unsubscribe();
    }
  }

  private refreshTodoTable(callback: () => any) {
    this.isLoading = true;
    this.getTodosSubscription = this.todoDataService.getAllTodos(this.username)
      .subscribe(todos => {
        this.todos = todos;
        callback();
      });
  }
}