import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

@Injectable({providedIn: 'root'})
export class HardcodedAuthService {
  private static readonly USER = 'user';

  constructor(private router: Router) {
  }

  login(username: string, password: string): boolean {
    if (username === 'gbloch' && password === 'dummy') {
      sessionStorage.setItem(HardcodedAuthService.USER, JSON.stringify(
        new User(username, username)
      ));
      return true;
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem(HardcodedAuthService.USER);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(HardcodedAuthService.USER) != null;
  }

  getUsername(): string {
    return JSON.parse(sessionStorage.getItem(HardcodedAuthService.USER)).username;
  }
}
