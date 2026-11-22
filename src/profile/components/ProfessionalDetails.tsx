import { Envelope, MapPin, Phone, Globe, Buildings, User, TextT } from '@phosphor-icons/react';
import type { Profile } from '../types/profile';

interface ProfessionalDetailsProps {
  profile: Profile;
  onEdit: () => void;
  isOwnProfile: boolean;
}

export function ProfessionalDetails({ profile, onEdit, isOwnProfile }: ProfessionalDetailsProps) {
  return (
    <section className="profile-section">
      <div className="section-header">
        <h2 className="section-title">Informations professionnelles</h2>
        {isOwnProfile && (
          <button className="btn-text" onClick={onEdit}>
            Modifier
          </button>
        )}
      </div>

      <div className="details-grid">
        <div className="detail-item">
          <User size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Nom complet</span>
            <span className="detail-value">{profile.fullName}</span>
          </div>
        </div>

        <div className="detail-item">
          <Buildings size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Titre</span>
            <span className="detail-value">{profile.title}</span>
          </div>
        </div>

        <div className="detail-item">
          <Buildings size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Entreprise</span>
            <span className="detail-value">{profile.company}</span>
          </div>
        </div>

        <div className="detail-item">
          <MapPin size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">Localisation</span>
            <span className="detail-value">
              {profile.location.city}, {profile.location.country}
            </span>
          </div>
        </div>

        <div className="detail-item">
          <Envelope size={20} className="detail-icon" />
          <div className="detail-content">
            <span className="detail-label">E-mail</span>
            <span className="detail-value">{profile.email}</span>
          </div>
        </div>

        {profile.phone && (
          <div className="detail-item">
            <Phone size={20} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Téléphone</span>
              <span className="detail-value">{profile.phone}</span>
            </div>
          </div>
        )}

        {profile.website && (
          <div className="detail-item">
            <Globe size={20} className="detail-icon" />
            <div className="detail-content">
              <span className="detail-label">Site web</span>
              <a
                href={profile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-value detail-link"
              >
                {profile.website}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="bio-section">
        <div className="bio-header">
          <TextT size={20} className="detail-icon" />
          <div>
            <span className="detail-label">Titre professionnel</span>
            <p className="headline-text">{profile.headline}</p>
          </div>
        </div>
        <div className="bio-content">
          <span className="detail-label">À propos</span>
          <p className="bio-text">{profile.bio}</p>
        </div>
      </div>

      {profile.expertise.length > 0 && (
        <div className="tags-section">
          <span className="detail-label">Expertise</span>
          <div className="tags-list">
            {profile.expertise.map((skill, index) => (
              <span key={index} className="tag tag-primary">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {profile.interests.length > 0 && (
        <div className="tags-section">
          <span className="detail-label">Centres d'intérêt</span>
          <div className="tags-list">
            {profile.interests.map((interest, index) => (
              <span key={index} className="tag tag-secondary">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="detail-item">
        <Buildings size={20} className="detail-icon" />
        <div className="detail-content">
          <span className="detail-label">Secteur</span>
          <span className="detail-value">{profile.industry}</span>
        </div>
      </div>
    </section>
  );
}
