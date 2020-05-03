import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WelcomeDataService } from '../shared/data/welcome-data.service';
import { HardcodedAuthService } from '../shared/auth/hardcoded-auth.service';
import { User } from '../shared/model/user.model';

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

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.username = params.username;
      if (!this.username) {
        const user: User = JSON.parse(sessionStorage.getItem(HardcodedAuthService.USER));
        this.username = user.username;
      }
    });
  }

  getWelcomeMessageWithParam(): void {
    this.welcomeDataService.getHelloWorldWithParam(this.username).subscribe(response => {
      this.welcomeMessage = response.message;
      this.errorMessage = null;
    }, error => {
      this.errorMessage = error.message;
      this.welcomeMessage = null;
    });
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
