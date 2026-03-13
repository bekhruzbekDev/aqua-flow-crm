import { Client } from '@/entities/client/types';

const regions = ['Tashkent Center', 'Chilanzar', 'Yunusabad', 'Mirzo Ulugbek', 'Sergeli', 'Yakkasaray', 'Shaykhantaur'];

export const mockClients: Client[] = [
  {
    id: '1', type: 'B2B', name: 'Aziz Karimov', company: 'AquaTech LLC', phone: '+998901234567',
    region: 'Tashkent Center', address: 'Amir Temur Ave 42', geo: { lat: 41.311, lng: 69.279 },
    customPrice: 12000, balance: 540000, creditLimit: -200000,
    bottlesDelivered: 120, bottlesReturned: 95, bottlesBrokenLost: 3,
    isStopListed: false, createdAt: '2024-01-15', updatedAt: '2025-03-10',
    promisesToPay: [], subscriptionSchedule: 'Mon,Thu 10:00',
  },
  {
    id: '2', type: 'B2C', name: 'Nodira Usmanova', phone: '+998931112233',
    region: 'Chilanzar', address: 'Bunyodkor 15, apt 8',
    balance: 0, creditLimit: -100000,
    bottlesDelivered: 30, bottlesReturned: 28, bottlesBrokenLost: 0,
    isStopListed: false, createdAt: '2024-03-22', updatedAt: '2025-03-12',
    promisesToPay: [],
  },
  {
    id: '3', type: 'B2B', name: 'Sardor Rakhimov', company: 'Green Office Park', phone: '+998712223344',
    region: 'Yunusabad', address: 'Bogishamol 12',
    balance: -350000, creditLimit: -200000,
    bottlesDelivered: 200, bottlesReturned: 150, bottlesBrokenLost: 8,
    isStopListed: true, createdAt: '2023-11-05', updatedAt: '2025-03-13',
    promisesToPay: [{ id: 'p1', date: '2025-03-20', amount: 350000, operatorNote: 'Promised payment after salary', resolved: false }],
  },
  {
    id: '4', type: 'B2C', name: 'Malika Tursunova', phone: '+998951234567',
    region: 'Mirzo Ulugbek', address: 'Shahriston 5',
    balance: 120000, creditLimit: -50000,
    bottlesDelivered: 15, bottlesReturned: 12, bottlesBrokenLost: 1,
    isStopListed: false, createdAt: '2024-06-10', updatedAt: '2025-03-11',
    promisesToPay: [],
  },
  {
    id: '5', type: 'B2B', name: 'Dilshod Ergashev', company: 'Summit Business Center', phone: '+998903334455',
    region: 'Sergeli', address: 'Sergeli Industrial 88',
    balance: -890000, creditLimit: -500000,
    bottlesDelivered: 500, bottlesReturned: 420, bottlesBrokenLost: 15,
    isStopListed: true, createdAt: '2023-06-01', updatedAt: '2025-03-13',
    promisesToPay: [{ id: 'p2', date: '2025-03-15', amount: 500000, operatorNote: 'Partial payment expected', resolved: false }],
  },
  {
    id: '6', type: 'B2C', name: 'Feruza Abdullaeva', phone: '+998947778899',
    region: 'Yakkasaray', address: 'Bobur St 33, apt 12',
    balance: 60000, creditLimit: -100000,
    bottlesDelivered: 22, bottlesReturned: 20, bottlesBrokenLost: 0,
    isStopListed: false, createdAt: '2024-09-01', updatedAt: '2025-03-08',
    promisesToPay: [],
  },
  {
    id: '7', type: 'B2B', name: 'Jahongir Mirzaev', company: 'Fresh Water Co', phone: '+998901009988',
    region: 'Shaykhantaur', address: 'Navoi Ave 100',
    balance: -45000, creditLimit: -200000,
    bottlesDelivered: 80, bottlesReturned: 72, bottlesBrokenLost: 2,
    isStopListed: false, createdAt: '2024-02-14', updatedAt: '2025-03-12',
    promisesToPay: [],
  },
  {
    id: '8', type: 'B2C', name: 'Kamola Nazarova', phone: '+998935556677',
    region: 'Tashkent Center', address: 'Mustaqillik 18',
    balance: 0, creditLimit: -50000,
    bottlesDelivered: 8, bottlesReturned: 8, bottlesBrokenLost: 0,
    isStopListed: false, createdAt: '2025-01-10', updatedAt: '2025-03-10',
    promisesToPay: [],
  },
];
