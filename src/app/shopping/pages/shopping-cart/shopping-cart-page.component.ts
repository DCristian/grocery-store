import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCardUtility } from '../../../shared/utilities/shopping-card.utility';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartItem } from '../../../shared/models/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.css']
})
export class ShoppingCartPageComponent implements OnInit {
  cart: ShoppingCart;
  items: ShoppingCartItem[];
  itemsCount = 0;
  itemsTotalPrice = 0;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    (await this.cartService.getCart()).valueChanges().subscribe(cart => {
      this.cart = cart;
      this.itemsCount = ShoppingCardUtility.getTotalItemsCount(cart);
      this.itemsTotalPrice = ShoppingCardUtility.getTotalItemsPrice(cart);
      this.items = ShoppingCardUtility.getItems(cart);
    });
  }

  async clearCart(): Promise<void> {
    await this.cartService.clearCart();
  }
}
