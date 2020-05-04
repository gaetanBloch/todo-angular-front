import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthService } from '../../shared/auth/jwt-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = 'gbloch';
  password = '';
  invalidLogin: boolean;
  isLoading = false;

  constructor(private router: Router, private authService: JwtAuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe(result => {
      console.log(result);
      this.invalidLogin = false;
      this.router.navigate(['welcome', this.username]);
      this.isLoading = false;
    }, error => {
      this.invalidLogin = true;
      this.isLoading = false;
    });
  }
}
