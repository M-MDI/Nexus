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


    </div>
  );
}
