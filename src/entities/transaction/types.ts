export type TransactionType = 'payment' | 'charge' | 'bottle_penalty' | 'refund';

export interface Transaction {
  id: string;
  clientId: string;
  type: TransactionType;
  amount: number;
  description: string;
  createdAt: string;
}
