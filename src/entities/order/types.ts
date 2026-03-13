export type OrderStatus = 'pending' | 'in_progress' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  clientId: string;
  status: OrderStatus;
  bottlesOrdered: number;
  bottlesReturned: number;
  totalAmount: number;
  deliveryDate: string;
  createdAt: string;
}
