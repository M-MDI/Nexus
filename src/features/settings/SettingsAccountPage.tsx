import { useState } from 'react';
import { toast } from 'sonner';
import { Eye, EyeOff, Trash2 } from 'lucide-react';
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
import { PageHeader, SectionCard } from '@/components/shared';
import { currentUser } from '@/lib/mock/people';

export function SettingsAccountPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader title="Paramètres du compte" description="Identité, sécurité et zone sensible." />

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Informations du compte">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="acc-name">Nom complet</Label>
              <Input id="acc-name" defaultValue={currentUser.fullName} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acc-email">Adresse e-mail</Label>
              <Input id="acc-email" type="email" defaultValue={currentUser.email} />
            </div>
            <Button size="sm" onClick={() => toast.success('Compte mis à jour (démo)')}>Enregistrer</Button>
          </div>
        </SectionCard>

        <SectionCard title="Changer le mot de passe">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="acc-current">Mot de passe actuel</Label>
              <div className="relative">
                <Input id="acc-current" type={showPassword ? 'text' : 'password'} className="pr-10" />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="acc-new">Nouveau mot de passe</Label>
              <Input id="acc-new" type="password" placeholder="8 caractères minimum" />
            </div>
            <Button size="sm" onClick={() => toast.success('Mot de passe mis à jour (démo)')}>Mettre à jour</Button>
          </div>
        </SectionCard>
      </div>

      <Card className="border-destructive/40">
        <CardHeader><CardTitle className="text-base text-destructive">Zone sensible</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Supprimer mon compte</p>
            <p className="text-sm text-muted-foreground">
              Supprime définitivement votre profil, vos données et vos échanges. Cette action est irréversible.
            </p>
          </div>
          <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
            <Trash2 className="mr-2 size-4" />Supprimer le compte
          </Button>
        </CardContent>
      </Card>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Toutes vos données personnelles seront effacées conformément à votre demande d’accès et de suppression.
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>Annuler</Button>
            <Button variant="destructive" onClick={() => { setDeleteOpen(false); toast.success('Demande de suppression enregistrée (démo)'); }}>
              Confirmer la suppression
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
