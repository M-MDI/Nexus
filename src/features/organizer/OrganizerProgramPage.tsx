import { useState } from 'react';
import { toast } from 'sonner';
import { Clock, MapPin, Pencil, Plus, Trash2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader, EmptyState, formatDate, formatTime } from '@/components/shared';
import { getEventSessions } from '@/lib/mock/networking';
import { getEvent } from '@/lib/mock/events';
import type { EventSession } from '@/lib/mock/types';

const event = getEvent('ev-salon')!;

export function OrganizerProgramPage() {
  const [sessions, setSessions] = useState<EventSession[]>(getEventSessions('ev-salon'));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<EventSession | null>(null);
  const [form, setForm] = useState({ title: '', start: '', end: '', location: '', speakerName: '', track: '', description: '' });

  function openCreate() {
    setEditing(null);
    setForm({ title: '', start: '', end: '', location: '', speakerName: '', track: '', description: '' });
    setDialogOpen(true);
  }

  function openEdit(s: EventSession) {
    setEditing(s);
    setForm({
      title: s.title,
      start: s.startTime.slice(0, 16),
      end: s.endTime.slice(0, 16),
      location: s.location ?? '',
      speakerName: s.speakerName ?? '',
      track: s.track ?? '',
      description: s.description ?? '',
    });
    setDialogOpen(true);
  }

  function save() {
    if (!form.title.trim() || !form.start || !form.end) return;
    const payload: EventSession = {
      id: editing?.id ?? `s-${Date.now()}`,
      title: form.title.trim(),
      description: form.description || undefined,
      startTime: new Date(form.start).toISOString(),
      endTime: new Date(form.end).toISOString(),
      location: form.location || undefined,
      speakerName: form.speakerName || undefined,
      track: form.track || undefined,
    };
    setSessions(prev => editing ? prev.map(s => s.id === editing.id ? payload : s) : [...prev, payload].sort((a, b) => a.startTime.localeCompare(b.startTime)));
    setDialogOpen(false);
    toast.success(editing ? 'Session mise à jour' : 'Session ajoutée');
  }

  function remove(id: string) {
    setSessions(prev => prev.filter(s => s.id !== id));
    toast('Session supprimée (démo)');
  }

  const byDay = sessions.reduce<Record<string, EventSession[]>>((acc, s) => {
    const day = formatDate(s.startTime);
    (acc[day] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4 xl:gap-5">
      <PageHeader
        title="Programme"
        description={`${event.name} — sessions, horaires et intervenants.`}
        actions={<Button onClick={openCreate}><Plus className="mr-2 size-4" />Ajouter une session</Button>}
      />

      {sessions.length === 0 ? (
        <EmptyState title="Programme vide" description="Ajoutez des sessions pour construire le programme de l’événement." />
      ) : (
        Object.entries(byDay).map(([day, items]) => (
          <div key={day}>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">{day}</h2>
            <div className="space-y-2">
              {items.map(s => (
                <Card key={s.id}>
                  <CardContent className="flex flex-wrap items-center gap-4 p-4">
                    <div className="w-16 shrink-0 sm:w-32">
                      <p className="text-sm font-medium">{formatTime(s.startTime)}</p>
                      <p className="text-xs text-muted-foreground">– {formatTime(s.endTime)}</p>
                    </div>
                    <div className="min-w-0 flex-1 basis-40">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">{s.title}</p>
                        {s.track && <Badge variant="outline" className="text-xs">{s.track}</Badge>}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-x-4 text-xs text-muted-foreground">
                        {s.location && <span className="flex items-center gap-1"><MapPin className="size-3" />{s.location}</span>}
                        {s.speakerName && <span className="flex items-center gap-1"><User className="size-3" />{s.speakerName}</span>}
                        {s.description && <span className="flex items-center gap-1"><Clock className="size-3" />{s.description.slice(0, 60)}…</span>}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(s)} aria-label="Modifier"><Pencil className="size-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => remove(s.id)} aria-label="Supprimer"><Trash2 className="size-4" /></Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}


    </div>
  );
}
