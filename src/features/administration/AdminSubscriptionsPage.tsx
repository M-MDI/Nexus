import { useState } from 'react';
import { toast } from 'sonner';
import { CreditCard, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
import { PageHeader, StatusBadge } from '@/components/shared';
import { subscriptions } from '@/lib/mock/admin';
import type { Subscription } from '@/lib/mock/types';

export function AdminSubscriptionsPage() {
  const [items, setItems] = useState<Subscription[]>(subscriptions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ plan: '', priceLabel: '', ownerEmail: '' });

  function create() {
    if (!form.plan.trim()) return;
    setItems(prev => [{
      id: `sub-${Date.now()}`,
      plan: form.plan,
      status: 'active',
      priceLabel: form.priceLabel || 'Sur devis',
      ownerName: form.ownerEmail.split('@')[0],
      ownerEmail: form.ownerEmail,
    }, ...prev]);
    setDialogOpen(false);
    setForm({ plan: '', priceLabel: '', ownerEmail: '' });
    toast.success('Souscription créée (démo)');
  }

  function setStatus(id: string, status: Subscription['status']) {
    setItems(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    toast('Statut mis à jour (démo)');
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Souscriptions et offres"
        description="Offres organisateur, Premium individuel et packs de jetons."
        actions={<Button onClick={() => setDialogOpen(true)}><Plus className="mr-2 size-4" />Nouvelle offre</Button>}
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {(['active', 'trialing', 'past_due', 'cancelled'] as const).map(s => (
          <Card key={s}>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">{s === 'active' ? 'Actives' : s === 'trialing' ? 'Essais' : s === 'past_due' ? 'Impayées' : 'Annulées'}</p>
              <p className="text-2xl font-semibold tnum">{items.filter(i => i.status === s).length}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offre</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Renouvellement</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="w-px" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="min-w-28 font-medium whitespace-normal">{s.plan}</TableCell>
                  <TableCell className="min-w-32 whitespace-normal [overflow-wrap:anywhere]">
                    <p>{s.ownerName}</p>
                    <p className="text-xs text-muted-foreground">{s.ownerEmail}</p>
                  </TableCell>
                  <TableCell>{s.priceLabel}</TableCell>
                  <TableCell className="text-muted-foreground">{s.renewsAt ?? '—'}</TableCell>
                  <TableCell><StatusBadge status={s.status} /></TableCell>
                  <TableCell>
                    <Select value={s.status} onValueChange={v => setStatus(s.id, v as Subscription['status'])}>
                      <SelectTrigger className="min-w-24"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="trialing">Essai</SelectItem>
                        <SelectItem value="past_due">Impayée</SelectItem>
                        <SelectItem value="cancelled">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer une offre</DialogTitle>
            <DialogDescription>Attribuez une offre commerciale à un compte.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="sub-plan">Nom de l’offre</Label>
              <Input id="sub-plan" value={form.plan} onChange={e => setForm(f => ({ ...f, plan: e.target.value }))} placeholder="Ex. Offre Organisateur" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sub-price">Prix</Label>
              <Input id="sub-price" value={form.priceLabel} onChange={e => setForm(f => ({ ...f, priceLabel: e.target.value }))} placeholder="Ex. 4 900 MAD" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sub-email">E-mail du client</Label>
              <Input id="sub-email" type="email" value={form.ownerEmail} onChange={e => setForm(f => ({ ...f, ownerEmail: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Annuler</Button>
            <Button onClick={create} disabled={!form.plan.trim()}>Créer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
