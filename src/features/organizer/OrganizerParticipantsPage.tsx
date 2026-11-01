import { useMemo, useState } from 'react';
import { Search, UserCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { PageHeader, PersonAvatar, StatusBadge, formatDate } from '@/components/shared';
import { eventParticipants } from '@/lib/mock/networking';
import type { Participant } from '@/lib/mock/types';

const ticketLabels: Record<Participant['ticketType'], string> = {
  standard: 'Standard',
  premium: 'Premium',
  vip: 'VIP',
};

export function OrganizerParticipantsPage() {
  const [query, setQuery] = useState('');
  const [ticket, setTicket] = useState('all');
  const [checkedInFilter, setCheckedInFilter] = useState('all');
  const [items, setItems] = useState<Participant[]>(eventParticipants);

  const filtered = useMemo(() => items.filter(p => {
    const q = query.trim().toLowerCase();
    if (q && !`${p.person.fullName} ${p.person.email ?? ''} ${p.person.company}`.toLowerCase().includes(q)) return false;
    if (ticket !== 'all' && p.ticketType !== ticket) return false;
    if (checkedInFilter === 'in' && !p.checkedIn) return false;
    if (checkedInFilter === 'out' && p.checkedIn) return false;
    return true;
  }), [items, query, ticket, checkedInFilter]);

  function toggleCheckIn(id: string) {
    setItems(prev => prev.map(p => p.id === id ? {
      ...p,
      checkedIn: !p.checkedIn,
      checkedInAt: !p.checkedIn ? new Date().toISOString() : undefined,
    } : p));
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Participants"
        description="Salon Innovation 2026 — inscrits, billets et contrôle d’accès."
        actions={
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <UserCheck className="size-4" />
            {items.filter(p => p.checkedIn).length} / {items.length} présents
          </div>
        }
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un participant…" className="pl-9" />
        </div>
        <Select value={ticket} onValueChange={setTicket}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Billet" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les billets</SelectItem>
            <SelectItem value="standard">Standard</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="vip">VIP</SelectItem>
          </SelectContent>
        </Select>
        <Select value={checkedInFilter} onValueChange={setCheckedInFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Présence" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            <SelectItem value="in">Présents</SelectItem>
            <SelectItem value="out">Non présents</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Participant</TableHead>
                <TableHead>Billet</TableHead>
                <TableHead>Inscrit le</TableHead>
                <TableHead>Présence</TableHead>
                <TableHead className="w-px" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="min-w-44 whitespace-normal">
                    <div className="flex items-center gap-3">
                      <PersonAvatar person={p.person} size="sm" />
                      <div>
                        <p className="font-medium">{p.person.fullName}</p>
                        <p className="text-xs text-muted-foreground">{p.person.title} — {p.person.company}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{ticketLabels[p.ticketType]}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(p.registeredAt)}</TableCell>
                  <TableCell>
                    {p.checkedIn ? (
                      <StatusBadge status="attended" label={`Présent ${p.checkedInAt ? `· ${new Date(p.checkedInAt).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}` : ''}`} />
                    ) : (
                      <StatusBadge status="pending" label="Absent" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={p.checkedIn ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => { toggleCheckIn(p.id); toast.success(p.checkedIn ? 'Présence retirée' : `${p.person.fullName} marqué·e présent·e`); }}
                    >
                      {p.checkedIn ? 'Retirer' : 'Check-in'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    Aucun participant ne correspond aux filtres.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
