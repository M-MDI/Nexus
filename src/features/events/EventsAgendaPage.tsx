import { useMemo, useState } from 'react';
import { CalendarDays, Clock, MapPin, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, EmptyState, formatDate, formatTime } from '@/components/shared';
import { events } from '@/lib/mock/events';
import { meetings } from '@/lib/mock/networking';

const attendedEvents = events.filter(e => e.myStatus === 'attended' || e.status === 'past');
const confirmedMeetings = meetings.filter(m => m.status === 'confirmed' || m.status === 'completed');
const scheduledMeetings = meetings.filter(m => m.status === 'confirmed' || m.status === 'proposed' || m.status === 'requested');

export function EventsAgendaPage() {
  const [day, setDay] = useState('all');

  const agenda = useMemo(() => {
    const items: { kind: 'session' | 'meeting'; id: string; title: string; startsAt: string; endsAt?: string; location?: string; meta?: string }[] = [];

    attendedEvents.forEach(e => {
      (e.sessions ?? []).forEach(s => {
        items.push({
          kind: 'session',
          id: `s-${s.id}`,
          title: s.title,
          startsAt: s.startTime,
          endsAt: s.endTime,
          location: s.location,
          meta: `${e.name}${s.speakerName ? ` — ${s.speakerName}` : ''}`,
        });
      });
    });

    scheduledMeetings.forEach(m => {
      items.push({
        kind: 'meeting',
        id: `m-${m.id}`,
        title: m.title,
        startsAt: m.startsAt,
        endsAt: m.endsAt,
        location: m.location,
        meta: `Rendez-vous avec ${m.withPerson.fullName}`,
      });
    });

    return items.sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  }, []);

  const days = useMemo(() => {
    const set = new Set<string>();
    agenda.forEach(i => set.add(new Date(i.startsAt).toISOString().slice(0, 10)));
    return Array.from(set).sort();
  }, [agenda]);

  const filtered = day === 'all' ? agenda : agenda.filter(i => new Date(i.startsAt).toISOString().slice(0, 10) === day);

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Mon agenda"
        description="Sessions d’événements et rendez-vous professionnels à venir et passés."
      />

      <Tabs defaultValue="schedule">
        <TabsList>
          <TabsTrigger value="schedule">Programme & rendez-vous</TabsTrigger>
          <TabsTrigger value="meetings">Mes rendez-vous ({scheduledMeetings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule" className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setDay('all')}
              aria-pressed={day === 'all'}
              className={`rounded-full border border-transparent px-3 py-1 text-sm ${day === 'all' ? 'bg-primary text-primary-foreground' : 'border-control bg-muted text-muted-foreground hover:bg-accent'}`}
            >
              Tout
            </button>
            {days.map(d => (
              <button
                key={d}
                onClick={() => setDay(d)}
                aria-pressed={day === d}
                className={`rounded-full border border-transparent px-3 py-1 text-sm ${day === d ? 'bg-primary text-primary-foreground' : 'border-control bg-muted text-muted-foreground hover:bg-accent'}`}
              >
                {formatDate(d)}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState title="Aucun élément à cette date" />
          ) : (
            <div className="space-y-2">
              {filtered.map(item => (
                <Card key={item.id}>
                  <CardContent className="flex flex-wrap items-center gap-4 p-4">
                    <div className="w-36 shrink-0">
                      <p className="text-sm font-medium">{formatDate(item.startsAt)}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" /> {formatTime(item.startsAt)}{item.endsAt ? ` – ${formatTime(item.endsAt)}` : ''}
                      </p>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.title}</p>
                        <Badge variant={item.kind === 'meeting' ? 'default' : 'secondary'} className="text-xs">
                          {item.kind === 'meeting' ? 'Rendez-vous' : 'Session'}
                        </Badge>
                      </div>
                      {item.meta && <p className="text-sm text-muted-foreground">{item.meta}</p>}
                    </div>
                    {item.location && (
                      <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-4" /> {item.location}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>


      </Tabs>
    </div>
  );
}
