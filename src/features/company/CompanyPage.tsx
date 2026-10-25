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




    </div>
  );
}
