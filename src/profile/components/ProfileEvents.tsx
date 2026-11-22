import { Calendar, MapPin, Users, ArrowRight } from '@phosphor-icons/react';
import type { EventParticipation } from '../types/profile';

interface ProfileEventsProps {
  events: EventParticipation[];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ProfileEvents({ events }: ProfileEventsProps) {
  const upcoming = events.filter(e => e.status === 'upcoming');
  const past = events.filter(e => e.status === 'past');

  return (
    <section className="profile-section">
      <h2 className="section-title">Mes événements</h2>

      {events.length === 0 ? (
        <div className="empty-state-large">
          <Calendar size={48} />
          <p>Vous n'avez pas encore rejoint d'événement.</p>
        </div>
      ) : (
        <div className="events-container">
          {upcoming.length > 0 && (
            <div className="events-group">
              <h3 className="events-group-title">À venir</h3>
              <div className="events-list">
                {upcoming.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div className="events-group">
              <h3 className="events-group-title">Passés</h3>
              <div className="events-list">
                {past.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

interface EventCardProps {
  event: EventParticipation;
}

function EventCard({ event }: EventCardProps) {
  const statusColors = {
    upcoming: 'status-upcoming',
    past: 'status-past',
    cancelled: 'status-cancelled',
  };

  const statusLabels = {
    upcoming: 'À venir',
    past: 'Terminé',
    cancelled: 'Annulé',
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <div className="event-status">
          <span className={`status-badge ${statusColors[event.status]}`}>
            {statusLabels[event.status]}
          </span>
        </div>
        <div className="event-role">{event.role}</div>
      </div>

      <h4 className="event-name">{event.eventName}</h4>

      <div className="event-details">
        <div className="event-detail">
          <Calendar size={16} />
          <span>{formatDate(event.eventDate)}</span>
        </div>
        <div className="event-detail">
          <MapPin size={16} />
          <span>{event.location}</span>
        </div>
        <div className="event-detail">
          <Users size={16} />
          <span>{event.organizer}</span>
        </div>
      </div>

      <button className="btn-text btn-text-icon">
        Voir l'événement <ArrowRight size={16} />
      </button>
    </div>
  );
}
