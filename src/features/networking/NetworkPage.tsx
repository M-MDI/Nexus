import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Heart, MessageSquare, Search, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PageHeader, PersonAvatar, EmptyState, StatusBadge, formatDate,
} from '@/components/shared';
import { connections } from '@/lib/mock/networking';
import { directoryProfiles } from '@/lib/mock/people';
import type { Connection } from '@/lib/mock/types';

export function NetworkPage() {
  const [tab, setTab] = useState('contacts');

  const accepted = connections.filter(c => c.status === 'accepted');
  const pendingReceived = connections.filter(c => c.status === 'pending');
  const sent = connections.filter(c => c.status === 'requested');

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Mon réseau"
        description="Vos contacts professionnels, demandes en attente et suggestions."
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="contacts">Contacts ({accepted.length})</TabsTrigger>
          <TabsTrigger value="requests">Demandes ({pendingReceived.length + sent.length})</TabsTrigger>
          <TabsTrigger value="directory">Annuaire</TabsTrigger>
          <TabsTrigger value="favorites">Favoris</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="mt-4">
          {accepted.length === 0 ? (
            <EmptyState title="Aucun contact pour le moment" description="Vos connexions acceptées apparaîtront ici." />
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {accepted.map(c => <ContactCard key={c.id} connection={c} />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="requests" className="mt-4 space-y-3">
          {pendingReceived.length === 0 && sent.length === 0 ? (
            <EmptyState title="Aucune demande en cours" />
          ) : (
            <>
              {pendingReceived.map(c => <RequestRow key={c.id} connection={c} incoming />)}
              {sent.map(c => <RequestRow key={c.id} connection={c} incoming={false} />)}
            </>
          )}
        </TabsContent>




      </Tabs>
    </div>
  );
}

function ContactCard({ connection }: { connection: Connection }) {
  const p = connection.person;
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <PersonAvatar person={p} />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">{p.fullName}</p>
            <p className="break-words text-sm text-muted-foreground">{p.title} — {p.company}</p>
            {p.location && <p className="text-xs text-muted-foreground">{p.location}</p>}
          </div>
          <StatusBadge status="accepted" />
        </div>
        {connection.eventName && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="size-3.5" /> Rencontré·e au {connection.eventName}
          </p>
        )}
        {connection.upcomingMeeting && (
          <p className="mt-1 flex items-center gap-1.5 text-xs text-primary">
            <Users className="size-3.5" /> Prochain RDV : {formatDate(connection.upcomingMeeting.startsAt)} à {connection.upcomingMeeting.startsAt.slice(11, 16)}
          </p>
        )}
        <div className="mt-3 flex gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to="/messages"><MessageSquare className="mr-1.5 size-3.5" />Message</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/meetings">RDV</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function RequestRow({ connection, incoming }: { connection: Connection; incoming: boolean }) {
  const p = connection.person;
  const [state, setState] = useState<'idle' | 'accepted' | 'declined'>('idle');

  function respond(accept: boolean) {
    setState(accept ? 'accepted' : 'declined');
    toast.success(accept ? `Connexion avec ${p.fullName} acceptée` : 'Demande refusée');
  }

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center gap-4 p-4">
        <PersonAvatar person={p} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{p.fullName}</p>
          <p className="text-sm text-muted-foreground">{p.title} — {p.company}</p>
          {connection.eventName && (
            <p className="text-xs text-muted-foreground">via {connection.eventName}</p>
          )}
        </div>
        {state === 'accepted' ? (
          <StatusBadge status="accepted" label="Connecté" />
        ) : state === 'declined' ? (
          <StatusBadge status="declined" label="Refusé" />
        ) : incoming ? (
          <div className="flex gap-2">
            <Button size="sm" onClick={() => respond(true)}><UserPlus className="mr-1.5 size-4" />Accepter</Button>
            <Button variant="outline" size="sm" onClick={() => respond(false)}>Refuser</Button>
          </div>
        ) : (
          <StatusBadge status="pending" label="En attente de réponse" />
        )}
      </CardContent>
    </Card>
  );
}

function DirectoryGrid() {
  const [query, setQuery] = useState('');

  const people = useMemo(() => {
    const q = query.trim().toLowerCase();
    return directoryProfiles.filter(p =>
      p.visibleInDirectory && (!q || `${p.fullName} ${p.title} ${p.company}`.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="space-y-4">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher dans l’annuaire…"
          className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      {people.length === 0 ? (
        <EmptyState title="Aucun profil trouvé" />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {people.map(p => (
            <Card key={p.id}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <PersonAvatar person={p} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{p.fullName}</p>
                    <p className="break-words text-sm text-muted-foreground">{p.title} — {p.company}</p>
                    {p.headline && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{p.headline}</p>}
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  {p.isFavorite ? <Heart className="size-4 fill-current text-error" /> : <span />}
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/network">Profil</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function FavoritesGrid() {
  const favs = directoryProfiles.filter(p => p.isFavorite);
  return favs.length === 0 ? (
    <EmptyState
      title="Aucun favori"
      description="Ajoutez des contacts à vos favoris depuis le matching ou l’annuaire."
    />
  ) : (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {favs.map(p => (
        <Card key={p.id}>
          <CardContent className="flex items-center gap-3 p-4">
            <PersonAvatar person={p} size="sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{p.fullName}</p>
              <p className="truncate text-xs text-muted-foreground">{p.title} — {p.company}</p>
            </div>
            <Heart className="size-4 fill-current text-error" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
