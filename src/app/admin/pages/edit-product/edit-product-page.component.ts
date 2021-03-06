import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { ProductService } from '../../../shared/services/product.service';
import { Product } from '../../../shared/models/product';
import { ProductFormComponent } from '../../components/product-form/product-form.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product-page.component.html'
})
export class EditProductPageComponent implements OnInit {
  id: string;
  product: Product;
  @ViewChild('form') private productComponent: ProductFormComponent;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.productService
      .get(this.id)
      .pipe(take(1))
      .subscribe(product => this.product = product);
  }

  async submit(): Promise<void> {
    let form = this.productComponent.form;

    if (!form.valid) {
      return;
    }

    let request = form.getRawValue();
    request.price = +request.price;

    await this.productService.update(this.id, request);
    await this.router.navigate(['/admin/products']);
  }

  async delete(): Promise<void> {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    await this.productService.delete(this.id);
    await this.router.navigate(['/admin/products']);
  }
}
