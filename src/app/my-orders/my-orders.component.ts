import { Component, OnInit } from '@angular/core';
import {Observable } from 'rxjs';

import { OrderService } from '../service/order.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html'
})
export class MyOrdersComponent implements OnInit {
  orders: Observable<Order[]>;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.orders = this.orderService.list().valueChanges();
  }
}
