import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import ThenableReference = firebase.database.ThenableReference;

import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = '/orders';

  constructor(
    private db: AngularFireDatabase
  ) {}

  save(data: any): ThenableReference {
    return this.db.list(this.baseUrl).push(data);
  }

  list(userId: string = null): AngularFireList<Order>  {
    return this.db.list(this.baseUrl, ref => {
      return userId ? ref.orderByChild('userId').equalTo(userId) : ref;
    });
  }
}
