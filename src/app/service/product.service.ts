import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import ThenableReference from 'firebase/database';

import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = '/products';

  constructor(
    private db: AngularFireDatabase
  ) {}

  list(): AngularFireList<Product>  {
    return this.db.list(this.baseUrl);
  }

  add(data: Product): ThenableReference {
    return this.db.list(this.baseUrl).push(data);
  }

  get(uid: string): AngularFireObject<Product> {
    return this.db.object(this.baseUrl + '/' + uid);
  }

  update(uid: string, data: Product): Promise<void> {
    return this.db.object(this.baseUrl + '/' + uid).update(data);
  }

  delete(uid: string): Promise<void> {
    return this.db.object(this.baseUrl + '/' + uid).remove();
  }
}
