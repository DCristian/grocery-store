import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = '/categories';

  constructor(
    private db: AngularFireDatabase
  ) {}

  list(): AngularFireList<Category>  {
    return this.db.list(this.baseUrl, ref => ref.orderByChild('name'));
  }
}
