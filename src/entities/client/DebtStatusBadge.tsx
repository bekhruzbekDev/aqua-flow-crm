import { Badge } from '@/components/ui/badge';
import { Client, getDebtStatus } from '@/entities/client/types';
import { cn } from '@/lib/utils';

interface DebtStatusBadgeProps {
  client: Client;
}

export function DebtStatusBadge({ client }: DebtStatusBadgeProps) {
  const status = getDebtStatus(client);
  
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs font-semibold px-2.5 py-0.5 rounded-full',
        status === 'prepaid' && 'status-prepaid',
        status === 'zero' && 'status-zero',
        status === 'debt' && 'status-debt',
      )}
    >
      {status === 'prepaid' && 'Prepaid'}
      {status === 'zero' && 'Zero'}
      {status === 'debt' && 'Debt'}
    </Badge>
  );
}
