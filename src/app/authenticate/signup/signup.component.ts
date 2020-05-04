import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

import { JwtAuthService } from '../../shared/auth/jwt-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  static readonly DIFFERENT_PASSWORDS = 'The password and its confirmation must be the same!'
  errorMessage: string;
  isLoading = false;
  differentPasswords = false;
  faSignInAlt = faSignInAlt;
  @ViewChild('passwordModel', {static: false}) password: NgModel;
  @ViewChild('confirmPasswordModel', {static: false}) confirmPassword: NgModel;

  constructor(private authService: JwtAuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  checkPasswordsFirst() {
    if (this.password.touched && this.confirmPassword.touched) {
      this.checkPasswords();
    }
  }

  checkPasswords() {
    if (this.password.value !== this.confirmPassword.value) {
      this.errorMessage = SignupComponent.DIFFERENT_PASSWORDS;
      this.differentPasswords = true;
    } else {
      this.errorMessage = null;
      this.differentPasswords = false;
    }
  }

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    this.authService.signup(form.value.username, this.password.value).subscribe(() => {
      this.errorMessage = null;
      this.router.navigate(['welcome']);
      this.isLoading = false;
    }, error => {
      this.errorMessage = error.error;
      this.isLoading = false;
    });
  }
}
