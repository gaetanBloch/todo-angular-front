import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class WelcomeDataService {

  constructor() {
  }

  getHelloWorld(): void {
    console.log('Get Hello World!');
  }
}
