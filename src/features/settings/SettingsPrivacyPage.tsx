import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { PageHeader, SectionCard } from '@/components/shared';
import { privacyPreferences as initialPrefs } from '@/lib/mock/settings';
import type { PrivacyPreferences } from '@/lib/mock/types';

const labels: { key: keyof PrivacyPreferences; title: string; description: string }[] = [
  { key: 'profileVisibleInDirectory', title: 'Visibilité dans l’annuaire', description: 'Les autres participants peuvent vous trouver dans l’annuaire des événements.' },
  { key: 'publicBusinessCard', title: 'Carte de visite publique', description: 'Toute personne disposant du lien peut consulter votre carte digitale.' },
  { key: 'shareEmail', title: 'Partager mon e-mail', description: 'Votre adresse e-mail est visible sur votre carte et votre profil public.' },
  { key: 'sharePhone', title: 'Partager mon téléphone', description: 'Votre numéro de téléphone est visible sur votre carte et votre profil public.' },
  { key: 'appearInSuggestions', title: 'Apparaître dans les suggestions', description: 'Nexus peut vous suggérer comme contact aux autres participants.' },
  { key: 'showOnlineStatus', title: 'Statut en ligne', description: 'Votre disponibilité apparaît auprès de vos contacts.' },
  { key: 'allowMeetingRequests', title: 'Accepter les demandes de rendez-vous', description: 'Vos contacts peuvent vous proposer des créneaux de rendez-vous.' },
];

export function SettingsPrivacyPage() {
  const [prefs, setPrefs] = useState<PrivacyPreferences>(initialPrefs);
  const [dirty, setDirty] = useState(false);

  function toggle(key: keyof PrivacyPreferences) {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
    setDirty(true);
  }

  function requestExport() {
    setPrefs(prev => ({ ...prev, dataExportRequested: true }));
    setDirty(true);
    toast.success('Demande d’export de données enregistrée');
  }

  function requestDeletion() {
    toast.success('Demande de suppression enregistrée — traitement sous 30 jours');
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Confidentialité"
        description="Contrôlez qui voit vos informations et comment vos données sont utilisées."
        actions={dirty && <Button onClick={() => { setDirty(false); toast.success('Préférences enregistrées'); }}>Enregistrer</Button>}
      />

      <SectionCard title="Visibilité du profil">
        <div className="grid gap-x-8 divide-y md:grid-cols-2 md:divide-y-0">
          {labels.map(item => (
            <div key={item.key} className="flex items-start justify-between gap-4 py-2.5">
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Switch checked={prefs[item.key]} onCheckedChange={() => toggle(item.key)} aria-label={item.title} />
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Vos données">
        <div className="grid gap-3 xl:grid-cols-2">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-4">
            <div className="min-w-0 flex-1 basis-44">
              <p className="text-sm font-medium">Exporter mes données</p>
              <p className="text-sm text-muted-foreground">Recevez une copie de vos données personnelles.</p>
            </div>
            <Button variant="outline" size="sm" onClick={requestExport} disabled={prefs.dataExportRequested}>
              {prefs.dataExportRequested ? 'Demande envoyée' : 'Demander un export'}
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-destructive/30 p-4">
            <div className="min-w-0 flex-1 basis-44">
              <p className="text-sm font-medium">Supprimer mes données</p>
              <p className="text-sm text-muted-foreground">Demande de suppression de votre compte et de vos données.</p>
            </div>
            <Button variant="destructive" size="sm" onClick={requestDeletion}>Demander la suppression</Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
