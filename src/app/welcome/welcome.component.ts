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
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private welcomeDataService: WelcomeDataService) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.username = params.username;
    });
  }

  getWelcomeMessage(): void {
    console.log(this.welcomeDataService.getHelloWorld());
  }

  ngOnDestroy(): void {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }
}
