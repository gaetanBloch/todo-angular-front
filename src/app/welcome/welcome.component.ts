import { Component, OnInit } from '@angular/core';
import { faDoorOpen, faList } from '@fortawesome/free-solid-svg-icons';
import { JwtAuthService } from '../shared/auth/jwt-auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username: string;
  faDoorOpen = faDoorOpen;
  faList = faList;

  constructor(private authService: JwtAuthService) {
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }
}
