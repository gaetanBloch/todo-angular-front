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

  getTodo(username: string, id: number): Observable<Todo> {
    return this.http.get<Todo>(`/api/users/${username}/todos/${id}`);
  }

  updateTodo(username: string, id: number, todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`/api/users/${username}/todos/${id}`, todo);
  }

  createTodo(username: string, todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(`/api/users/${username}/todos`, todo);
  }

  deleteTodo(username: string, id: number): Observable<void> {
    return this.http.delete<void>(`/api/users/${username}/todos/${id}`);
  }
}
