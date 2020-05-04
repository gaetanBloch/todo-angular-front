import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JwtAuthService } from '../../shared/auth/jwt-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  invalidLogin: boolean;
  isLoading = false;

  constructor(private authService: JwtAuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    this.authService.signup(form.value.username, form.value.password).subscribe(() => {
      this.invalidLogin = false;
      this.router.navigate(['welcome']);
      this.isLoading = false;
    }, error => {
      this.invalidLogin = true;
      this.isLoading = false;
    });
  }
}
