import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, UsersRound } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockEmployees, EmployeeRole, roleLabels } from '@/shared/data/mockEmployees';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { formatPhone } from '@/shared/lib/format';

const roleColors: Record<EmployeeRole, string> = {
  admin: 'bg-destructive/10 text-destructive border-destructive/20',
  driver: 'bg-primary/10 text-primary border-primary/20',
  manager: 'bg-success/10 text-success border-success/20',
};

export default function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'All' | EmployeeRole>('All');
  const [page, setPage] = useState(1);
  const perPage = 10;
  const debouncedSearch = useDebounce(search, 300);

  const filtered = useMemo(() => {
    return mockEmployees.filter(e => {
      const matchSearch = !debouncedSearch || e.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchRole = roleFilter === 'All' || e.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [debouncedSearch, roleFilter]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hodimlar</h1>
        <p className="text-muted-foreground text-sm mt-1">Jamoangizni boshqaring</p>
      </div>

      {/* Filters */}
      <Card className="rounded-2xl shadow-sm border-border/60">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Ism bo'yicha qidirish..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="pl-9 rounded-xl"
              />
            </div>
            <Select value={roleFilter} onValueChange={(v) => { setRoleFilter(v as typeof roleFilter); setPage(1); }}>
              <SelectTrigger className="w-full sm:w-[160px] rounded-xl">
                <SelectValue placeholder="Lavozim" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">Barcha lavozimlar</SelectItem>
                <SelectItem value="admin">Administrator</SelectItem>
                <SelectItem value="driver">Haydovchi</SelectItem>
                <SelectItem value="manager">Menejer</SelectItem>
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
              <TableHead className="font-semibold">Lavozim</TableHead>
              <TableHead className="font-semibold">Telefon</TableHead>
              <TableHead className="font-semibold text-center">Holat</TableHead>
              <TableHead className="font-semibold">Qo'shilgan sana</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((emp, i) => (
              <motion.tr
                key={emp.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="border-b border-border/40 hover:bg-accent/40 transition-colors"
              >
                <TableCell className="font-medium">{emp.name}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[10px] rounded-full px-2 py-0.5 ${roleColors[emp.role]}`}>
                    {roleLabels[emp.role]}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatPhone(emp.phone)}</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline" className={`text-[10px] rounded-full px-2 py-0.5 ${emp.status === 'active' ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground border-border'}`}>
                    {emp.status === 'active' ? 'Faol' : 'Nofaol'}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{emp.createdAt}</TableCell>
              </motion.tr>
            ))}
            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  Hodimlar topilmadi.
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