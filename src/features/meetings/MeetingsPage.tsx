import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { CalendarDays, Clock, MapPin, Plus, Video } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader, PersonAvatar, EmptyState, MeetingStatusBadge, formatDate, formatTime } from '@/components/shared';
import { meetings } from '@/lib/mock/networking';
import { people } from '@/lib/mock/people';
import type { Meeting } from '@/lib/mock/types';

const statusOrder: Record<string, number> = {
  requested: 0, proposed: 1, countered: 2, confirmed: 3, declined: 4, cancelled: 5, completed: 6, expired: 7,
};

export function MeetingsPage() {
  const [items, setItems] = useState<Meeting[]>(meetings);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detail, setDetail] = useState<Meeting | null>(null);

  const upcoming = items
    .filter(m => !['completed', 'cancelled', 'declined', 'expired'].includes(m.status))
    .sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
  const past = items
    .filter(m => ['completed', 'cancelled', 'declined', 'expired'].includes(m.status))
    .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime());

  const actionable = upcoming.filter(m => ['requested', 'proposed', 'countered'].includes(m.status));

  function update(id: string, status: Meeting['status']) {
    setItems(prev => prev.map(m => (m.id === id ? { ...m, status } : m)));
    setDetail(prev => (prev?.id === id ? { ...prev, status } : prev));
  }

  function accept(m: Meeting) {
    update(m.id, 'confirmed');
    toast.success(`Rendez-vous avec ${m.withPerson.fullName} confirmé`);
  }

  function decline(m: Meeting) {
    update(m.id, 'declined');
    toast('Demande de rendez-vous refusée');
  }

  function counter(m: Meeting) {
    // Mock counter-proposal: shift the slot by one hour
    const start = new Date(m.startsAt);
    start.setHours(start.getHours() + 1);
    const end = new Date(m.endsAt);
    end.setHours(end.getHours() + 1);
    setItems(prev => prev.map(x => x.id === m.id ? {
      ...x,
      status: 'countered' as const,
      startsAt: start.toISOString(),
      endsAt: end.toISOString(),
    } : x));
    setDetail(prev => prev?.id === m.id ? {
      ...prev,
      status: 'countered' as const,
      startsAt: start.toISOString(),
      endsAt: end.toISOString(),
    } : prev);
    toast('Contre-proposition envoyée (+1h)');
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Rendez-vous"
        description="Demandes, propositions et rendez-vous confirmés avec vos contacts."
        actions={<Button onClick={() => setDialogOpen(true)}><Plus className="mr-2 size-4" />Demander un rendez-vous</Button>}
      />

      {actionable.length > 0 && (
        <Card className="border-warning-border bg-warning-surface">
          <CardContent className="p-4">
            <h2 className="mb-3 text-sm font-semibold text-warning">Actions requises ({actionable.length})</h2>
            <div className="space-y-2">
              {actionable.map(m => (
                <div key={m.id} className="flex flex-wrap items-center gap-3 rounded-lg bg-card text-card-foreground p-3">
                  <PersonAvatar person={m.withPerson} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.withPerson.fullName} · {formatDate(m.startsAt)} à {formatTime(m.startsAt)}
                    </p>
                  </div>
                  <MeetingStatusBadge status={m.status} />
                  <div className="flex gap-2">
                    {m.isOrganizer || m.status === 'requested' ? (
                      <>
                        <Button size="sm" onClick={() => accept(m)}>Accepter</Button>
                        <Button size="sm" variant="outline" onClick={() => counter(m)}>Contre-proposer</Button>
                        <Button size="sm" variant="ghost" onClick={() => decline(m)}>Refuser</Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setDetail(m)}>Voir</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">À venir ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Passés ({past.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4 space-y-3">
          {upcoming.length === 0 ? (
            <EmptyState title="Aucun rendez-vous à venir" description="Vos rendez-vous confirmés et demandes apparaîtront ici." />
          ) : (
            upcoming.map(m => <MeetingRow key={m.id} meeting={m} onOpen={() => setDetail(m)} />)
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4 space-y-3">
          {past.map(m => <MeetingRow key={m.id} meeting={m} onOpen={() => setDetail(m)} />)}
        </TabsContent>
      </Tabs>

      {/* Detail dialog */}
      <Dialog open={!!detail} onOpenChange={open => !open && setDetail(null)}>
        <DialogContent>
          {detail && (
            <>
              <DialogHeader>
                <DialogTitle>{detail.title}</DialogTitle>
                <DialogDescription>
                  avec {detail.withPerson.fullName} — {detail.withPerson.title}, {detail.withPerson.company}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2"><CalendarDays className="size-4 text-muted-foreground" />{formatDate(detail.startsAt)}</p>
                <p className="flex items-center gap-2"><Clock className="size-4 text-muted-foreground" />{formatTime(detail.startsAt)} – {formatTime(detail.endsAt)}</p>
                {detail.location && <p className="flex items-center gap-2"><MapPin className="size-4 text-muted-foreground" />{detail.location}</p>}
                {detail.location?.toLowerCase().includes('visio') && <Video className="size-4 text-muted-foreground" />}
                {detail.eventName && <p className="text-muted-foreground">Événement : {detail.eventName}</p>}
                {detail.agenda && <p className="rounded-md bg-muted p-3 text-muted-foreground">{detail.agenda}</p>}
                {detail.notes && <p className="rounded-md bg-muted p-3 text-muted-foreground">{detail.notes}</p>}
                <MeetingStatusBadge status={detail.status} />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => { update(detail.id, 'cancelled'); toast('Rendez-vous annulé'); }}>Annuler le RDV</Button>
                {detail.status === 'confirmed' && (
                  <Button onClick={() => toast.success('Invitation ajoutée à votre agenda (démo)')}>Ajouter à l’agenda</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <RequestMeetingDialog open={dialogOpen} onClose={() => setDialogOpen(false)} onCreate={m => {
        setItems(prev => [...prev, m]);
        setDialogOpen(false);
        toast.success('Demande de rendez-vous envoyée');
      }} />
    </div>
  );
}

function MeetingRow({ meeting, onOpen }: { meeting: Meeting; onOpen: () => void }) {
  return (
    <Card className="cursor-pointer transition-colors hover:border-primary/40" onClick={onOpen}>
      <CardContent className="flex flex-wrap items-center gap-4 p-4">
        <div className="flex items-center gap-3">
          <PersonAvatar person={meeting.withPerson} size="sm" />
          <div>
            <p className="font-medium">{meeting.title}</p>
            <p className="text-xs text-muted-foreground">avec {meeting.withPerson.fullName}</p>
          </div>
        </div>
        <div className="min-w-0 flex-1 basis-36 text-sm text-muted-foreground">
          <p className="flex items-center gap-1.5"><CalendarDays className="size-4" />{formatDate(meeting.startsAt)}</p>
          <p className="flex items-center gap-1.5"><Clock className="size-4" />{formatTime(meeting.startsAt)} – {formatTime(meeting.endsAt)}</p>
        </div>
        {meeting.location && <Badge variant="outline">{meeting.location}</Badge>}
        <MeetingStatusBadge status={meeting.status} />
      </CardContent>
    </Card>
  );
}

function RequestMeetingDialog({ open, onClose, onCreate }: {
  open: boolean;
  onClose: () => void;
  onCreate: (m: Meeting) => void;
}) {
  const [personId, setPersonId] = useState(people[0].id);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');

  const person = people.find(p => p.id === personId)!;

  function submit() {
    if (!title.trim() || !date || !time) return;
    const startsAt = new Date(`${date}T${time}`).toISOString();
    const end = new Date(new Date(`${date}T${time}`).getTime() + 30 * 60000).toISOString();
    onCreate({
      id: `m-${Date.now()}`,
      title: title.trim(),
      withPerson: person,
      startsAt,
      endsAt: end,
      location: location || undefined,
      status: 'requested',
      isOrganizer: true,
      agenda: undefined,
    });
    setTitle(''); setDate(''); setTime(''); setLocation('');
  }

  return (
    <Dialog open={open} onOpenChange={o => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Demander un rendez-vous</DialogTitle>
          <DialogDescription>Proposez un créneau à un de vos contacts.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label>Contact</Label>
            <Select value={personId} onValueChange={setPersonId}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {people.slice(0, 6).map(p => <SelectItem key={p.id} value={p.id}>{p.fullName} — {p.company}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mt-title">Objet</Label>
            <Input id="mt-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex. Point partenariat" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="mt-date">Date</Label>
              <Input id="mt-date" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mt-time">Heure</Label>
              <Input id="mt-time" type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="mt-loc">Lieu (optionnel)</Label>
            <Input id="mt-loc" value={location} onChange={e => setLocation(e.target.value)} placeholder="Ex. Hall 4, stand B-21" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={submit} disabled={!title.trim() || !date || !time}>Envoyer la demande</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
