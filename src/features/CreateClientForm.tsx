import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClientType } from '@/entities/client/types';
import { toast } from '@/hooks/use-toast';

const regions = ['Tashkent Center', 'Chilanzar', 'Yunusabad', 'Mirzo Ulugbek', 'Sergeli', 'Yakkasaray', 'Shaykhantaur'];

interface CreateClientFormProps {
  onClose: () => void;
  initialData?: {
    name?: string;
    phone?: string;
    company?: string;
  };
}

export function CreateClientForm({ onClose, initialData }: CreateClientFormProps) {
  const [clientType, setClientType] = useState<ClientType>('B2C');
  const [name, setName] = useState(initialData?.name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [company, setCompany] = useState(initialData?.company || '');
  const [region, setRegion] = useState('');
  const [address, setAddress] = useState('');
  const [inn, setInn] = useState('');
  const [mfo, setMfo] = useState('');
  const [contractNumber, setContractNumber] = useState('');
  const [contractDate, setContractDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !region) {
      toast({ title: 'Xatolik', description: 'Barcha majburiy maydonlarni to\'ldiring', variant: 'destructive' });
      return;
    }
    toast({ title: 'Muvaffaqiyat', description: `${name} muvaffaqiyatli qo'shildi` });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Mijoz turi</Label>
        <Select value={clientType} onValueChange={(v) => setClientType(v as ClientType)}>
          <SelectTrigger className="rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="B2C">B2C - Jismoniy shaxs</SelectItem>
            <SelectItem value="B2B">B2B - Yuridik shaxs</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Ism *</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="To'liq ism" className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Telefon *</Label>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+998 XX XXX XX XX" className="rounded-xl" />
        </div>
      </div>

      {clientType === 'B2B' && (
        <>
          <div className="space-y-2">
            <Label>Kompaniya nomi</Label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Kompaniya nomi" className="rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>INN</Label>
              <Input value={inn} onChange={(e) => setInn(e.target.value)} placeholder="INN raqami" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>MFO</Label>
              <Input value={mfo} onChange={(e) => setMfo(e.target.value)} placeholder="MFO raqami" className="rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Shartnoma raqami</Label>
              <Input value={contractNumber} onChange={(e) => setContractNumber(e.target.value)} placeholder="SH-001" className="rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Shartnoma sanasi</Label>
              <Input type="date" value={contractDate} onChange={(e) => setContractDate(e.target.value)} className="rounded-xl" />
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Hudud *</Label>
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Hududni tanlang" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((r) => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Manzil</Label>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Manzil" className="rounded-xl" />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={onClose}>
          Bekor qilish
        </Button>
        <Button type="submit" className="flex-1 rounded-xl">
          Saqlash
        </Button>
      </div>
    </form>
  );
}