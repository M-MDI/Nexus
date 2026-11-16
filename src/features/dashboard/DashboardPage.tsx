import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight, CalendarDays, Link2, MapPin, MessageSquare, Users, UserCheck,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PageHeader, PersonAvatar, StatCard, StatusBadge, formatDate, formatTime } from '@/components/shared';
import { events } from '@/lib/mock/events';
import { connections, matchSuggestions, meetings } from '@/lib/mock/networking';
import { conversations } from '@/lib/mock/messages';
import { getProfile } from '@/profile/lib/mockData';
import type { Profile } from '@/profile/types/profile';

const upcomingEvents = events.filter(e => e.myStatus === 'registered' || e.myStatus === 'waitlist').slice(0, 3);
const pendingConnections = connections.filter(c => c.status === 'pending' || c.status === 'requested');
const upcomingMeetings = meetings
  .filter(m => m.status === 'confirmed' || m.status === 'proposed')
  .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
  .slice(0, 3);
const unreadMessages = conversations.reduce((sum, c) => sum + c.unreadCount, 0);
const newMatches = matchSuggestions.filter(m => m.status === 'new').length;

export function DashboardPage() {
  const { state } = useLocation();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const firstName = profile?.fullName.split(' ')[0] ?? 'vous';

  return (
    <div className="flex flex-col gap-(--dashboard-gap) [--dashboard-gap:1rem] xl:[--dashboard-gap:1.25rem] [@media(max-height:800px)]:[--dashboard-gap:0.75rem]">
      {state?.passwordUpdated && (
        <p className="rounded-lg border border-success-border bg-success-surface p-3 text-sm text-success" role="status">
          Votre mot de passe a été mis à jour.
        </p>
      )}

      <PageHeader
        title={`Bonjour, ${firstName}`}
        description="Voici votre activité professionnelle sur Nexus."
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<CalendarDays className="size-5" />} label="Événements à venir" value={upcomingEvents.length} hint="inscriptions actives" />
        <StatCard icon={<Users className="size-5" />} label="Connexions acceptées" value={connections.filter(c => c.status === 'accepted').length} hint="dans votre réseau" />
        <StatCard icon={<MessageSquare className="size-5" />} label="Messages non lus" value={unreadMessages} hint="conversations actives" />
        <StatCard icon={<Link2 className="size-5" />} label="Nouvelles suggestions" value={newMatches} hint="matching en cours" />
      </div>




    </div>
  );
}

function QuickAction({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted"
    >
      {label}
      <ArrowRight className="size-4 shrink-0 text-muted-foreground" />
    </Link>
  );
}
