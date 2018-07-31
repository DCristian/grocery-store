import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import ThenableReference = firebase.database.ThenableReference;
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = '/orders';

  constructor(
    private db: AngularFireDatabase
  ) {}

  get(id: string): Observable<Order> {
    let object$ = this.db.object(this.baseUrl + '/' + id);

    return object$
      .snapshotChanges()
      .pipe(
        map((a) => {
          const $key = a.payload.key;
          return { $key, ...(a.payload.val() as Order) };
        })
      );
  }

  save(data: any): ThenableReference {
    return this.db.list(this.baseUrl).push(data);
  }

  list(userId: string = null): Observable<Order[]>  {
    let list$ = this.db.list(this.baseUrl, ref => {
      return userId ? ref.orderByChild('userId').equalTo(userId) : ref;
    });

    return list$.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const $key = a.payload.key;
          return { $key, ...(a.payload.val() as Order) };
        }))
      );
  }
}
