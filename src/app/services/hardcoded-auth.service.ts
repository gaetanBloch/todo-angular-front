import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class HardcodedAuthService {

  constructor() {
  }

  authenticate(username: string, password: string): boolean {
    if (username === 'gbloch' && password === 'dummy') {
      sessionStorage.setItem('authenticatedUser', username);
      return true;
    } else {
      return false;
    }
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('username') != null;
  }
}
