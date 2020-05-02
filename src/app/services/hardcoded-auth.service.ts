import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class HardcodedAuthService {
  private static readonly AUTHENTICATION_TOKEN = 'authenticationToken';

  constructor(private router: Router) {
  }

  login(username: string, password: string): boolean {
    if (username === 'gbloch' && password === 'dummy') {
      sessionStorage.setItem(HardcodedAuthService.AUTHENTICATION_TOKEN, username);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    sessionStorage.removeItem(HardcodedAuthService.AUTHENTICATION_TOKEN);
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(HardcodedAuthService.AUTHENTICATION_TOKEN) != null;
  }
}
