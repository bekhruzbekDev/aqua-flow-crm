import { Badge } from '@/components/ui/badge';
import { ClientType } from '@/entities/client/types';

export function ClientTypeBadge({ type }: { type: ClientType }) {
  return (
    <Badge
      variant={type === 'B2B' ? 'default' : 'secondary'}
      className="text-xs font-medium rounded-full"
    >
      {type}
    </Badge>
  );
}
