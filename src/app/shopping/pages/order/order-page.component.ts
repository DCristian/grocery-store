import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'app-order',
  templateUrl: './order-page.component.html'
})
export class OrderPageComponent implements OnInit {
  id: string;
  order: Order;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.orderService
      .get(this.id)
      .pipe(take(1))
      .subscribe(order => {
        this.order = order;
      });
  }
}
