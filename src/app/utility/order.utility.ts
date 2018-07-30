import { Order } from '../model/order';

export class OrderUtility {
  static getorderRequest(userId: string, shipping: any, items: any[]): Order {
    return {
      userId: userId,
      datePlaced: new Date().getTime(),
      shipping: shipping,
      items: items.map(item => {
        return {
          product: {
            title: item.product.title,
            imageUrl: item.product.imageUrl,
            price: item.product.price
          },
          quantity: item.quantity,
          totalPrice: item.quantity * item.product.price
        };
      })
    };
  }
}
