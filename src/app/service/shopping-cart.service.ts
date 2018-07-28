import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import ThenableReference = firebase.database.ThenableReference;
import { take } from 'rxjs/operators';

import { ShoppingCartItem } from '../model/shopping-cart-item';
import { ShoppingCart } from '../model/shopping-cart';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private baseUrl = '/shopping-carts';

  constructor(
    private db: AngularFireDatabase
  ) {}

  async addToCart(product: Product): Promise<void> {
    await this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product): Promise<void> {
    await this.updateItemQuantity(product, -1);
  }

  private async updateItemQuantity(product: Product, change: number): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$.snapshotChanges().pipe(take(1)).subscribe(item => {
      let newQuantity = (item.payload.val() ? item.payload.val().quantity : 0) + change;
      if (newQuantity <= 0) {
        return item$.remove();
      }

      let itemProduct: Product = JSON.parse(JSON.stringify(product));
      delete itemProduct.$key;
      return item$.set({ product: itemProduct, quantity: newQuantity });
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();

    return this.db.object(this.baseUrl + '/' + cartId);
  }

  async clearCart(): Promise<void> {
    let cartId = await this.getOrCreateCartId();
    await this.db.object(this.baseUrl + '/' + cartId + '/items').remove();
  }

  private getItem(cartId: string, productId: string): AngularFireObject<ShoppingCartItem> {
    return this.db.object(this.baseUrl + '/' + cartId + '/items/' + productId);
  }

  private createCart(): ThenableReference {
    return this.db.list(this.baseUrl).push({
      date: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      cartId = await this.createCart().key;
      localStorage.setItem('cartId', cartId);
    }

    return cartId;
  }
}
