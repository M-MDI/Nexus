import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { CalendarDays, MapPin, Pencil, Plus, Trash2, Users } from 'lucide-react';
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
import { Textarea } from '@/components/ui/textarea';
import { PageHeader, StatusBadge, formatDate } from '@/components/shared';
import { events } from '@/lib/mock/events';
import type { Event } from '@/lib/mock/types';

const organized = events.filter(e => e.myRole === 'organizer' || e.organizerId === 'org-nexus');

export function OrganizerEventsPage() {
  const [items, setItems] = useState<Event[]>(organized);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);

  const [form, setForm] = useState({ name: '', location: '', startsAt: '', description: '' });

  function openCreate() {
    setEditing(null);
    setForm({ name: '', location: '', startsAt: '', description: '' });
    setDialogOpen(true);
  }

  function openEdit(e: Event) {
    setEditing(e);
    setForm({ name: e.name, location: e.location, startsAt: e.startsAt, description: e.description });
    setDialogOpen(true);
  }

  function save() {
    if (!form.name.trim()) return;
    if (editing) {
      setItems(prev => prev.map(e => e.id === editing.id ? { ...e, ...form } : e));
      toast.success('Événement mis à jour');
    } else {
      const created: Event = {
        id: `ev-${Date.now()}`,
        name: form.name,
        description: form.description,
        startsAt: form.startsAt || new Date().toISOString().slice(0, 10),
        endsAt: form.startsAt || new Date().toISOString().slice(0, 10),
        location: form.location,
        organizerName: 'Nexus Events',
        organizerId: 'org-nexus',
        status: 'draft',
        registeredCount: 0,
        myRole: 'organizer',
      };
      setItems(prev => [created, ...prev]);
      toast.success('Événement créé en brouillon');
    }
    setDialogOpen(false);
  }

  function remove(id: string) {
    setItems(prev => prev.filter(e => e.id !== id));
    toast('Événement supprimé (démo)');
  }

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Mes événements organisés"
        description="Créez et pilotez vos événements professionnels."
        actions={<Button onClick={openCreate}><Plus className="mr-2 size-4" />Nouvel événement</Button>}
      />

      <div className="space-y-3">
        {items.map(e => (
          <Card key={e.id}>
            <CardContent className="flex flex-wrap items-center gap-4 p-4">
              <div className="min-w-0 flex-1 basis-48">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{e.name}</p>
                  <StatusBadge status={e.status} />
                </div>
                <div className="mt-1 flex flex-wrap gap-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><CalendarDays className="size-4" />{formatDate(e.startsAt)}</span>
                  <span className="flex items-center gap-1"><MapPin className="size-4" />{e.location}</span>
                  <span className="flex items-center gap-1"><Users className="size-4" />{e.registeredCount ?? 0} inscrits</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => openEdit(e)}><Pencil className="mr-1.5 size-4" />Modifier</Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/events/${e.id}`}>Fiche publique</Link>
                </Button>
                <Button variant="ghost" size="icon" onClick={() => remove(e.id)} aria-label="Supprimer"><Trash2 className="size-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {items.length === 0 && (
          <Card><CardContent className="p-10 text-center text-sm text-muted-foreground">Aucun événement organisé pour le moment.</CardContent></Card>
        )}
      </div>


    </div>
  );
}
