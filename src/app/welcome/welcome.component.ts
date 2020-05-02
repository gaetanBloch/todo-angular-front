import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WelcomeDataService } from '../shared/data/welcome-data.service';

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
  private welcomeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.username = params.username;
    });
  }

  getWelcomeMessage(): void {
    this.welcomeSubscription = this.welcomeDataService.getHelloWorld().subscribe(response => {
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
    if (this.welcomeSubscription) {
      this.welcomeSubscription.unsubscribe();
    }
  }
}
