import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockOrders } from '@/shared/data/mockOrders';
import { mockClients } from '@/shared/data/mockClients';
import { OrderStatus } from '@/entities/order/types';
import { formatCurrency } from '@/shared/lib/format';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { toast } from '@/hooks/use-toast';

const statusLabels: Record<OrderStatus, string> = {
  pending: 'Kutilmoqda',
  in_progress: 'Yetkazilmoqda',
  delivered: 'Yetkazildi',
  cancelled: 'Bekor qilindi',
};

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  in_progress: 'bg-primary/10 text-primary border-primary/20',
  delivered: 'bg-success/10 text-success border-success/20',
  cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
};

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const perPage = 10;
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    return mockOrders.filter(o => {
      const client = mockClients.find(c => c.id === o.clientId);
      const matchSearch = !debouncedSearch || client?.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchStatus = statusFilter === 'All' || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [debouncedSearch, statusFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Buyurtmalar</h1>
          <p className="text-muted-foreground text-sm mt-1">Barcha buyurtmalarni boshqaring</p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Yangi buyurtma
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Yangi buyurtma yaratish</DialogTitle>
            </DialogHeader>
            <CreateOrderForm onClose={() => setCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl shadow-sm border-border/60">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Mijoz nomi bo'yicha qidirish..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 rounded-xl"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as typeof statusFilter); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[160px] rounded-xl">
                <SelectValue placeholder="Holat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Barcha holatlar</SelectItem>
                <SelectItem value="pending">Kutilmoqda</SelectItem>
                <SelectItem value="in_progress">Yetkazilmoqda</SelectItem>
                <SelectItem value="delivered">Yetkazildi</SelectItem>
                <SelectItem value="cancelled">Bekor qilindi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="rounded-2xl shadow-sm border-border/60 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Mijoz</TableHead>
              <TableHead className="font-semibold text-center">Idishlar</TableHead>
              <TableHead className="font-semibold text-center">Qaytarilgan</TableHead>
              <TableHead className="font-semibold text-right">Summa</TableHead>
              <TableHead className="font-semibold text-center">Holat</TableHead>
              <TableHead className="font-semibold">Sana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((order, i) => {
              const client = mockClients.find(c => c.id === order.clientId);
              return (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/40 hover:bg-accent/40 transition-colors"
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">#{order.id}</TableCell>
                  <TableCell className="font-medium">{client?.name || '—'}</TableCell>
                  <TableCell className="text-center">{order.bottlesOrdered}</TableCell>
                  <TableCell className="text-center">{order.bottlesReturned}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`text-[10px] rounded-full px-2 py-0.5 ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{order.deliveryDate}</TableCell>
                </motion.tr>
              );
            })}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  Buyurtmalar topilmadi.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} tadan {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} ko'rsatilmoqda
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setPage(p => p - 1)} disabled={page === 1}>Oldingi</Button>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>Keyingi</Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function CreateOrderForm({ onClose }: { onClose: () => void }) {
  const [clientId, setClientId] = useState('');
  const [bottles, setBottles] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId || !bottles || !date) {
      toast({ title: 'Xatolik', description: 'Barcha maydonlarni to\'ldiring', variant: 'destructive' });
      return;
    }
    toast({ title: 'Muvaffaqiyat', description: 'Buyurtma muvaffaqiyatli yaratildi' });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Mijoz *</Label>
        <Select value={clientId} onValueChange={setClientId}>
          <SelectTrigger className="rounded-xl">
            <SelectValue placeholder="Mijozni tanlang" />
          </SelectTrigger>
          <SelectContent>
            {mockClients.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}{c.company ? ` (${c.company})` : ''}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Idishlar soni *</Label>
          <Input type="number" value={bottles} onChange={(e) => setBottles(e.target.value)} placeholder="0" className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Yetkazish sanasi *</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-xl" />
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="outline" className="flex-1 rounded-xl" onClick={onClose}>Bekor qilish</Button>
        <Button type="submit" className="flex-1 rounded-xl">Yaratish</Button>
      </div>
    </form>
  );
}