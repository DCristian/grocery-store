import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import ThenableReference from 'firebase/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = '/products';

  constructor(
    private db: AngularFireDatabase
  ) {}

  private fireList(category: string = null): AngularFireList<Product>  {
    return this.db.list(this.baseUrl, ref => {
      return category ? ref.orderByChild('category').equalTo(category) : ref;
    });
  }

  list(category: string = null): Observable<Product[]>  {
    let list$ = this.fireList(category);

    return list$.snapshotChanges()
      .pipe(
        map(actions => actions.map(a => {
          const $key = a.payload.key;
          return { $key, ...a.payload.val() };
        }))
      );
  }

  add(data: Product): ThenableReference {
    return this.db.list(this.baseUrl).push(data);
  }

  get(id: string): Observable<Product> {
    let object$ = this.db.object(this.baseUrl + '/' + id);

    return object$
      .snapshotChanges()
      .pipe(
        map((a) => {
          const $key = a.payload.key;
          return { $key, ...(a.payload.val() as Product) };
        })
      );
  }

  update(uid: string, data: Product): Promise<void> {
    return this.db.object(this.baseUrl + '/' + uid).update(data);
  }

  delete(uid: string): Promise<void> {
    return this.db.object(this.baseUrl + '/' + uid).remove();
  }
}
