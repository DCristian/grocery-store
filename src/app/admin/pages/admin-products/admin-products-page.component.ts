import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../../shared/models/product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products-page.component.html'
})
export class AdminProductsPageComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.products$ = this.productService.list();
  }
}
