import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WelcomeDataService } from '../shared/data/welcome-data.service';
import { JwtAuthService } from '../shared/auth/jwt-auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  username: string;
  welcomeMessage: string;
  errorMessage: string;
  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private welcomeDataService: WelcomeDataService,
              private authService: JwtAuthService) {
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  getWelcomeMessageWithParam(): void {
    this.welcomeDataService.getHelloWorldWithParam(this.username).subscribe(response => {
      this.welcomeMessage = response.message;
      this.errorMessage = null;
    }, error => {
      this.errorMessage = error.error;
      this.welcomeMessage = null;
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
