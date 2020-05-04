import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BasicAuthService {
  private static readonly USER = 'user';

  constructor(private router: Router, private http: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    const basicAuthHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    const headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get('/api/basicauth', {headers}).pipe(tap(() => {
      localStorage.setItem(BasicAuthService.USER, JSON.stringify(
        new User(username, basicAuthHeaderString)
      ));
    }));
  }

  logout() {
    localStorage.removeItem(BasicAuthService.USER);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(BasicAuthService.USER) != null;
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(BasicAuthService.USER));
  }

  getUsername(): string {
    return JSON.parse(localStorage.getItem(BasicAuthService.USER)).username;
  }
}
