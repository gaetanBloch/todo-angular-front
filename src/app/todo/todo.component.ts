import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

import { TodoDataService } from '../shared/data/todo-data.service';
import { Todo } from '../shared/model/todo.model';
import { JwtAuthService } from '../shared/auth/jwt-auth.service';

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
  errorMessage: string;
  faEdit = faEdit;
  faPlus = faPlus;
  private paramsSubscription: Subscription;

  constructor(private todoDataService: TodoDataService,
              private authService: JwtAuthService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
    const id = +this.route.snapshot.params.id;
    if (id) {
      this.isLoading = true;
      this.isUpdate = true;
      this.todoDataService.getTodo(this.username, id).subscribe(todo => {
        this.todo = todo;
        this.isLoading = false;
      }, error => {
        this.errorMessage = error.error;
        this.isLoading = false;
      });
    } else {
      this.todo = new Todo(-1, this.username, '', new Date(), false);
      this.isUpdate = false;
    }
  }

  onSubmit(): void {
    if (this.isUpdate) {
      this.todoDataService.updateTodo(this.username, this.todo.id, this.todo).subscribe(() => {
        this.router.navigate(['/todos']);
      }, error => {
        this.errorMessage = error.error;
      });
    } else {
      this.todo.username = this.username;
      this.todoDataService.createTodo(this.username, this.todo).subscribe(() => {
        this.router.navigate(['/todos']);
      }, error => {
        this.errorMessage = error.error;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
