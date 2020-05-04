import { Component, OnInit } from '@angular/core';
import { JwtAuthService } from '../shared/auth/jwt-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(public authService: JwtAuthService) {
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
  }
}
