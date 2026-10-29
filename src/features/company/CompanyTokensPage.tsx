import { useState } from 'react';
import { toast } from 'sonner';
import { Check, Plus, Wallet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { PageHeader, StatCard, formatDate } from '@/components/shared';
import { tokenBalance, tokenPacks, tokenTransactions } from '@/lib/mock/company';
import type { TokenPack } from '@/lib/mock/types';

const kindLabels: Record<string, string> = {
  purchase: 'Achat',
  consumed: 'Consommé',
  granted: 'Crédit',
  expired: 'Expiré',
  refund: 'Remboursement',
};

export function CompanyTokensPage() {
  const [purchased, setPurchased] = useState<Set<string>>(new Set());

  function buy(pack: TokenPack) {
    setPurchased(prev => new Set(prev).add(pack.id));
    toast.success(`${pack.name} ajouté à votre panier (démo)`, {
      description: 'Le paiement sera traité par le prestataire choisi pour le MVP.',
    });
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Jetons entreprise"
        description="Les jetons permettent d’inviter des collaborateurs et de les rattacher à votre entreprise."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Solde actuel" value={tokenBalance} icon={<Wallet className="size-5" />} />
        <StatCard label="Coût par invitation" value="2 jetons" />
        <StatCard label="Invitations envoyées" value={tokenTransactions.filter(t => t.kind === 'consumed').length} />
      </div>




    </div>
  );
}
