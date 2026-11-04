import { useMemo, useState } from 'react';
import { QrCode, ScanLine, Undo2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PageHeader, PersonAvatar, StatCard, StatusBadge, formatTime,
} from '@/components/shared';
import { eventParticipants } from '@/lib/mock/networking';
import type { Participant } from '@/lib/mock/types';

export function OrganizerAttendancePage() {
  const [items, setItems] = useState<Participant[]>(eventParticipants);
  const [scanInput, setScanInput] = useState('');

  const stats = useMemo(() => {
    const present = items.filter(p => p.checkedIn).length;
    return {
      total: items.length,
      present,
      rate: items.length ? Math.round((present / items.length) * 100) : 0,
    };
  }, [items]);

  function checkIn(id: string) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, checkedIn: true, checkedInAt: new Date().toISOString() } : p));
  }

  function undo(id: string) {
    setItems(prev => prev.map(p => p.id === id ? { ...p, checkedIn: false, checkedInAt: undefined } : p));
  }

  function handleScan() {
    const q = scanInput.trim().toLowerCase();
    const match = items.find(p =>
      p.person.fullName.toLowerCase().includes(q) || p.person.email?.toLowerCase() === q || p.id === q
    );
    if (!match) {
      toast.error('Aucun participant trouvé pour ce badge ou e-mail');
      return;
    }
    if (match.checkedIn) {
      toast.info(`${match.person.fullName} est déjà présent·e`);
    } else {
      checkIn(match.id);
      toast.success(`${match.person.fullName} enregistré·e — bienvenue !`);
    }
    setScanInput('');
  }

  const present = items.filter(p => p.checkedIn).sort((a, b) => (b.checkedInAt ?? '').localeCompare(a.checkedInAt ?? ''));
  const absent = items.filter(p => !p.checkedIn);

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Présences"
        description="Salon Innovation 2026 — contrôle d’accès en temps réel."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Inscrits" value={stats.total} />
        <StatCard label="Présents" value={stats.present} />
        <StatCard label="Taux de présence" value={`${stats.rate}%`} />
      </div>

      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 p-4">
          <ScanLine className="size-5 text-primary" />
          <Input
            value={scanInput}
            onChange={e => setScanInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleScan()}
            placeholder="Scanner un badge ou saisir un nom / e-mail…"
            className="max-w-md flex-1"
          />
          <Button onClick={handleScan}>Valider</Button>
          <Badge variant="outline" className="gap-1"><QrCode className="size-3" /> Mode badge (démo)</Badge>
        </CardContent>
      </Card>


    </div>
  );
}
