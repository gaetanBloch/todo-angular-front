import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WelcomeDataService {

  constructor(private http: HttpClient) {
  }

  getHelloWorld(): Observable<{ message: string }> {
    return this.http.get<{ message: string }>('http://localhost:8080/hello-world-model');
  }
}
