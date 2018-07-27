import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html'
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.products$ = this.productService.list().snapshotChanges()
      .pipe(
          map(actions => actions.map(a => {
          const $key = a.payload.key;
          return { $key, ...a.payload.val() };
        }))
      );
  }
}
