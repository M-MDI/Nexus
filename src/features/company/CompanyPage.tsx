import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Building2, Globe, Mail, MapPin, Pencil, Users, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { PageHeader, SectionCard, StatCard } from '@/components/shared';
import { company, companyMembers, tokenBalance } from '@/lib/mock/company';

export function CompanyPage() {
  const [editOpen, setEditOpen] = useState(false);
  const [name, setName] = useState(company.name);
  const [description, setDescription] = useState(company.description);

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Mon entreprise"
        description="Espace entreprise : identité, collaborateurs et jetons de mise en relation."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Collaborateurs actifs" value={companyMembers.filter(m => m.status === 'active').length} icon={<Users className="size-5" />} />
        <StatCard label="Jetons disponibles" value={tokenBalance} icon={<Wallet className="size-5" />} hint="1 jeton = 1 invitation" />
        <StatCard label="Taille" value={company.size} icon={<Building2 className="size-5" />} />
        <StatCard label="Secteur" value={company.industry} icon={<Globe className="size-5" />} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <SectionCard
          title={company.name}
          description={company.industry}
          actions={<Button variant="outline" size="sm" onClick={() => setEditOpen(true)}><Pencil className="mr-2 size-4" />Modifier</Button>}
        >
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-info-surface text-lg font-bold text-info">
              {company.logoInitials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm leading-relaxed text-muted-foreground">{company.description}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                {company.website && <span className="flex items-center gap-1.5"><Globe className="size-4" />{company.website}</span>}
                <span className="flex items-center gap-1.5"><MapPin className="size-4" />{company.location}</span>
                <span className="flex items-center gap-1.5"><Mail className="size-4" />contact@technova.fr</span>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Accès rapide">
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/company/collaborators">Gérer les collaborateurs</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/company/invitations">Inviter un collaborateur</Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link to="/company/tokens">Acheter des jetons</Link>
            </Button>
          </div>
        </SectionCard>
      </div>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier l’entreprise</DialogTitle>
            <DialogDescription>Ces informations apparaissent sur le profil de vos collaborateurs.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="co-name">Nom</Label>
              <Input id="co-name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="co-desc">Description</Label>
              <Textarea id="co-desc" value={description} onChange={e => setDescription(e.target.value)} rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Annuler</Button>
            <Button onClick={() => { setEditOpen(false); toast.success('Entreprise mise à jour (démo)'); }}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
