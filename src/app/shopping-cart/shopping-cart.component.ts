import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShoppingCardUtility } from '../utility/shopping-card.utility';
import { ShoppingCart } from '../model/shopping-cart';
import { ShoppingCartItem } from '../model/shopping-cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
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
      this.setItems();
    });
  }

  setItems() {
    this.items = [];

    if (!this.cart.items) {
      return;
    }

    for (let key in this.cart.items) {
      if (!this.cart.items.hasOwnProperty(key)) {
        continue;
      }

      this.cart.items[key].product.$key = key;
      this.items.push(this.cart.items[key]);
    }
  }

  async clearCart(): Promise<void> {
    await this.cartService.clearCart();
  }
}
