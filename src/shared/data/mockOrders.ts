import { Order } from '@/entities/order/types';

export const mockOrders: Order[] = [
  {
    id: 'o1', clientId: '1', status: 'delivered', bottlesOrdered: 10, bottlesReturned: 8,
    totalAmount: 120000, deliveryDate: '2025-03-10', createdAt: '2025-03-09',
  },
  {
    id: 'o2', clientId: '3', status: 'pending', bottlesOrdered: 15, bottlesReturned: 0,
    totalAmount: 180000, deliveryDate: '2025-03-14', createdAt: '2025-03-13',
  },
  {
    id: 'o3', clientId: '2', status: 'in_progress', bottlesOrdered: 5, bottlesReturned: 3,
    totalAmount: 60000, deliveryDate: '2025-03-14', createdAt: '2025-03-13',
  },
  {
    id: 'o4', clientId: '4', status: 'delivered', bottlesOrdered: 3, bottlesReturned: 2,
    totalAmount: 36000, deliveryDate: '2025-03-12', createdAt: '2025-03-11',
  },
  {
    id: 'o5', clientId: '6', status: 'cancelled', bottlesOrdered: 8, bottlesReturned: 0,
    totalAmount: 96000, deliveryDate: '2025-03-11', createdAt: '2025-03-10',
  },
  {
    id: 'o6', clientId: '7', status: 'delivered', bottlesOrdered: 20, bottlesReturned: 18,
    totalAmount: 240000, deliveryDate: '2025-03-08', createdAt: '2025-03-07',
  },
  {
    id: 'o7', clientId: '5', status: 'pending', bottlesOrdered: 25, bottlesReturned: 0,
    totalAmount: 300000, deliveryDate: '2025-03-15', createdAt: '2025-03-14',
  },
  {
    id: 'o8', clientId: '1', status: 'in_progress', bottlesOrdered: 12, bottlesReturned: 0,
    totalAmount: 144000, deliveryDate: '2025-03-14', createdAt: '2025-03-14',
  },
];