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




    </div>
  );
}
