import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';
import { AuthService } from '../../../shared/services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders-page.component.html'
})
export class MyOrdersPageComponent implements OnInit {
  orders: Observable<Order[]>;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUser$().pipe(take(1)).subscribe(user => {
      this.orders = this.orderService.list(user.uid);
    });
  }
}
