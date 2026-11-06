import { CalendarCheck, Link2, TrendingUp, UserCheck, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { PageHeader, SectionCard, StatCard, MiniBarChart } from '@/components/shared';
import { organizerStats } from '@/lib/mock/admin';
import { eventParticipants, matchSuggestions, meetings } from '@/lib/mock/networking';

export function OrganizerStatisticsPage() {
  const checkedIn = eventParticipants.filter(p => p.checkedIn).length;
  const matches = matchSuggestions.filter(m => m.eventId === 'ev-salon').length;
  const eventMeetings = meetings.filter(m => m.eventId === 'ev-salon');
  const confirmedMeetings = eventMeetings.filter(m => m.status === 'confirmed').length;

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Statistiques"
        description="Salon Innovation 2026 — inscriptions, présences, mises en relation et rendez-vous."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Inscriptions" value={organizerStats.registrations} icon={<Users className="size-5" />} hint={`${checkedIn} présents`} />
        <StatCard label="Taux de présence" value={organizerStats.attendanceRate} icon={<UserCheck className="size-5" />} />
        <StatCard label="Mises en relation" value={matches} icon={<Link2 className="size-5" />} hint={`${organizerStats.matchRate} acceptées`} />
        <StatCard label="Rendez-vous confirmés" value={confirmedMeetings} icon={<CalendarCheck className="size-5" />} hint={`${eventMeetings.length} demandés au total`} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Check-ins par jour">
          <MiniBarChart data={organizerStats.dailyCheckIns} valueKey="value" />
        </SectionCard>
        <SectionCard title="Top intentions proposées">
          <TopIntentions />
        </SectionCard>
      </div>

      <SectionCard title="Bilan de l’événement" description="Indicateurs agrégés — aucune donnée personnelle individuelle exposée.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MiniStat label="Inscriptions" value={organizerStats.registrations} />
          <MiniStat label="Présences" value={checkedIn} />
          <MiniStat label="Matches créés" value={matches} />
          <MiniStat label="RDV confirmés" value={confirmedMeetings} />
        </div>
      </SectionCard>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-2xl font-semibold tnum">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function TopIntentions() {
  const counts: Record<string, number> = {};
  eventParticipants.forEach(p => (p.intentions ?? []).forEach(i => {
    counts[i.category] = (counts[i.category] ?? 0) + 1;
  }));
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const max = rows[0]?.[1] ?? 1;

  return (
    <div className="space-y-3">
      {rows.map(([label, count]) => (
        <div key={label}>
          <div className="mb-1 flex justify-between text-sm">
            <span>{label}</span>
            <span className="text-muted-foreground">{count}</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div className="h-2 rounded-full bg-primary" style={{ width: `${(count / max) * 100}%` }} />
          </div>
        </div>
      ))}
      {rows.length === 0 && <p className="text-sm text-muted-foreground">Aucune donnée.</p>}
    </div>
  );
}
