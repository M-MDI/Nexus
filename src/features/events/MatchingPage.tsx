import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, MapPin, Search, Star, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, PersonAvatar, EmptyState, StatusBadge } from '@/components/shared';
import { IntentionsDialog } from '@/profile/components/IntentionsDialog';
import type { NetworkingIntention } from '@/profile/types/profile';
import { events } from '@/lib/mock/events';
import { matchSuggestions, eventIntentions } from '@/lib/mock/networking';
import { directoryProfiles } from '@/lib/mock/people';
import type { DirectoryProfile } from '@/lib/mock/types';

const registeredEvents = events.filter(e => e.myStatus === 'registered' || e.myStatus === 'waitlist');

function scoreColor(score: number) {
  if (score >= 80) return 'text-success';
  if (score >= 60) return 'text-warning';
  return 'text-muted-foreground';
}

export function MatchingPage() {
  const [eventId, setEventId] = useState(registeredEvents[0]?.id ?? events[0].id);
  const [intentionsOpen, setIntentionsOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['p-karim', 'p-omar']));
  const [requested, setRequested] = useState<Set<string>>(new Set());

  const event = events.find(e => e.id === eventId)!;

  const intentions: NetworkingIntention[] = useMemo(
    () => eventIntentions
      .filter(i => i.eventId === eventId)
      .map(i => ({ id: i.id, type: i.type, category: i.category, description: i.description, eventId, eventName: event.name })),
    [eventId, event.name]
  );

  const suggestions = useMemo(
    () => matchSuggestions.filter(m => m.eventId === eventId),
    [eventId]
  );

  function toggleFavorite(id: string) {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  function sendRequest(personId: string, name: string) {
    setRequested(prev => new Set(prev).add(personId));
    toast.success(`Demande de mise en relation envoyée à ${name}`, {
      description: 'Vous serez notifié·e lorsque la personne acceptera.',
    });
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Matching professionnel"
        description="Décrivez ce que vous proposez et recherchez, puis laissez Nexus suggérer les bons contacts."
        actions={
          <Select value={eventId} onValueChange={setEventId}>
            <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
            <SelectContent>
              {events.filter(e => e.myStatus).map(e => (
                <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      {/* Intentions */}
      <Card>
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Vos intentions — {event.name}</h2>
              <p className="text-sm text-muted-foreground">
                {intentions.filter(i => i.type === 'offer').length} proposition(s), {intentions.filter(i => i.type === 'seek').length} recherche(s)
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIntentionsOpen(true)}>
              Modifier
            </Button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {(['offer', 'seek'] as const).map(type => {
              const items = intentions.filter(i => i.type === type);
              return (
                <div key={type} className="rounded-lg border border-border p-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {type === 'offer' ? 'Je propose' : 'Je recherche'}
                  </p>
                  {items.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucune intention définie.</p>
                  ) : (
                    <ul className="space-y-1.5">
                      {items.map(i => (
                        <li key={i.id} className="text-sm">
                          <span className="font-medium">{i.category}</span>
                          <span className="block text-xs text-muted-foreground">{i.description}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="suggestions">
        <TabsList>
          <TabsTrigger value="suggestions">Suggestions ({suggestions.length})</TabsTrigger>
          <TabsTrigger value="directory">Annuaire</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="mt-4 space-y-4">
          {suggestions.length === 0 ? (
            <EmptyState
              title="Aucune suggestion pour le moment"
              description="Complétez vos intentions pour recevoir des suggestions de contacts."
            />
          ) : (
            suggestions.map(m => (
              <Card key={m.id}>
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-4">
                    <PersonAvatar person={m.person} size="lg" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold">{m.person.fullName}</p>
                        {m.status === 'connected' && <StatusBadge status="accepted" label="Déjà connecté" />}
                        {requested.has(m.person.id) && <StatusBadge status="pending" label="Demande envoyée" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{m.person.title} — {m.person.company}</p>
                      {m.person.location && (
                        <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="size-3" /> {m.person.location}
                        </p>
                      )}
                      <div className="mt-3">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium text-muted-foreground">Score de compatibilité</span>
                          <span className={`font-semibold ${scoreColor(m.score)}`}>{m.score}%</span>
                        </div>
                        <Progress value={m.score} className="h-1.5" />
                      </div>
                      <ul className="mt-3 space-y-1">
                        {m.reasons.map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-sm text-muted-foreground">
                            <Star className="mt-0.5 size-3.5 shrink-0 text-warning" /> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex w-full flex-col gap-2 sm:w-44">
                      <Button
                        size="sm"
                        disabled={requested.has(m.person.id) || m.status === 'connected'}
                        onClick={() => sendRequest(m.person.id, m.person.fullName)}
                      >
                        <UserPlus className="mr-1.5 size-4" />
                        {m.status === 'connected' ? 'Connecté' : requested.has(m.person.id) ? 'Envoyée' : 'Se connecter'}
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/messages">Message</Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(m.person.id)}
                        className={favorites.has(m.person.id) ? 'text-error' : ''}
                      >
                        <Heart className={`mr-1.5 size-4 ${favorites.has(m.person.id) ? 'fill-current' : ''}`} />
                        {favorites.has(m.person.id) ? 'Favori' : 'Ajouter aux favoris'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="directory" className="mt-4">
          <DirectoryTab favorites={favorites} onToggleFavorite={toggleFavorite} />
        </TabsContent>
      </Tabs>

      <IntentionsDialog
        isOpen={intentionsOpen}
        onClose={() => setIntentionsOpen(false)}
        intentions={intentions}
        onSave={() => toast.success('Intentions enregistrées (démo)')}
      />
    </div>
  );
}

function DirectoryTab({ favorites, onToggleFavorite }: {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'offer' | 'seek'>('all');

  const people = useMemo(() => {
    const q = query.trim().toLowerCase();
    return directoryProfiles.filter(p => {
      if (!p.visibleInDirectory) return false;
      if (q && !`${p.fullName} ${p.title} ${p.company}`.toLowerCase().includes(q)) return false;
      if (filter !== 'all') {
        const has = (p.intentions ?? []).some(i => i.type === filter);
        if (!has) return false;
      }
      return true;
    });
  }, [query, filter]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative min-w-56 flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher dans l’annuaire…"
            className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <Select value={filter} onValueChange={v => setFilter(v as typeof filter)}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les intentions</SelectItem>
            <SelectItem value="offer">Proposent</SelectItem>
            <SelectItem value="seek">Recherchent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {people.length === 0 ? (
        <EmptyState title="Aucun profil dans l’annuaire" description="Les participants qui acceptent d’y figurer apparaîtront ici." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {people.map((p: DirectoryProfile) => (
            <Card key={p.id}>
              <CardContent className="flex gap-4 p-4">
                <PersonAvatar person={p} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{p.fullName}</p>
                    {p.connectionStatus === 'accepted' && <StatusBadge status="accepted" label="Connecté" />}
                    {p.connectionStatus === 'pending' && <StatusBadge status="pending" label="En attente" />}
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{p.title} — {p.company}</p>
                  {p.headline && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.headline}</p>}
                  <div className="mt-2 flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/network">Voir le profil <ArrowRight className="ml-1 size-3" /></Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onToggleFavorite(p.id)}
                      className={favorites.has(p.id) ? 'text-error' : ''}
                    >
                      <Heart className={`size-4 ${favorites.has(p.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
