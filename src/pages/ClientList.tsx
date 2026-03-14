import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Users, Droplets, AlertTriangle, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { mockClients } from '@/shared/data/mockClients';
import { ClientType, DebtStatus, getDebtStatus, getBottleBalance } from '@/entities/client/types';
import { ClientManagementTable } from '@/widgets/ClientManagementTable';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreateClientForm } from '@/features/CreateClientForm';

const regions = ['All', 'Tashkent Center', 'Chilanzar', 'Yunusabad', 'Mirzo Ulugbek', 'Sergeli', 'Yakkasaray', 'Shaykhantaur'];

export default function ClientListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'All' | ClientType>('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<'All' | DebtStatus>('All');
  const [page, setPage] = useState(1);
  const [createOpen, setCreateOpen] = useState(false);
  const perPage = 10;

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredClients = useMemo(() => {
    return mockClients.filter((c) => {
      const matchesSearch =
        !debouncedSearch ||
        c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        c.company?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        c.phone.includes(debouncedSearch);
      const matchesType = typeFilter === 'All' || c.type === typeFilter;
      const matchesRegion = regionFilter === 'All' || c.region === regionFilter;
      const matchesStatus = statusFilter === 'All' || getDebtStatus(c) === statusFilter;
      return matchesSearch && matchesType && matchesRegion && matchesStatus;
    });
  }, [debouncedSearch, typeFilter, regionFilter, statusFilter]);

  const totalPages = Math.ceil(filteredClients.length / perPage);
  const paginatedClients = filteredClients.slice((page - 1) * perPage, page * perPage);

  const totalBottlesOut = filteredClients.reduce((sum, c) => sum + getBottleBalance(c), 0);
  const debtorsCount = filteredClients.filter((c) => getDebtStatus(c) === 'debt').length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mijozlar</h1>
          <p className="text-muted-foreground text-sm mt-1">
            B2B va B2C suv yetkazib berish mijozlarini boshqaring
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Yangi mijoz
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Yangi mijoz qo'shish</DialogTitle>
            </DialogHeader>
            <CreateClientForm onClose={() => setCreateOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="rounded-2xl shadow-sm border-border/60">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Jami mijozlar</p>
              <p className="text-2xl font-bold">{filteredClients.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-border/60">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
              <Droplets className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mijozlardagi idishlar</p>
              <p className="text-2xl font-bold">{totalBottlesOut}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm border-border/60">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="w-11 h-11 rounded-xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Qarzdorlar</p>
              <p className="text-2xl font-bold">{debtorsCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl shadow-sm border-border/60">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ism, kompaniya yoki telefon bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="pl-9 rounded-xl"
              />
            </div>
            <Select value={typeFilter} onValueChange={(v) => { setTypeFilter(v as typeof typeFilter); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[130px] rounded-xl">
                <SelectValue placeholder="Turi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Barcha turlar</SelectItem>
                <SelectItem value="B2B">B2B</SelectItem>
                <SelectItem value="B2C">B2C</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={(v) => { setRegionFilter(v); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[180px] rounded-xl">
                <SelectValue placeholder="Hudud" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((r) => (
                  <SelectItem key={r} value={r}>{r === 'All' ? 'Barcha hududlar' : r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v as typeof statusFilter); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[140px] rounded-xl">
                <SelectValue placeholder="Holat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Barcha holatlar</SelectItem>
                <SelectItem value="prepaid">Oldindan to'lov</SelectItem>
                <SelectItem value="zero">Nol</SelectItem>
                <SelectItem value="debt">Qarz</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <ClientManagementTable clients={paginatedClients} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredClients.length} tadan {(page - 1) * perPage + 1}–{Math.min(page * perPage, filteredClients.length)} ko'rsatilmoqda
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
              Oldingi
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
              Keyingi
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
}