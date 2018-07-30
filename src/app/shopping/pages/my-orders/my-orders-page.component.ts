import { Component, OnInit } from '@angular/core';
import {Observable } from 'rxjs';

import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders-page.component.html'
})
export class MyOrdersPageComponent implements OnInit {
  orders: Observable<Order[]>;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orders = this.orderService.list().valueChanges();
  }
}
