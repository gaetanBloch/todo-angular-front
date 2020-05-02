import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthService } from '../shared/auth/hardcoded-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'gbloch';
  password = '';
  invalidLogin: boolean;

  constructor(private router: Router, private authService: HardcodedAuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.authService.login(this.username, this.password)) {
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
    } else {
      this.invalidLogin = true;
    }
  }
}
