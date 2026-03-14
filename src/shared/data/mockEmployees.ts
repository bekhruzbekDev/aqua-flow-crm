export type EmployeeRole = 'admin' | 'driver' | 'manager';

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  phone: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const roleLabels: Record<EmployeeRole, string> = {
  admin: 'Administrator',
  driver: 'Haydovchi',
  manager: 'Menejer',
};

export const mockEmployees: Employee[] = [
  { id: 'e1', name: 'Akbar Yusupov', role: 'admin', phone: '+998901234567', status: 'active', createdAt: '2024-01-10' },
  { id: 'e2', name: 'Sanjar Karimov', role: 'driver', phone: '+998931112233', status: 'active', createdAt: '2024-02-15' },
  { id: 'e3', name: 'Bekzod Toshmatov', role: 'driver', phone: '+998712223344', status: 'active', createdAt: '2024-03-20' },
  { id: 'e4', name: 'Dilmurod Ergashev', role: 'manager', phone: '+998951234567', status: 'active', createdAt: '2024-04-01' },
  { id: 'e5', name: 'Farhod Mirzaev', role: 'driver', phone: '+998903334455', status: 'inactive', createdAt: '2024-05-10' },
  { id: 'e6', name: 'Jamshid Rakhimov', role: 'manager', phone: '+998947778899', status: 'active', createdAt: '2024-06-15' },
  { id: 'e7', name: 'Nodir Abdullaev', role: 'driver', phone: '+998901009988', status: 'active', createdAt: '2024-07-01' },
  { id: 'e8', name: 'Sardor Nazarov', role: 'admin', phone: '+998935556677', status: 'active', createdAt: '2024-08-20' },
];