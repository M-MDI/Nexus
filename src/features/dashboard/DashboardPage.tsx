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

      <div className="grid grid-cols-1 gap-(--dashboard-gap) lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex min-w-0 flex-col gap-(--dashboard-gap)">
          {/* Upcoming events */}
          <Card className="[@media(max-height:800px)]:gap-2">
            <CardHeader className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">Événements à venir</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/events/my">Voir tout <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {upcomingEvents.map(e => (
                <Link key={e.id} to={`/events/${e.id}`} className="flex items-center gap-3 rounded-lg border border-border p-2.5 transition-colors hover:border-primary/40">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-info-surface text-info">
                    <CalendarDays className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="break-words font-medium">{e.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3 shrink-0" /> {e.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatDate(e.startsAt)}</p>
                    <StatusBadge status={e.myStatus ?? 'registered'} />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Pending requests */}
          <Card className="[@media(max-height:800px)]:gap-2">
            <CardHeader className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">Demandes en attente</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/network">Voir tout <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {pendingConnections.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">Aucune demande en attente.</p>
              )}
              {pendingConnections.map(c => (
                <div key={c.id} className="flex items-center gap-3 rounded-lg border border-border p-2.5">
                  <PersonAvatar person={c.person} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{c.person.fullName}</p>
                    <p className="break-words text-xs text-muted-foreground">{c.person.title} — {c.person.company}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right rail */}
        <div className="flex min-w-0 flex-col gap-(--dashboard-gap)">
          <Card className="[@media(max-height:800px)]:gap-2">
            <CardHeader><CardTitle className="text-base">Profil complété</CardTitle></CardHeader>
            <CardContent>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Complétion</span>
                <span className="font-medium">{profile?.completionPercentage ?? 0}%</span>
              </div>
              <Progress value={profile?.completionPercentage ?? 0} className="h-2" />
              <Button variant="link" size="sm" className="mt-2 h-auto p-0" asChild>
                <Link to="/profile">Compléter mon profil</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="[@media(max-height:800px)]:gap-2">
            <CardHeader className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">Prochains rendez-vous</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/meetings">Agenda <ArrowRight className="ml-1 size-4" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {upcomingMeetings.length === 0 && (
                <p className="py-4 text-center text-sm text-muted-foreground">Aucun rendez-vous planifié.</p>
              )}
              {upcomingMeetings.map(m => (
                <div key={m.id} className="flex items-center gap-2.5 rounded-lg bg-muted/50 p-2">
                  <div className="rounded-lg bg-info-surface p-2 text-info">
                    <CalendarDays className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="break-words text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(m.startsAt)} à {formatTime(m.startsAt)} — {m.withPerson.fullName}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>

      <Card className="[@media(max-height:800px)]:py-2">
        <CardContent className="grid items-center gap-1 sm:grid-cols-3 lg:grid-cols-[auto_repeat(3,minmax(0,1fr))] lg:gap-3">
          <CardTitle className="sm:col-span-3 lg:col-span-1">Actions rapides</CardTitle>
          <QuickAction to="/events/discover" label="Découvrir des événements" />
          <QuickAction to="/matching" label="Voir les suggestions de matching" />
          <QuickAction to="/business-card" label="Partager ma carte digitale" />
        </CardContent>
      </Card>
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
