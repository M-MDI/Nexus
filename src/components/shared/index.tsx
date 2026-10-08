import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Inbox } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { MeetingStatus, Person } from '@/lib/mock/types';

export function PageHeader({
  title,
  description,
  actions,
  backTo,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  backTo?: { to: string; label: string };
}) {
  return (
    <header>
      {backTo && (
        <Button variant="ghost" size="sm" className="mb-2 -ml-2 text-muted-foreground" asChild>
          <Link to={backTo.to}>
            <ArrowLeft className="mr-1 size-4" /> {backTo.label}
          </Link>
        </Button>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}

const statusStyles: Record<string, string> = {
  // events
  published: 'bg-info-surface text-info border-info-border',
  upcoming: 'bg-info-surface text-info border-info-border',
  ongoing: 'bg-warning-surface text-warning border-warning-border',
  past: 'bg-muted text-muted-foreground border-border',
  cancelled: 'bg-error-surface text-error border-error-border',
  draft: 'bg-muted text-muted-foreground border-border',
  // participation
  registered: 'bg-info-surface text-info border-info-border',
  waitlist: 'bg-warning-surface text-warning border-warning-border',
  attended: 'bg-success-surface text-success border-success-border',
  // meetings
  requested: 'bg-warning-surface text-warning border-warning-border',
  proposed: 'bg-info-surface text-info border-info-border',
  confirmed: 'bg-success-surface text-success border-success-border',
  countered: 'bg-proposal-surface text-proposal border-proposal-border',
  declined: 'bg-error-surface text-error border-error-border',
  completed: 'bg-muted text-muted-foreground border-border',
  expired: 'bg-muted text-muted-foreground border-border',
  // connections
  pending: 'bg-warning-surface text-warning border-warning-border',
  accepted: 'bg-success-surface text-success border-success-border',
  active: 'bg-success-surface text-success border-success-border',
  invited: 'bg-info-surface text-info border-info-border',
  suspended: 'bg-error-surface text-error border-error-border',
  trialing: 'bg-info-surface text-info border-info-border',
  past_due: 'bg-warning-surface text-warning border-warning-border',
};

const statusLabels: Record<string, string> = {
  published: 'Publié',
  upcoming: 'À venir',
  ongoing: 'En cours',
  past: 'Passé',
  cancelled: 'Annulé',
  draft: 'Brouillon',
  registered: 'Inscrit',
  waitlist: 'Liste d’attente',
  attended: 'Participé',
  requested: 'Demandé',
  proposed: 'Proposé',
  confirmed: 'Confirmé',
  countered: 'Contre-proposition',
  declined: 'Refusé',
  completed: 'Terminé',
  expired: 'Expiré',
  pending: 'En attente',
  accepted: 'Accepté',
  active: 'Actif',
  invited: 'Invité',
  suspended: 'Suspendu',
  trialing: 'Essai',
  past_due: 'Impayé',
};

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  return (
    <Badge variant="outline" className={cn('font-medium', statusStyles[status] ?? 'bg-muted text-muted-foreground')}>
      {label ?? statusLabels[status] ?? status}
    </Badge>
  );
}

export function MeetingStatusBadge({ status }: { status: MeetingStatus }) {
  return <StatusBadge status={status} />;
}

export function PersonAvatar({ person, size = 'md' }: { person: Person; size?: 'sm' | 'md' | 'lg' }) {
  const initials = person.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const sizes = { sm: 'size-8 text-xs', md: 'size-10 text-sm', lg: 'size-16 text-xl' };
  return (
    <Avatar className={sizes[size]}>
      {person.avatarUrl && <AvatarImage src={person.avatarUrl} alt={person.fullName} />}
      <AvatarFallback className="bg-info-surface text-info font-semibold">{initials}</AvatarFallback>
    </Avatar>
  );
}

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card px-6 py-9 text-center', className)}>
      <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted">
        <Inbox className="size-6 text-icon" />
      </div>
      <h3 className="font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function formatDate(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(iso?: string) {
  if (!iso) return '—';
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}
