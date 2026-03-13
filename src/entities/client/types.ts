export type ClientType = 'B2C' | 'B2B';

export type DebtStatus = 'prepaid' | 'zero' | 'debt';

export interface ClientGeo {
  lat: number;
  lng: number;
}

export interface PromiseToPay {
  id: string;
  date: string;
  amount: number;
  operatorNote: string;
  resolved: boolean;
}

export interface Client {
  id: string;
  type: ClientType;
  name: string;
  company?: string;
  phone: string;
  region: string;
  address: string;
  geo?: ClientGeo;
  customPrice?: number;
  balance: number;
  creditLimit: number;
  bottlesDelivered: number;
  bottlesReturned: number;
  bottlesBrokenLost: number;
  isStopListed: boolean;
  createdAt: string;
  updatedAt: string;
  promisesToPay: PromiseToPay[];
  subscriptionSchedule?: string;
}

export function getBottleBalance(client: Client): number {
  return client.bottlesDelivered - client.bottlesReturned - client.bottlesBrokenLost;
}

export function getDebtStatus(client: Client): DebtStatus {
  if (client.balance > 0) return 'prepaid';
  if (client.balance === 0) return 'zero';
  return 'debt';
}
