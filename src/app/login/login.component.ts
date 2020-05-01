import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'gbloch';
  password = '';
  invalidLogin: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(): void {
    this.invalidLogin = !(this.username === 'gbloch' && this.password === 'dummy');
  }
}
