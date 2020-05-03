import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { TodoDataService } from '../shared/data/todo-data.service';
import { HardcodedAuthService } from '../shared/auth/hardcoded-auth.service';
import { Todo } from '../shared/model/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  username: string;
  todo: Todo;
  isUpdate = false;
  isLoading = false;
  private paramsSubscription: Subscription;
  private getTodoSubscription: Subscription;
  private updateTodoSubscription: Subscription;
  private createTodoSubscription: Subscription;

  constructor(private todoDataService: TodoDataService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.username = JSON.parse(sessionStorage.getItem(HardcodedAuthService.USER)).username;
    const id = +this.route.snapshot.params.id;
    if (id) {
      this.isLoading = true;
      this.isUpdate = true;
      this.getTodoSubscription = this.todoDataService.getTodo(this.username, id)
        .subscribe(todo => {
          this.todo = todo;
          this.isLoading = false;
        });
    } else {
      this.todo = new Todo(-1, '', new Date(), false);
      this.isUpdate = false;
    }
  }

  onSubmit(): void {
    if (this.isUpdate) {
      this.updateTodoSubscription = this.todoDataService
        .updateTodo(this.username, this.todo.id, this.todo)
        .subscribe(() => {
          this.router.navigate(['/todos']);
        });
    } else {
      this.createTodoSubscription = this.todoDataService.createTodo(this.username, this.todo)
        .subscribe(() => {
          this.router.navigate(['/todos']);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.getTodoSubscription) {
      this.getTodoSubscription.unsubscribe();
    }
    if (this.updateTodoSubscription) {
      this.updateTodoSubscription.unsubscribe();
    }
    if (this.createTodoSubscription) {
      this.createTodoSubscription.unsubscribe();
    }
  }
}
