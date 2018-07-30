import { ShoppingCartItem } from './shopping-cart-item';

export interface ShoppingCart {
  date: number;
  items: {
    [key: string]: ShoppingCartItem
  };
}
