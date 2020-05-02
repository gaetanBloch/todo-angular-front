import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Todo } from '../model/todo.model';

@Injectable({providedIn: 'root'})
export class TodoDataService {

  constructor(private http: HttpClient) {
  }

  getAllTodos(username: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`/api/users/${username}/todos`);
  }

  deleteTodo(username: string, id: number): Observable<Todo[]> {
    return this.http.delete<Todo[]>(`/api/users/${username}/todos/${id}`);
  }
}
