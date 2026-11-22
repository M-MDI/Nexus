import { UserPlus, Check, Clock, ChatCircle, CalendarCheck } from '@phosphor-icons/react';
import type { Connection } from '../types/profile';

interface ProfessionalNetworkProps {
  connections: Connection[];
}

export function ProfessionalNetwork({ connections }: ProfessionalNetworkProps) {
  const accepted = connections.filter(c => c.status === 'accepted');
  const pending = connections.filter(c => c.status === 'pending');

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section className="profile-section">
      <h2 className="section-title">Mon réseau professionnel</h2>

      {connections.length === 0 ? (
        <div className="empty-state-large">
          <UserPlus size={48} />
          <p>Vous n'avez pas encore de connexions.</p>
        </div>
      ) : (
        <div className="network-container">
          {pending.length > 0 && (
            <div className="network-group">
              <h3 className="network-group-title">
                <Clock size={18} />
                Demandes en attente ({pending.length})
              </h3>
              <div className="connections-list">
                {pending.map(connection => (
                  <ConnectionCard
                    key={connection.id}
                    connection={connection}
                    getInitials={getInitials}
                  />
                ))}
              </div>
            </div>
          )}

          {accepted.length > 0 && (
            <div className="network-group">
              <h3 className="network-group-title">
                <Check size={18} />
                Connexions acceptées ({accepted.length})
              </h3>
              <div className="connections-list">
                {accepted.map(connection => (
                  <ConnectionCard
                    key={connection.id}
                    connection={connection}
                    getInitials={getInitials}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

interface ConnectionCardProps {
  connection: Connection;
  getInitials: (name: string) => string;
}

function ConnectionCard({ connection, getInitials }: ConnectionCardProps) {
  return (
    <div className="connection-card">
      <div className="connection-avatar">
        {connection.avatarUrl ? (
          <img src={connection.avatarUrl} alt={connection.fullName} />
        ) : (
          <span className="avatar-initials">{getInitials(connection.fullName)}</span>
        )}
      </div>

      <div className="connection-info">
        <h4 className="connection-name">{connection.fullName}</h4>
        <p className="connection-title">{connection.title}</p>
        <p className="connection-company">{connection.company}</p>
      </div>

      <div className="connection-actions">
        {connection.status === 'pending' && (
          <div className="pending-actions">
            <button className="btn-icon-small" aria-label="Accepter">
              <Check size={18} />
            </button>
            <button className="btn-icon-small" aria-label="Refuser">
              <UserPlus size={18} />
            </button>
          </div>
        )}

        {connection.status === 'accepted' && (
          <div className="accepted-actions">
            {connection.upcomingMeeting && (
              <div className="upcoming-meeting">
                <CalendarCheck size={16} />
                <span>
                  {connection.upcomingMeeting.date} à {connection.upcomingMeeting.time}
                </span>
              </div>
            )}
            <button className="btn-icon-small" aria-label="Message">
              <ChatCircle size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
