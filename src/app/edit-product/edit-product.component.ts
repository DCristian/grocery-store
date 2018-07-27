import {Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {
  uid: string;
  product: Product;
  @ViewChild('form') private productComponent: ProductComponent;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.uid = this.route.snapshot.paramMap.get('productUid');
    this.productService
      .get(this.uid)
      .valueChanges()
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

    await this.productService.update(this.uid, request);
    await this.router.navigate(['/admin/products']);
  }

  async delete(): Promise<void> {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    await this.productService.delete(this.uid);
    await this.router.navigate(['/admin/products']);
  }
}
