import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class JwtAuthService {
  private static readonly USER = 'user';

  constructor(private router: Router, private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/authenticate', {username, password})
      .pipe(
        tap(response => {
          localStorage.setItem(JwtAuthService.USER, JSON.stringify(
            new User(username, `Bearer ${response.token}`)
          ));
        })
      );
  }

  signup(username: string, password: string): Observable<any> {
    return this.http.post('/api/signup', {username, password})
      .pipe(
        tap(response => {
          localStorage.setItem(JwtAuthService.USER, JSON.stringify(
            new User(username, `Bearer ${response.token}`)
          ));
        })
      );
  }

  logout() {
    localStorage.removeItem(JwtAuthService.USER);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(JwtAuthService.USER) != null;
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(JwtAuthService.USER));
  }

  getUsername(): string {
    return JSON.parse(localStorage.getItem(JwtAuthService.USER)).username;
  }
}
