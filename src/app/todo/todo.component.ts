import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoDataService } from '../shared/data/todo-data.service';
import { HardcodedAuthService } from '../shared/auth/hardcoded-auth.service';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private todoDataService: TodoDataService, private route: ActivatedRoute) {
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
      this.isUpdate = false;
    }
  }

  onSubmit(): void {
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
    if (this.getTodoSubscription) {
      this.getTodoSubscription.unsubscribe();
    }
  }
}
