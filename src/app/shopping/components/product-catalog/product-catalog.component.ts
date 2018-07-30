import { Component, Input } from '@angular/core';

import { Product } from '../../../shared/models/product';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html'
})
export class ProductCatalogComponent {
  @Input() product: Product;
  @Input() cart: ShoppingCart;
}
