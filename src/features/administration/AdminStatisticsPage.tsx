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




    </div>
  );
}
