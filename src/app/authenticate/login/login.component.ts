import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtAuthService } from '../../shared/auth/jwt-auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  isLoading = false;

  constructor(private router: Router, private authService: JwtAuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    this.authService.login(form.value.username, form.value.password).subscribe(() => {
      this.errorMessage = null;
      this.router.navigate(['welcome']);
      this.isLoading = false;
    }, error => {
      this.errorMessage = error.error;
      this.isLoading = false;
    });
  }
}
