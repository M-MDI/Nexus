import { useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { MailPlus, MoreHorizontal, Send, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { companyInvitations } from '@/lib/mock/company';
import type { CompanyInvitation } from '@/lib/mock/types';

const roleLabels: Record<CompanyInvitation['role'], string> = {
  admin: 'Administrateur',
  manager: 'Manager',
  member: 'Membre',
};

export function CompanyInvitationsPage() {
  const [items, setItems] = useState<CompanyInvitation[]>(companyInvitations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<CompanyInvitation['role']>('member');

  function send() {
    if (!email.includes('@')) return;
    setItems(prev => [{
      id: `ci-${Date.now()}`,
      email: email.trim(),
      role,
      status: 'pending',
      invitedAt: new Date().toISOString().slice(0, 10),
      expiresAt: new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10),
    }, ...prev]);
    setEmail('');
    setDialogOpen(false);
    toast.success(`Invitation envoyée à ${email}`);
  }

  function revoke(id: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: 'revoked' as const } : i));
    toast('Invitation révoquée');
  }

  function resend(id: string) {
    toast.success('Invitation renvoyée');
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Invitations"
        description="Invitez des collaborateurs à rejoindre votre entreprise. Chaque invitation consomme un jeton."
        actions={
          <Button onClick={() => setDialogOpen(true)}>
            <MailPlus className="mr-2 size-4" />Nouvelle invitation
          </Button>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>E-mail</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Envoyée le</TableHead>
                <TableHead>Expire le</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(inv => (
                <TableRow key={inv.id}>
                  <TableCell className="font-medium">{inv.email}</TableCell>
                  <TableCell>{roleLabels[inv.role]}</TableCell>
                  <TableCell><StatusBadge status={inv.status} /></TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(inv.invitedAt)}</TableCell>
                  <TableCell className="text-muted-foreground">{formatDate(inv.expiresAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="size-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => resend(inv.id)}><Send className="mr-2 size-4" />Renvoyer</DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => revoke(inv.id)}><Trash2 className="mr-2 size-4" />Révoquer</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Il vous reste <Link to="/company/tokens" className="text-primary hover:underline">64 jetons</Link>.
        Les règles de consommation et d’expiration des jetons sont définies par votre offre.
      </p>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inviter un collaborateur</DialogTitle>
            <DialogDescription>Une invitation par e-mail — le collaborateur l’accepte depuis son compte Nexus.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="inv-email">Adresse e-mail</Label>
              <Input id="inv-email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="prenom@entreprise.fr" />
            </div>
            <div className="space-y-1.5">
              <Label>Rôle</Label>
              <Select value={role} onValueChange={v => setRole(v as CompanyInvitation['role'])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Membre</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
            <Button onClick={send} disabled={!email.includes('@')}>Envoyer l’invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
