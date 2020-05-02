import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo } from '../shared/model/todo.model';
import { TodoDataService } from '../shared/data/todo-data.service';
import { User } from '../shared/model/user.model';
import { HardcodedAuthService } from '../shared/auth/hardcoded-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit, OnDestroy {
  todos: Todo[];
  private todoSubscription: Subscription;

  constructor(private todoDataService: TodoDataService) {
  }

  ngOnInit(): void {
    const user: User = JSON.parse(sessionStorage.getItem(HardcodedAuthService.USER));
    this.todoSubscription = this.todoDataService.getAllTodos(user.username).subscribe(todos => {
      this.todos = todos;
    });
  }

  ngOnDestroy(): void {
    if (this.todoSubscription) {
      this.todoSubscription.unsubscribe();
    }
  }
}
