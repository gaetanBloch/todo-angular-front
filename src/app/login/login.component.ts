import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'gbloch';
  password = '';

  constructor() { }

  ngOnInit(): void {
  }

  onLogin(): void {
    console.log(this.username);
  }
}
