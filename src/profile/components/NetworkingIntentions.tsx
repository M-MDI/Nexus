import { HandHeart, Handshake, Plus, X } from '@phosphor-icons/react';
import type { NetworkingIntention } from '../types/profile';

interface NetworkingIntentionsProps {
  intentions: NetworkingIntention[];
  onEdit: () => void;
  isOwnProfile: boolean;
}

export function NetworkingIntentions({
  intentions,
  onEdit,
  isOwnProfile,
}: NetworkingIntentionsProps) {
  const offers = intentions.filter(i => i.type === 'offer');
  const seeks = intentions.filter(i => i.type === 'seek');

  return (
    <section className="profile-section">
      <div className="section-header">
        <h2 className="section-title">Intentions de networking</h2>
        {isOwnProfile && (
          <button className="btn-text" onClick={onEdit}>
            Modifier
          </button>
        )}
      </div>

      <div className="intentions-grid">
        <div className="intention-column">
          <div className="intention-header offers">
            <HandHeart size={24} />
            <h3>Ce que je propose</h3>
          </div>
          <div className="intentions-list">
            {offers.length > 0 ? (
              offers.map(intention => (
                <IntentionCard key={intention.id} intention={intention} />
              ))
            ) : (
              <p className="empty-state">Aucune proposition renseignée</p>
            )}
          </div>
        </div>

        <div className="intention-column">
          <div className="intention-header seeks">
            <Handshake size={24} />
            <h3>Ce que je recherche</h3>
          </div>
          <div className="intentions-list">
            {seeks.length > 0 ? (
              seeks.map(intention => (
                <IntentionCard key={intention.id} intention={intention} />
              ))
            ) : (
              <p className="empty-state">Aucune recherche renseignée</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

interface IntentionCardProps {
  intention: NetworkingIntention;
}

function IntentionCard({ intention }: IntentionCardProps) {
  return (
    <div className="intention-card">
      <div className="intention-category">{intention.category}</div>
      <p className="intention-description">{intention.description}</p>
      {intention.eventName && (
        <div className="intention-event">
          <span className="event-badge">{intention.eventName}</span>
        </div>
      )}
    </div>
  );
}
