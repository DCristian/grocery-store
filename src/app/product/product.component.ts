import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnChanges {
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
          Validators.pattern(ProductComponent.NUMBER_PATTERN)
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
          Validators.pattern(ProductComponent.URL_PATTERN)
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
