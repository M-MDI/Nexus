import { Link } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, StatusBadge, EmptyState, formatDate } from '@/components/shared';
import { events } from '@/lib/mock/events';

const myEvents = events.filter(e => e.myStatus);
const upcoming = myEvents.filter(e => e.myStatus !== 'attended' && e.status !== 'past');
const past = myEvents.filter(e => e.myStatus === 'attended' || e.status === 'past');

function MyEventRow({ event }: { event: (typeof myEvents)[number] }) {
  return (
    <Link to={`/events/${event.id}`} className="block">
      <Card className="transition-colors hover:border-primary/40">
        <CardContent className="flex flex-wrap items-center gap-4 p-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold">{event.name}</p>
              <StatusBadge status={event.myStatus ?? event.status} />
              {event.myRole && event.myRole !== 'participant' && (
                <Badge variant="outline" className="capitalize">{event.myRole}</Badge>
              )}
            </div>
            <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><CalendarDays className="size-4" />{formatDate(event.startsAt)}</span>
              <span className="flex items-center gap-1"><MapPin className="size-4" />{event.location}</span>
              <span>{event.organizerName}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function EventsMyPage() {
  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Mes événements"
        description="Les événements auxquels vous participez ou que vous organisez."
        actions={
          <Link to="/events/discover" className="text-sm font-medium text-primary hover:underline">
            Découvrir d’autres événements
          </Link>
        }
      />

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">À venir ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Passés ({past.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4 space-y-3">
          {upcoming.length === 0 ? (
            <EmptyState title="Aucun événement à venir" description="Parcourez le catalogue pour rejoindre un événement." />
          ) : (
            upcoming.map(e => <MyEventRow key={e.id} event={e} />)
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4 space-y-3">
          {past.length === 0 ? (
            <EmptyState title="Aucun événement passé" />
          ) : (
            past.map(e => <MyEventRow key={e.id} event={e} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
