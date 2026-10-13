import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PageHeader, EmptyState } from '@/components/shared';
import { events } from '@/lib/mock/events';
import { EventCard } from './EventCard';

export function EventsDiscoverPage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('all');
  const [tag, setTag] = useState('all');

  const allTags = useMemo(
    () => Array.from(new Set(events.flatMap(e => e.tags ?? []))),
    []
  );
  const cities = useMemo(
    () => Array.from(new Set(events.map(e => e.city).filter(Boolean) as string[])),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(e => {
      if (e.status === 'draft' || e.status === 'cancelled') return false;
      if (city !== 'all' && e.city !== city) return false;
      if (tag !== 'all' && !(e.tags ?? []).includes(tag)) return false;
      if (q && !`${e.name} ${e.description} ${e.location}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, city, tag]);

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Découvrir les événements"
        description="Parcourez les événements professionnels et rejoignez ceux qui correspondent à vos objectifs."
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un événement, une ville…"
            className="pl-9"
          />
        </div>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Ville" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les villes</SelectItem>
            {cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={tag} onValueChange={setTag}>
          <SelectTrigger className="w-44"><SelectValue placeholder="Thématique" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les thématiques</SelectItem>
            {allTags.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
        {(query || city !== 'all' || tag !== 'all') && (
          <Button variant="ghost" onClick={() => { setQuery(''); setCity('all'); setTag('all'); }}>
            Réinitialiser
          </Button>
        )}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="Aucun événement trouvé"
          description="Essayez d’élargir votre recherche ou de modifier les filtres."
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      )}
    </div>
  );
}
