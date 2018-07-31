import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';
import { AppUser } from '../../../shared/models/app-user';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCardUtility } from '../../../shared/utilities/shopping-card.utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed = false;
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
