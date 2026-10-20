import { useMemo, useState } from 'react';
import { Search, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader, PersonAvatar, EmptyState } from '@/components/shared';
import { conversations } from '@/lib/mock/messages';
import { cn } from '@/lib/utils';
import type { Conversation, Message } from '@/lib/mock/types';
import { currentUser } from '@/lib/mock/people';

function timeOf(iso: string) {
  return new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

function dayOf(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

export function MessagesPage() {
  const [threads, setThreads] = useState<Conversation[]>(conversations);
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [draft, setDraft] = useState('');
  const [query, setQuery] = useState('');

  const active = threads.find(t => t.id === activeId) ?? threads[0];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return threads.filter(t => !q || `${t.person.fullName} ${t.person.company}`.toLowerCase().includes(q));
  }, [threads, query]);

  function send() {
    const text = draft.trim();
    if (!text || !active) return;
    const msg: Message = {
      id: `m-${Date.now()}`,
      conversationId: active.id,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      text,
      sentAt: new Date().toISOString(),
      mine: true,
    };
    setThreads(prev => prev.map(t =>
      t.id === active.id
        ? { ...t, messages: [...t.messages, msg], lastMessage: text, lastMessageAt: msg.sentAt }
        : t
    ));
    setDraft('');
    // Simulated reply after a short delay (mock only)
    setTimeout(() => {
      const reply: Message = {
        id: `m-${Date.now()}-r`,
        conversationId: active.id,
        senderId: active.person.id,
        senderName: active.person.fullName,
        text: 'Bien reçu, je reviens vers vous rapidement.',
        sentAt: new Date().toISOString(),
        mine: false,
      };
      setThreads(prev => prev.map(t =>
        t.id === active.id ? { ...t, messages: [...t.messages, reply], lastMessage: reply.text, lastMessageAt: reply.sentAt } : t
      ));
    }, 1200);
  }

  return (
    <div className="flex flex-col gap-4 lg:h-full">
      <PageHeader title="Messages" description="Vos conversations professionnelles." />

      <div className="grid min-w-0 grid-cols-1 gap-4 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {/* Conversation list */}
        <Card className="min-h-0 gap-0 py-0">
          <CardContent className="flex min-h-0 flex-1 flex-col p-0">
            <div className="shrink-0 border-b border-border p-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Rechercher une conversation…"
                  className="h-9 w-full rounded-md border border-input bg-transparent pl-9 pr-3 text-sm"
                />
              </div>
            </div>
            <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto" role="region" aria-label="Conversations">
              {filtered.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">Aucune conversation.</p>
              ) : (
                filtered.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveId(t.id)}
                    aria-pressed={active?.id === t.id}
                    className={cn(
                      'flex w-full items-start gap-3 border-b border-border/60 p-3 text-left transition-colors hover:bg-muted/50 last:border-b-0',
                      active?.id === t.id && 'bg-muted inset-shadow-[2px_0_0_var(--selected-indicator)]'
                    )}
                  >
                    <PersonAvatar person={t.person} size="sm" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="break-words text-sm font-semibold">{t.person.fullName}</p>
                        <span className="shrink-0 text-xs text-muted-foreground">{dayOf(t.lastMessageAt)}</span>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">{t.lastMessage}</p>
                    </div>
                    {t.unreadCount > 0 && (
                      <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {t.unreadCount}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Thread */}

      </div>
    </div>
  );
}
