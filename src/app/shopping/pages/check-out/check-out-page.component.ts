import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCardUtility } from '../../../shared/utilities/shopping-card.utility';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartItem } from '../../../shared/models/shopping-cart-item';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/services/auth.service';
import { OrderUtility } from '../../../shared/utilities/order.utility';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out-page.component.html'
})
export class CheckOutPageComponent implements OnInit, OnDestroy {
  shippingForm: FormGroup;
  cart: ShoppingCart;
  items: ShoppingCartItem[];
  itemsCount: number;
  itemsTotalPrice: number;
  cartSubscription: Subscription;
  userSubscription: Subscription;
  userId: string;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.shippingForm = formBuilder.group({
      'name': ['', Validators.required],
      'address': formBuilder.group({
        'line1': ['', Validators.required],
        'line2': [''],
        'city': ['', Validators.required],
      })
    });
  }

  async ngOnInit() {
    this.cartSubscription = (await this.cartService.getCart()).valueChanges().subscribe(cart => {
      this.cart = cart;
      this.itemsCount = ShoppingCardUtility.getTotalItemsCount(cart);
      this.itemsTotalPrice = ShoppingCardUtility.getTotalItemsPrice(cart);
      this.items = ShoppingCardUtility.getItems(cart);
    });
    this.userSubscription = this.authService.getUser$().subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  get name(): AbstractControl {
    return this.shippingForm.get('name');
  }

  get addressLine1(): AbstractControl {
    return this.shippingForm.get('address').get('line1');
  }

  get addressCity(): AbstractControl {
    return this.shippingForm.get('address').get('city');
  }

  async submit(): Promise<void> {
    let form = this.shippingForm;

    if (!form.valid) {
      return;
    }

    let request = OrderUtility.getorderRequest(this.userId, this.shippingForm.getRawValue(), this.items);

    // TODO: add transaction
    let result = await this.orderService.save(request);
    await this.cartService.clearCart();

    await this.router.navigate(['/order-success', result.key]);
  }
}
