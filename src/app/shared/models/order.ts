export interface Order {
  $key?: string;
  datePlaced: number;
  userId: string;
  shipping: any;
  totalPrice: number;
  items: any[];
}
