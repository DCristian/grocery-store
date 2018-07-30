import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CategoryService } from '../../../shared/services/category.service';
import { ProductService } from '../../../shared/services/product.service';
import { Category } from '../../../shared/models/category';
import { Product } from '../../../shared/models/product';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from '../../../shared/models/shopping-cart';

@Component({
  selector: 'app-home',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit, OnDestroy {
  categories$: Observable<Category[]>;
  selectedCategory: string;
  products$: Observable<Product[]>;
  subscription: Subscription;
  cart: ShoppingCart;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.categories$ = this.categoryService.list().valueChanges();
    this.products$ = this.route.queryParamMap.pipe(
      switchMap(paramMap => {
        let category = paramMap.get('category');
        this.selectedCategory = category ? category.toLowerCase() : null;

        return this.productService.list(this.selectedCategory);
      })
    );
    this.subscription = (await this.cartService.getCart()).valueChanges().subscribe(cart => {
      this.cart = cart;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
