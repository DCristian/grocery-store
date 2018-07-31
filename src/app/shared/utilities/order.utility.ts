import { Order } from '../models/order';

export class OrderUtility {
  static getOrderRequest(userId: string, shipping: any, items: any[]): Order {
    return {
      userId: userId,
      datePlaced: new Date().getTime(),
      shipping: shipping,
      totalPrice: items.reduce((total, item) => total + item.quantity * item.product.price, 0),
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
