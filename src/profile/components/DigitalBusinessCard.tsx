import { QrCode, Share, Download, X } from '@phosphor-icons/react';
import type { BusinessCard } from '../types/profile';

interface DigitalBusinessCardProps {
  businessCard: BusinessCard;
  isOpen: boolean;
  onClose: () => void;
}

export function DigitalBusinessCard({
  businessCard,
  isOpen,
  onClose,
}: DigitalBusinessCardProps) {
  if (!isOpen) return null;

  const initials = businessCard.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Carte de visite numérique</h2>
          <button className="btn-icon" onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        <div className="business-card-preview">
          <div className="card-front">
            <div className="card-header">
              {businessCard.avatarUrl ? (
                <img
                  src={businessCard.avatarUrl}
                  alt={businessCard.fullName}
                  className="card-avatar"
                />
              ) : (
                <div className="card-avatar-placeholder">{initials}</div>
              )}
              <div className="card-identity">
                <h3 className="card-name">{businessCard.fullName}</h3>
                <p className="card-title">{businessCard.title}</p>
                <p className="card-company">{businessCard.company}</p>
              </div>
            </div>

            <div className="card-body">
              {businessCard.email && (
                <div className="card-contact-item">
                  <span className="contact-label">E-mail</span>
                  <span className="contact-value">{businessCard.email}</span>
                </div>
              )}
              {businessCard.phone && (
                <div className="card-contact-item">
                  <span className="contact-label">Téléphone</span>
                  <span className="contact-value">{businessCard.phone}</span>
                </div>
              )}
              {businessCard.website && (
                <div className="card-contact-item">
                  <span className="contact-label">Site web</span>
                  <a
                    href={businessCard.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-value contact-link"
                  >
                    {businessCard.website}
                  </a>
                </div>
              )}
            </div>

            <div className="card-footer">
              <div className="card-qr-placeholder">
                <QrCode size={64} />
                <span className="qr-label">Scannez pour ajouter</span>
              </div>
              <div className="card-brand">NEXUS</div>
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary">
            <Share size={18} />
            Partager
          </button>
          <button className="btn-primary">
            <Download size={18} />
            Télécharger (VCF)
          </button>
        </div>
      </div>
    </div>
  );
}
