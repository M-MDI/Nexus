import { Lock, Eye, EyeSlash, Globe, Users } from '@phosphor-icons/react';
import type { PrivacySettings as PrivacySettingsType } from '../types/profile';

interface PrivacySettingsProps {
  settings: PrivacySettingsType;
  onUpdate: (settings: PrivacySettingsType) => void;
  isOwnProfile: boolean;
}

export function PrivacySettings({
  settings,
  onUpdate,
  isOwnProfile,
}: PrivacySettingsProps) {
  if (!isOwnProfile) return null;

  const toggleSetting = (key: keyof PrivacySettingsType) => {
    onUpdate({ ...settings, [key]: !settings[key] });
  };

  return (
    <section className="profile-section">
      <h2 className="section-title">Confidentialité et visibilité</h2>

      <div className="privacy-settings">
        <PrivacyToggle
          icon={<Globe size={20} />}
          label="Profil visible dans l'annuaire des événements"
          description="Votre profil peut être découvert par d'autres participants"
          checked={settings.profileVisibleInDirectory}
          onChange={() => toggleSetting('profileVisibleInDirectory')}
        />

        <PrivacyToggle
          icon={<Eye size={20} />}
          label="Carte de visite publique"
          description="Autorisez les autres à voir votre carte de visite numérique"
          checked={settings.publicBusinessCard}
          onChange={() => toggleSetting('publicBusinessCard')}
        />

        <PrivacyToggle
          icon={<Users size={20} />}
          label="Partager mon e-mail"
          description="Votre e-mail sera visible sur votre profil et votre carte de visite"
          checked={settings.shareEmail}
          onChange={() => toggleSetting('shareEmail')}
        />

        <PrivacyToggle
          icon={<Users size={20} />}
          label="Partager mon téléphone"
          description="Votre numéro sera visible sur votre profil et votre carte de visite"
          checked={settings.sharePhone}
          onChange={() => toggleSetting('sharePhone')}
        />

        <PrivacyToggle
          icon={<Lock size={20} />}
          label="Apparaître dans les suggestions de networking"
          description="Suggérer votre profil aux autres participants potentiels"
          checked={settings.appearInSuggestions}
          onChange={() => toggleSetting('appearInSuggestions')}
        />
      </div>
    </section>
  );
}

interface PrivacyToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}

function PrivacyToggle({
  icon,
  label,
  description,
  checked,
  onChange,
}: PrivacyToggleProps) {
  return (
    <div className="privacy-toggle">
      <div className="toggle-icon">{icon}</div>
      <div className="toggle-content">
        <div className="toggle-header">
          <span className="toggle-label">{label}</span>
          <button
            className={`toggle-switch ${checked ? 'toggle-on' : 'toggle-off'}`}
            onClick={onChange}
            aria-label={checked ? 'Désactiver' : 'Activer'}
            role="switch"
            aria-checked={checked}
          >
            <span className="toggle-slider" />
          </button>
        </div>
        <p className="toggle-description">{description}</p>
      </div>
    </div>
  );
}
