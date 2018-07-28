import { Injectable } from '@angular/core';

import { ShoppingCart } from '../model/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardUtility {
  static getTotalItemsCount(cart: ShoppingCart): number {
    if (!cart.items) {
      return 0;
    }

    return Object.keys(cart.items).reduce((total, key) => total + cart.items[key].quantity, 0);
  }

  static getTotalItemsPrice(cart: ShoppingCart): number {
    if (!cart.items) {
      return 0;
    }

    return Object.keys(cart.items).reduce((total, key) => total + cart.items[key].product.price * cart.items[key].quantity, 0);
  }
}
