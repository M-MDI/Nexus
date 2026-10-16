import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CalendarDays, MapPin, Users, FileText, Clock, User, CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  PageHeader, StatusBadge, EmptyState, formatDate, formatTime,
} from '@/components/shared';
import { getEvent } from '@/lib/mock/events';

export function EventDetailPage() {
  const { eventId } = useParams();
  const event = eventId ? getEvent(eventId) : undefined;
  const [registered, setRegistered] = useState(event?.myStatus === 'registered' || event?.myStatus === 'attended');

  if (!event) {
    return (
      <EmptyState
        title="Événement introuvable"
        description="Cet événement n’existe pas ou n’est plus disponible."
        action={<Button asChild variant="outline"><Link to="/events/discover">Retour à la découverte</Link></Button>}
      />
    );
  }

  const sessions = event.sessions ?? [];
  const documents = event.documents ?? [];

  function handleRegister() {
    setRegistered(true);
    toast.success(`Inscription à « ${event!.name} » confirmée`, {
      description: 'Vous pouvez désormais compléter vos intentions pour cet événement.',
    });
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title={event.name}
        description={event.description}
        backTo={{ to: '/events/discover', label: 'Découvrir les événements' }}
        actions={
          registered ? (
            <StatusBadge status="registered" label="Inscrit" />
          ) : (
            <Button onClick={handleRegister}>S’inscrire</Button>
          )
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader><CardTitle className="text-base">À propos</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{event.description}</p>
              {event.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {event.tags.map(t => <Badge key={t} variant="secondary">{t}</Badge>)}
                </div>
              )}
            </CardContent>
          </Card>

          <Tabs defaultValue={sessions.length ? 'program' : 'info'}>
            <TabsList>
              <TabsTrigger value="program" disabled={!sessions.length}>Programme</TabsTrigger>
              <TabsTrigger value="docs" disabled={!documents.length}>Documents</TabsTrigger>
              <TabsTrigger value="info">Informations</TabsTrigger>
            </TabsList>
            <TabsContent value="program" className="mt-4">
              <Card>
                <CardContent className="divide-y p-0">
                  {sessions.map(s => (
                    <div key={s.id} className="flex gap-4 p-4">
                      <div className="w-24 shrink-0 text-sm">
                        <p className="font-medium">{formatDate(s.startTime)}</p>
                        <p className="text-muted-foreground">{formatTime(s.startTime)} – {formatTime(s.endTime)}</p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{s.title}</p>
                          {s.track && <Badge variant="outline" className="text-xs">{s.track}</Badge>}
                        </div>
                        {s.description && <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>}
                        <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                          {s.location && <span className="flex items-center gap-1"><MapPin className="size-3" />{s.location}</span>}
                          {s.speakerName && <span className="flex items-center gap-1"><User className="size-3" />{s.speakerName}</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="docs" className="mt-4">
              <Card>
                <CardContent className="divide-y p-0">
                  {documents.map(d => (
                    <a key={d.id} href={d.url ?? '#'} className="flex items-center gap-3 p-4 hover:bg-muted/50">
                      <FileText className="size-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{d.name}</span>
                      <Badge variant="outline" className="ml-auto text-xs uppercase">{d.kind}</Badge>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="info" className="mt-4">
              <Card>
                <CardContent className="space-y-3 p-4 text-sm">
                  <p className="flex items-center gap-2"><CalendarDays className="size-4 text-muted-foreground" />
                    {formatDate(event.startsAt)}{event.endsAt !== event.startsAt ? ` – ${formatDate(event.endsAt)}` : ''}
                  </p>
                  <p className="flex items-center gap-2"><MapPin className="size-4 text-muted-foreground" />{event.location}</p>
                  <p className="flex items-center gap-2"><User className="size-4 text-muted-foreground" />Organisé par {event.organizerName}</p>
                  {event.capacity != null && (
                    <p className="flex items-center gap-2"><Users className="size-4 text-muted-foreground" />
                      {event.registeredCount ?? 0} inscrits{event.capacity ? ` sur ${event.capacity} places` : ''}
                    </p>
                  )}
                  <p className="flex items-center gap-2"><Clock className="size-4 text-muted-foreground" />{event.priceLabel}</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Votre participation</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              {registered ? (
                <>
                  <p className="flex items-center gap-2 text-success"><CheckCircle2 className="size-4" /> Inscription confirmée</p>
                  <p className="text-muted-foreground">
                    Renseignez vos intentions « Je propose » / « Je recherche » dans
                    {' '}<Link to="/matching" className="text-primary hover:underline">Matching professionnel</Link>
                    {' '}pour cet événement.
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/matching">Gérer mes intentions</Link>
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-muted-foreground">Rejoignez cet événement pour accéder à l’annuaire et au matching.</p>
                  <Button className="w-full" onClick={handleRegister}>S’inscrire</Button>
                </>
              )}
              <StatusBadge status={event.status} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
