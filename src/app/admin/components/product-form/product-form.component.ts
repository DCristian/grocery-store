import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Category } from '../../../shared/models/category';
import { CategoryService } from '../../../shared/services/category.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product-form.component.html'
})
export class ProductFormComponent implements OnInit, OnChanges {
  public static NUMBER_PATTERN = /^[+]?([.]\d+|\d+[.]?\d*)$/;
  public static URL_PATTERN = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;

  @Input() product?: Product = {
    title: '',
    price: null,
    category: '',
    imageUrl: '',
  };

  form: FormGroup;
  categories$: Observable<Category[]>;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService
  ) {
    this.form = formBuilder.group({
      'title': [
        this.product.title,
        Validators.required
      ],
      'price': [
        this.product.price,
        [
          Validators.required,
          Validators.pattern(ProductFormComponent.NUMBER_PATTERN)
        ]
      ],
      'category': [
        this.product.category,
        Validators.required
      ],
      'imageUrl': [
        this.product.imageUrl,
        [
          Validators.required,
          Validators.pattern(ProductFormComponent.URL_PATTERN)
        ]
      ],
    });
  }

  ngOnInit() {
    this.categories$ = this.categoryService.list().valueChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] &&
      changes['product'].currentValue !== undefined &&
      changes['product'].currentValue !== null
    ) {
      this.product = changes['product'].currentValue;
      this.form.patchValue({
        title: this.product.title,
        price: this.product.price,
        category: this.product.category,
        imageUrl: this.product.imageUrl,
      });
    }
  }

  get title(): AbstractControl {
    return this.form.get('title');
  }

  get category(): AbstractControl {
    return this.form.get('category');
  }

  get price(): AbstractControl {
    return this.form.get('price');
  }

  get imageUrl(): AbstractControl {
    return this.form.get('imageUrl');
  }
}
