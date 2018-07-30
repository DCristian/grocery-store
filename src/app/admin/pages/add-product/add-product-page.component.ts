import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product-page.component.html'
})
export class AddProductPageComponent {
  @ViewChild('form') private productComponent: ProductFormComponent;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  async submit(): Promise<void> {
    let form = this.productComponent.form;

    if (!form.valid) {
      return;
    }

    let request = form.getRawValue();
    request.price = +request.price;

    await this.productService.add(request);
    await this.router.navigate(['/admin/products']);
  }

  reset(): void {
    this.productComponent.form.reset();
  }
}
