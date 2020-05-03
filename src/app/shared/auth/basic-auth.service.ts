import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BasicAuthService {
  private static readonly USER = 'user';

  constructor(private router: Router, private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get('/api/basicauth').pipe(tap(() => {
      sessionStorage.setItem(BasicAuthService.USER, JSON.stringify(
        new User(username, password)
      ));
    }));
  }

  logout() {
    sessionStorage.removeItem(BasicAuthService.USER);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(BasicAuthService.USER) != null;
  }

  getUser(): User {
    return JSON.parse(sessionStorage.getItem(BasicAuthService.USER));
  }

  getUsername(): string {
    return JSON.parse(sessionStorage.getItem(BasicAuthService.USER)).username;
  }
}
