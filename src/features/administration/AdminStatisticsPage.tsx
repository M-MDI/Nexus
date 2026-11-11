import { CalendarDays, Link2, TrendingUp, UserCheck, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader, SectionCard, StatCard, MiniBarChart } from '@/components/shared';
import { platformStats } from '@/lib/mock/admin';

export function AdminStatisticsPage() {
  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader title="Statistiques globales" description="Vue d’ensemble de la plateforme Nexus." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Utilisateurs" value={platformStats.totalUsers.toLocaleString('fr-FR')} icon={<Users className="size-5" />} />
        <StatCard label="Événements" value={platformStats.totalEvents} icon={<CalendarDays className="size-5" />} />
        <StatCard label="Mises en relation" value={platformStats.totalMatches.toLocaleString('fr-FR')} icon={<Link2 className="size-5" />} />
        <StatCard label="Rendez-vous" value={platformStats.totalMeetings.toLocaleString('fr-FR')} icon={<UserCheck className="size-5" />} />
        <StatCard label="Souscriptions actives" value={platformStats.activeSubscriptions} icon={<TrendingUp className="size-5" />} />
      </div>

      <SectionCard title="Croissance — 6 derniers mois" description="Inscriptions utilisateurs et événements publiés.">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium">Nouveaux utilisateurs</p>
            <MiniBarChart data={platformStats.monthlyGrowth} valueKey="users" />
          </div>
          <div>
            <p className="mb-3 text-sm font-medium">Événements publiés</p>
            <MiniBarChart data={platformStats.monthlyGrowth} valueKey="events" />
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Taux d’activation profil', value: '82%' },
          { label: 'Taux d’acceptation des matchs', value: '64%' },
          { label: 'Rendez-vous honorés / demandés', value: '71%' },
        ].map(s => (
          <Card key={s.label} className="py-0">
            <CardContent className="p-4">
              <p className="text-2xl font-semibold tnum">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
