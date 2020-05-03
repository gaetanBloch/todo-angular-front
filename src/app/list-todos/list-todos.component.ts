import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { Todo } from '../shared/model/todo.model';
import { TodoDataService } from '../shared/data/todo-data.service';
import { HardcodedAuthService } from '../shared/auth/hardcoded-auth.service';


@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit, OnDestroy {
  todos: Todo[];
  username: string;
  message: string;
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  private getTodosSubscription: Subscription;
  private deleteTodoSubscription: Subscription;

  constructor(private todoDataService: TodoDataService, private router: Router) {
  }

  ngOnInit(): void {
    this.username = JSON.parse(sessionStorage.getItem(HardcodedAuthService.USER)).username;
    this.refreshTodoTable(() => {
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
    this.getTodosSubscription = this.todoDataService.getAllTodos(this.username)
      .subscribe(todos => {
        this.todos = todos;
        callback();
      });
  }
}
