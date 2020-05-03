import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  private getTodoSubscription: Subscription;

  constructor(private todoDataService: TodoDataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.username = JSON.parse(sessionStorage.getItem(HardcodedAuthService.USER)).username;
    const id = this.route.snapshot.params.id;
    this.getTodoSubscription = this.todoDataService.getTodo(this.username, id)
      .subscribe(todo => {
        this.todo = todo;
      });
  }

  onSubmit(form: NgForm): void {
    console.log(form);
  }

  ngOnDestroy(): void {
    if (this.getTodoSubscription) {
      this.getTodoSubscription.unsubscribe();
    }
  }
}
