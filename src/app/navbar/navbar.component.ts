import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { AppUser } from '../model/app-user';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShoppingCardUtility } from '../utility/shopping-card.utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed: false;
  appUser: AppUser;
  cartItemsCount = 0;

  constructor(
    public authService: AuthService,
    public cartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.authService.getAppUser$().subscribe(appUser => this.appUser = appUser);
    (await this.cartService.getCart()).valueChanges().subscribe(cart => {
      this.cartItemsCount = ShoppingCardUtility.getTotalItemsCount(cart);
    });
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
