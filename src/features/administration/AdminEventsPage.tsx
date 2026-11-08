import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
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
import { PageHeader, StatusBadge, formatDate } from '@/components/shared';
import { adminEvents } from '@/lib/mock/admin';

export function AdminEventsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const rows = useMemo(() => adminEvents.filter(e => {
    const q = query.trim().toLowerCase();
    if (q && !`${e.name} ${e.organizerName} ${e.location}`.toLowerCase().includes(q)) return false;
    if (status !== 'all' && e.status !== status) return false;
    return true;
  }), [query, status]);

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader title="Gestion des événements" description="Tous les événements publiés sur la plateforme." />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher…" className="pl-9" />
        </div>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="published">Publié</SelectItem>
            <SelectItem value="past">Passé</SelectItem>
            <SelectItem value="cancelled">Annulé</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Événement</TableHead>
                <TableHead>Organisateur</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Lieu</TableHead>
                <TableHead>Inscrits</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(e => (
                <TableRow key={e.id}>
                  <TableCell className="min-w-32 whitespace-normal">
                    <p className="font-medium">{e.name}</p>
                    <Link to={`/events/${e.id}`} className="text-xs text-primary hover:underline">Voir la fiche</Link>
                  </TableCell>
                  <TableCell className="min-w-24 whitespace-normal text-muted-foreground">{e.organizerName}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(e.startsAt)}</TableCell>
                  <TableCell className="min-w-28 whitespace-normal text-muted-foreground">{e.location}</TableCell>
                  <TableCell>
                    {e.registeredCount}{e.capacity ? ` / ${e.capacity}` : ''}
                  </TableCell>
                  <TableCell><StatusBadge status={e.status} /></TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow><TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">Aucun événement trouvé.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
