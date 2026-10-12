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

    </Card>
  );
}
