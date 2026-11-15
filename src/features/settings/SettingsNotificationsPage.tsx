import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { PageHeader, SectionCard } from '@/components/shared';
import { notificationPreferences as initialPrefs } from '@/lib/mock/settings';
import type { NotificationPreference } from '@/lib/mock/types';

export function SettingsNotificationsPage() {
  const [prefs, setPrefs] = useState<NotificationPreference[]>(initialPrefs);
  const [dirty, setDirty] = useState(false);

  function toggle(id: string, channel: 'email' | 'push') {
    setPrefs(prev => prev.map(p => p.id === id ? { ...p, [channel]: !p[channel] } : p));
    setDirty(true);
  }

  function testNotification() {
    toast.success('Notification de test envoyée', { description: 'Vous devriez la recevoir selon vos préférences.' });
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Notifications"
        description="Choisissez les canaux et les événements qui vous notifient."
        actions={dirty && <Button onClick={() => { setDirty(false); toast.success('Préférences enregistrées'); }}>Enregistrer</Button>}
      />

      <SectionCard
        title="Préférences de notification"
        description="E-mail et notifications push pour chaque type d’activité."
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="pb-2 pr-2 sm:pr-4 font-medium">Événement</th>
                <th className="pb-2 pr-2 sm:pr-4 font-medium">E-mail</th>
                <th className="pb-2 font-medium">Push</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {prefs.map(p => (
                <tr key={p.id}>
                  <td className="py-2.5 pr-2 sm:pr-4">
                    <p className="font-medium">{p.label}</p>
                    <p className="text-xs text-muted-foreground">{p.description}</p>
                  </td>
                  <td className="py-2.5 pr-2 sm:pr-4">
                    <Switch checked={p.email} onCheckedChange={() => toggle(p.id, 'email')} aria-label={`${p.label} par e-mail`} />
                  </td>
                  <td className="py-2.5">
                    <Switch checked={p.push} onCheckedChange={() => toggle(p.id, 'push')} aria-label={`${p.label} en push`} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Card className="py-0">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 p-4">
          <p className="text-sm text-muted-foreground">Vous ne recevez pas vos notifications ?</p>
          <Button variant="outline" size="sm" onClick={testNotification}>Envoyer une notification test</Button>
        </CardContent>
      </Card>
    </div>
  );
}
