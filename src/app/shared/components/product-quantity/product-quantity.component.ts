import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html'
})
export class ProductQuantityComponent implements OnChanges {
  @Input() product: Product;
  @Input() cart: ShoppingCart;
  quantity: number;

  constructor(
    private cartService: ShoppingCartService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cart']) {
      this.updateQuantity();
    }
  }

  async addToCart(): Promise<void> {
    await this.cartService.addToCart(this.product);
  }

  async removeFromCart(): Promise<void> {
    await this.cartService.removeFromCart(this.product);
  }

  updateQuantity() {
    if (!this.cart.items) {
      return this.quantity = 0;
    }

    let item = this.cart.items[this.product.$key];
    this.quantity = item ? item.quantity : 0;
  }
}
