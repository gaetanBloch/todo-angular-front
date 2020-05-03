import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TodoDataService } from '../shared/data/todo-data.service';
import { HardcodedAuthService } from '../shared/auth/hardcoded-auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  username: string;
  description: string;
  targetDate: Date;
  private getTodoSubscription: Subscription;

  constructor(private todoDataService: TodoDataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // Init
    this.username = JSON.parse(sessionStorage.getItem(HardcodedAuthService.USER)).username;
    const id = this.route.snapshot.params.id;
    this.getTodoSubscription = this.todoDataService.getTodo(this.username, id)
      .subscribe(todo => {
        this.description = todo.description;
        this.targetDate = todo.targetDate;
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
