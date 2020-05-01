import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'gbloch';
  password = '';
  invalidLogin: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (this.username === 'gbloch' && this.password === 'dummy') {
      this.invalidLogin = false;
      this.router.navigate(['welcome']);
    } else {
      this.invalidLogin = true;
    }
  }
}
