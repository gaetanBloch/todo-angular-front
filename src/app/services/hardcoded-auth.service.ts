import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class HardcodedAuthService {

  constructor() {
  }

  authenticate(username: string, password: string): boolean {
    return username === 'gbloch' && password === 'dummy';
  }
}
