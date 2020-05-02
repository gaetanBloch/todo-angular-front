import { Component, OnInit } from '@angular/core';
import { HardcodedAuthService } from '../services/hardcoded-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(public authService: HardcodedAuthService) {
  }

  ngOnInit(): void {
  }

}
