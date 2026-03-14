export interface Lead {
  id: string;
  name: string;
  phone: string;
  company?: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
  notes?: string;
  createdAt: string;
}

export const mockLeads: Lead[] = [
  { id: 'l1', name: 'Sherzod Toshmatov', phone: '+998901112233', company: 'Tech Solutions', source: 'Veb-sayt', status: 'new', createdAt: '2025-03-13' },
  { id: 'l2', name: 'Gulnora Karimova', phone: '+998935554433', source: 'Telefon', status: 'contacted', notes: 'Ofis uchun suv kerak', createdAt: '2025-03-12' },
  { id: 'l3', name: 'Botir Rahimov', phone: '+998712228877', company: 'Mega Trade', source: 'Reklama', status: 'qualified', createdAt: '2025-03-11' },
  { id: 'l4', name: 'Nilufar Saidova', phone: '+998941119988', source: 'Tavsiya', status: 'new', createdAt: '2025-03-10' },
  { id: 'l5', name: 'Alisher Navoi', phone: '+998907776655', company: 'Green Energy', source: 'Veb-sayt', status: 'contacted', createdAt: '2025-03-09' },
  { id: 'l6', name: 'Dildora Yusupova', phone: '+998933332211', source: 'Telefon', status: 'converted', createdAt: '2025-03-08' },
  { id: 'l7', name: 'Rustam Kamilov', phone: '+998711114455', company: 'Office Plus', source: 'Reklama', status: 'qualified', createdAt: '2025-03-07' },
  { id: 'l8', name: 'Zulfiya Ergasheva', phone: '+998945557788', source: 'Tavsiya', status: 'new', createdAt: '2025-03-06' },
  { id: 'l9', name: 'Otabek Mirzaev', phone: '+998909998877', company: 'Fast Delivery', source: 'Veb-sayt', status: 'contacted', createdAt: '2025-03-05' },
  { id: 'l10', name: 'Madina Rashidova', phone: '+998931116677', source: 'Telefon', status: 'new', createdAt: '2025-03-04' },
  { id: 'l11', name: 'Jasur Tursunov', phone: '+998712223366', company: 'Aqua Systems', source: 'Reklama', status: 'qualified', createdAt: '2025-03-03' },
  { id: 'l12', name: 'Sevara Umarova', phone: '+998947778899', source: 'Tavsiya', status: 'new', createdAt: '2025-03-02' },
];