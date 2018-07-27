import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ProductComponent } from '../product/product.component';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {
  @ViewChild('form') private productComponent: ProductComponent;

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
