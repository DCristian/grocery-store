import { Component, Input } from '@angular/core';

import { Product } from '../model/product';
import { ShoppingCart } from '../model/shopping-cart';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html'
})
export class ProductCatalogComponent {
  @Input() product: Product;
  @Input() cart: ShoppingCart;
}
