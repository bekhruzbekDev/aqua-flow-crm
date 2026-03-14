import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { mockLeads, Lead } from '@/shared/data/mockLeads';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { CreateClientForm } from '@/features/CreateClientForm';
import { toast } from '@/hooks/use-toast';

const statusLabels: Record<Lead['status'], string> = {
  new: 'Yangi',
  contacted: 'Bog\'lanildi',
  qualified: 'Malakali',
  converted: 'Mijozga aylandi',
};

const statusColors: Record<Lead['status'], string> = {
  new: 'bg-primary/10 text-primary border-primary/20',
  contacted: 'bg-warning/10 text-warning border-warning/20',
  qualified: 'bg-success/10 text-success border-success/20',
  converted: 'bg-muted text-muted-foreground border-border',
};

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | Lead['status']>('All');
  const [page, setPage] = useState(1);
  const [convertLead, setConvertLead] = useState<Lead | null>(null);
  const perPage = 10;
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    return mockLeads.filter(l => {
      const matchSearch = !debouncedSearch || l.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || l.phone.includes(debouncedSearch);
      const matchStatus = statusFilter === 'All' || l.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [debouncedSearch, statusFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Lidlar</h1>
          <p className="text-muted-foreground text-sm mt-1">Potentsial mijozlarni boshqaring va mijozga aylantiring</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl shadow-sm border-border/60">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ism yoki telefon bo'yicha qidirish..."
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
                <SelectItem value="new">Yangi</SelectItem>
                <SelectItem value="contacted">Bog'lanildi</SelectItem>
                <SelectItem value="qualified">Malakali</SelectItem>
                <SelectItem value="converted">Aylandi</SelectItem>
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
              <TableHead className="font-semibold">Ism</TableHead>
              <TableHead className="font-semibold">Telefon</TableHead>
              <TableHead className="font-semibold">Kompaniya</TableHead>
              <TableHead className="font-semibold">Manba</TableHead>
              <TableHead className="font-semibold text-center">Holat</TableHead>
              <TableHead className="font-semibold">Sana</TableHead>
              <TableHead className="font-semibold text-center w-20">Amal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((lead, i) => (
              <motion.tr
                key={lead.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/40 hover:bg-accent/40 transition-colors"
              >
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{lead.phone}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{lead.company || '—'}</TableCell>
                <TableCell className="text-sm">{lead.source}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={`text-[10px] rounded-full px-2 py-0.5 ${statusColors[lead.status]}`}>
                    {statusLabels[lead.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{lead.createdAt}</TableCell>
                <TableCell className="text-center">
                  {lead.status !== 'converted' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 rounded-lg text-xs text-primary hover:text-primary"
                      onClick={() => setConvertLead(lead)}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </motion.tr>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                  Lidlar topilmadi.
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

      {/* Convert to Client Dialog */}
      <Dialog open={!!convertLead} onOpenChange={(open) => !open && setConvertLead(null)}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mijozga aylantirish</DialogTitle>
          </DialogHeader>
          {convertLead && (
            <CreateClientForm
              onClose={() => setConvertLead(null)}
              initialData={{
                name: convertLead.name,
                phone: convertLead.phone,
                company: convertLead.company,
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}