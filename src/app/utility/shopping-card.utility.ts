import { Injectable } from '@angular/core';

import { ShoppingCart } from '../model/shopping-cart';
import {ShoppingCartItem} from '../model/shopping-cart-item';

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

  static getItems(cart: ShoppingCart): ShoppingCartItem[] {
    if (!cart.items) {
      return [] ;
    }

    let items = [];
    for (let key in cart.items) {
      if (!cart.items.hasOwnProperty(key)) {
        continue;
      }

      cart.items[key].product.$key = key;
      items.push(cart.items[key]);
    }

    return items;
  }
}
