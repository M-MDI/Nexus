import { useState } from 'react';
import { toast } from 'sonner';
import { MoreHorizontal, Search, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { companyMembers } from '@/lib/mock/company';
import { Link } from 'react-router-dom';
import type { CompanyMember } from '@/lib/mock/types';

const roleLabels: Record<CompanyMember['role'], string> = {
  admin: 'Administrateur',
  manager: 'Manager',
  member: 'Membre',
};

export function CompanyCollaboratorsPage() {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const members = companyMembers.filter(m => {
    const q = query.trim().toLowerCase();
    if (q && !`${m.person.fullName} ${m.person.email ?? ''} ${m.person.title}`.toLowerCase().includes(q)) return false;
    if (roleFilter !== 'all' && m.role !== roleFilter) return false;
    if (statusFilter !== 'all' && m.status !== statusFilter) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Collaborateurs"
        description="Membres de votre entreprise rattachés via jetons ou invitations."
        actions={
          <Button asChild>
            <Link to="/company/invitations"><UserPlus className="mr-2 size-4" />Inviter</Link>
          </Button>
        }
      />

      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Rechercher…" className="pl-9" />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Rôle" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les rôles</SelectItem>
            <SelectItem value="admin">Administrateur</SelectItem>
            <SelectItem value="manager">Manager</SelectItem>
            <SelectItem value="member">Membre</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Statut" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="active">Actif</SelectItem>
            <SelectItem value="invited">Invité</SelectItem>
            <SelectItem value="suspended">Suspendu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Collaborateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Depuis</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map(m => (
                <TableRow key={m.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <PersonAvatar person={m.person} size="sm" />
                      <div>
                        <p className="font-medium">{m.person.fullName}</p>
                        <p className="text-xs text-muted-foreground">{m.person.title} — {m.person.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{roleLabels[m.role]}</TableCell>
                  <TableCell><StatusBadge status={m.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{m.joinedAt ? formatDate(m.joinedAt) : '—'}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast('Changement de rôle (démo)')}>Changer le rôle</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast('Invitation renvoyée (démo)')}>Renvoyer l’invitation</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => toast('Accès suspendu (démo)')}>Suspendre</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {members.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                    Aucun collaborateur ne correspond aux filtres.
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
