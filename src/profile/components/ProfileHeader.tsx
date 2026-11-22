import { Camera, PencilSimple, QrCode, SignOut } from '@phosphor-icons/react';
import type { Profile } from '../types/profile';

interface ProfileHeaderProps {
  profile: Profile;
  onEdit: () => void;
  onBusinessCard: () => void;
  onSignOut: () => void;
  isOwnProfile: boolean;
}

export function ProfileHeader({
  profile,
  onEdit,
  onBusinessCard,
  onSignOut,
  isOwnProfile,
}: ProfileHeaderProps) {
  const initials = profile.fullName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="profile-header">
      <div className="profile-cover">
        <div className="cover-pattern" />
      </div>

      <div className="profile-header-content">
        <div className="profile-avatar-section">
          <div className="profile-avatar">
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.fullName} />
            ) : (
              <span className="avatar-initials">{initials}</span>
            )}
            {isOwnProfile && (
              <button
                className="avatar-edit"
                onClick={onEdit}
                aria-label="Modifier la photo de profil"
              >
                <Camera size={20} />
              </button>
            )}
          </div>

          <div className="profile-info">
            <h1 className="profile-name">{profile.fullName}</h1>
            <p className="profile-title">{profile.title}</p>
            <p className="profile-company">{profile.company}</p>
            <p className="profile-location">
              {profile.location.city}, {profile.location.country}
            </p>
          </div>
        </div>

        <div className="profile-header-actions">
          <div className="completion-indicator">
            <div className="completion-bar">
              <div
                className="completion-fill"
                style={{ width: `${profile.completionPercentage}%` }}
              />
            </div>
            <span className="completion-text">
              Profil complété à {profile.completionPercentage}%
            </span>
          </div>

          {isOwnProfile && (
            <div className="action-buttons">
              <button className="btn-secondary" onClick={onBusinessCard}>
                <QrCode size={18} />
                Carte de visite
              </button>
              <button className="btn-secondary" onClick={onEdit}>
                <PencilSimple size={18} />
                Modifier
              </button>
              <button className="btn-ghost" onClick={onSignOut}>
                <SignOut size={18} />
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
