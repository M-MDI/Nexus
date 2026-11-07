import { useMemo, useState } from 'react';
import { Search, UserCog } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { adminUsers } from '@/lib/mock/admin';

export function AdminUsersPage() {
  const [query, setQuery] = useState('');
  const [plan, setPlan] = useState('all');
  const [status, setStatus] = useState('all');

  const users = useMemo(() => adminUsers.filter(u => {
    const q = query.trim().toLowerCase();
    if (q && !`${u.person.fullName} ${u.person.email}`.toLowerCase().includes(q)) return false;
    if (plan !== 'all' && u.plan !== plan) return false;
    if (status !== 'all' && u.status !== status) return false;
    return true;
  }), [query, plan, status]);

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Gestion des utilisateurs"
        description="Comptes, offres et statuts sur la plateforme."
        actions={<Button variant="outline"><UserCog className="mr-2 size-4" />Export CSV</Button>}
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher un utilisateur…" className="pl-9" />
        </div>
        <Select value={plan} onValueChange={setPlan}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Offre" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les offres</SelectItem>
            <SelectItem value="Gratuit">Gratuit</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
            <SelectItem value="Entreprise">Entreprise</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="trialing">Essai</SelectItem>
            <SelectItem value="suspended">Suspendu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Offre</TableHead>
                <TableHead>Événements</TableHead>
                <TableHead>Inscrit le</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(u => (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <PersonAvatar person={{ ...u.person, id: u.id, title: '', company: '' }} size="sm" />
                      <div>
                        <p className="font-medium">{u.person.fullName}</p>
                        <p className="text-xs text-muted-foreground">{u.person.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant="secondary">{u.plan}</Badge></TableCell>
                  <TableCell>{u.eventsCount}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(u.joinedAt)}</TableCell>
                  <TableCell><StatusBadge status={u.status} /></TableCell>
                </TableRow>
              ))}
              {users.length === 0 && (
                <TableRow><TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">Aucun utilisateur trouvé.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
