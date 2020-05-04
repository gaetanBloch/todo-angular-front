import { Component, OnInit } from '@angular/core';
import { faHome, faList, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { JwtAuthService } from '../shared/auth/jwt-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  faHome = faHome;
  faList = faList;
  faSignInAlt = faSignInAlt;
  faSignOutAlt = faSignOutAlt;

  constructor(public authService: JwtAuthService) {
  }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.authService.logout();
  }
}
