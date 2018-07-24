import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { AppUser } from '../model/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: false;
  appUser: AppUser;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAppUser$().subscribe(appUser => this.appUser = appUser);
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
