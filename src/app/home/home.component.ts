import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CategoryService } from '../service/category.service';
import { ProductService } from '../service/product.service';
import { Category } from '../model/category';
import { Product } from '../model/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  categories$: Observable<Category[]>;
  selectedCategory: string;
  products$: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.categories$ = this.categoryService.list().valueChanges();
    this.products$ = this.route.queryParamMap.pipe(
      switchMap(paramMap => {
        let category = paramMap.get('category');
        this.selectedCategory = category ? category.toLowerCase() : null;

        return this.productService.list(this.selectedCategory).valueChanges();
      })
    );
  }
}
