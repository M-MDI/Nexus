import { Link } from 'react-router-dom';
import { CalendarDays, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Event } from '@/lib/mock/types';
import { formatDate } from '@/components/shared';

const toneGradients: Record<string, string> = {
  blue: 'from-brand-panel-end to-brand-indigo',
  green: 'from-cover-green to-cover-teal',
  violet: 'from-cover-violet to-cover-purple',
  amber: 'from-cover-amber to-cover-orange',
};

export function EventCard({ event }: { event: Event }) {
  const gradient = toneGradients[event.coverTone ?? 'blue'] ?? toneGradients.blue;
  const registered = event.myStatus === 'registered' || event.myStatus === 'attended';

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link to={`/events/${event.id}`} className="block focus-visible:outline-offset-[-2px] focus-visible:outline-on-brand">
        <div className={`flex h-28 items-end bg-linear-to-br ${gradient} p-4 text-on-brand`}>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide">{event.city}</p>
            <p className="text-lg font-semibold">{event.organizerName}</p>
          </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <Link to={`/events/${event.id}`} className="font-semibold leading-snug hover:text-primary">
            {event.name}
          </Link>
          {event.myStatus && (
            <Badge variant="secondary" className="shrink-0">
              {event.myStatus === 'registered' ? 'Inscrit' : event.myStatus === 'attended' ? 'Participé' : 'Liste d’attente'}
            </Badge>
          )}
        </div>
        <div className="mb-3 space-y-1 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5">
            <CalendarDays className="size-4" /> {formatDate(event.startsAt)}
            {event.endsAt !== event.startsAt && ` – ${formatDate(event.endsAt)}`}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin className="size-4" /> {event.location}
          </p>
          {event.registeredCount != null && (
            <p className="flex items-center gap-1.5">
              <Users className="size-4" /> {event.registeredCount} inscrits
              {event.capacity ? ` / ${event.capacity}` : ''}
            </p>
          )}
        </div>
        {event.tags && event.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {event.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{event.priceLabel}</span>
          {registered ? (
            <Button variant="outline" size="sm" asChild>
              <Link to={`/events/${event.id}`}>Voir ma fiche</Link>
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link to={`/events/${event.id}`}>S’inscrire</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
