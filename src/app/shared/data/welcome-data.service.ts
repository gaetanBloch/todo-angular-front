import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class WelcomeDataService {

  constructor(private http: HttpClient) {
  }

  getHelloWorldWithParam(param: string): Observable<{ message: string }> {
    return this.http.get<{ message: string }>(`/api/hello-world/${param}`);
  }
}
