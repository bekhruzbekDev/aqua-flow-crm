import { motion } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Ban } from 'lucide-react';
import { Client, getBottleBalance } from '@/entities/client/types';
import { DebtStatusBadge } from '@/entities/client/DebtStatusBadge';
import { ClientTypeBadge } from '@/entities/client/ClientTypeBadge';
import { formatCurrency, formatPhone } from '@/shared/lib/format';
import { useNavigate } from 'react-router-dom';

interface ClientManagementTableProps {
  clients: Client[];
}

export function ClientManagementTable({ clients }: ClientManagementTableProps) {
  const navigate = useNavigate();

  return (
    <Card className="rounded-2xl shadow-sm border-border/60 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="font-semibold">Mijoz</TableHead>
            <TableHead className="font-semibold">Turi</TableHead>
            <TableHead className="font-semibold">Hudud</TableHead>
            <TableHead className="font-semibold text-center">Idishlar</TableHead>
            <TableHead className="font-semibold text-right">Balans</TableHead>
            <TableHead className="font-semibold text-center">Holat</TableHead>
            <TableHead className="font-semibold text-center w-20">Amallar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client, i) => (
            <motion.tr
              key={client.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03, duration: 0.2 }}
              className="border-b border-border/40 hover:bg-accent/40 transition-colors cursor-pointer"
              onClick={() => navigate(`/clients/${client.id}`)}
            >
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{client.name}</span>
                  {client.company && (
                    <span className="text-xs text-muted-foreground">{client.company}</span>
                  )}
                  <span className="text-xs text-muted-foreground">{formatPhone(client.phone)}</span>
                </div>
              </TableCell>
              <TableCell>
                <ClientTypeBadge type={client.type} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">{client.region}</TableCell>
              <TableCell className="text-center">
                <span className="font-semibold">{getBottleBalance(client)}</span>
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(client.balance)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <DebtStatusBadge client={client} />
                  {client.isStopListed && (
                    <Badge variant="destructive" className="text-[10px] rounded-full px-2 py-0">
                      <Ban className="h-3 w-3 mr-0.5" /> STOP
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/clients/${client.id}`);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </TableCell>
            </motion.tr>
          ))}
          {clients.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                Filtrlarga mos mijozlar topilmadi.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}