import { Buildings, CheckCircle, Clock, XCircle } from '@phosphor-icons/react';
import type { CompanyMembership } from '../types/profile';

interface CompanyMembershipProps {
  membership: CompanyMembership;
}

export function CompanyMembership({ membership }: CompanyMembershipProps) {
  if (membership.status === 'none') {
    return (
      <section className="profile-section">
        <h2 className="section-title">Appartenance entreprise</h2>
        <div className="company-card company-empty">
          <Buildings size={48} />
          <p>Vous n'êtes pas encore associé à une entreprise.</p>
          <button className="btn-secondary">Rejoindre une entreprise</button>
        </div>
      </section>
    );
  }

  const statusConfig = {
    active: {
      icon: <CheckCircle size={20} />,
      label: 'Membre actif',
      className: 'status-active',
    },
    pending: {
      icon: <Clock size={20} />,
      label: 'Invitation en attente',
      className: 'status-pending',
    },
  };

  const status = statusConfig[membership.status];

  return (
    <section className="profile-section">
      <h2 className="section-title">Appartenance entreprise</h2>

      <div className="company-card">
        <div className="company-header">
          <div className="company-logo">
            {membership.logoUrl ? (
              <img src={membership.logoUrl} alt={membership.companyName} />
            ) : (
              <Buildings size={32} />
            )}
          </div>
          <div className="company-info">
            <h3 className="company-name">{membership.companyName}</h3>
            <div className={`company-status ${status.className}`}>
              {status.icon}
              <span>{status.label}</span>
            </div>
          </div>
        </div>

        <div className="company-details">
          <div className="company-detail">
            <span className="detail-label">Secteur</span>
            <span className="detail-value">{membership.industry}</span>
          </div>
          <div className="company-detail">
            <span className="detail-label">Rôle</span>
            <span className="detail-value">{membership.role}</span>
          </div>
          {membership.joinedAt && (
            <div className="company-detail">
              <span className="detail-label">Membre depuis</span>
              <span className="detail-value">
                {new Date(membership.joinedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          )}
        </div>

        {membership.status === 'pending' && (
          <div className="company-actions">
            <button className="btn-primary">Accepter l'invitation</button>
            <button className="btn-ghost">Refuser</button>
          </div>
        )}
      </div>
    </section>
  );
}
