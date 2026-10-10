import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { auth, finishRecovery } from '../auth';
import {
  ProfileHeader,
  ProfessionalDetails,
  NetworkingIntentions,
  DigitalBusinessCard,
  ProfileEvents,
  ProfessionalNetwork,
  CompanyMembership,
  PrivacySettings,
  EditProfileDialog,
  IntentionsDialog,
} from './components';
import {
  getProfile,
  updateProfile,
  getIntentions,
  updateIntentions,
  getEventParticipations,
  getConnections,
  getCompanyMembership,
  getPrivacySettings,
  updatePrivacySettings,
  getBusinessCard,
} from './lib/mockData';
import type {
  BusinessCard,
  CompanyMembership as CompanyMembershipType,
  Connection,
  EditableProfileFields,
  EventParticipation,
  NetworkingIntention,
  PrivacySettings as PrivacySettingsType,
  Profile,
} from './types/profile';

export function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [intentions, setIntentions] = useState<NetworkingIntention[]>([]);
  const [events, setEvents] = useState<EventParticipation[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [membership, setMembership] = useState<CompanyMembershipType | null>(null);
  const [privacy, setPrivacy] = useState<PrivacySettingsType | null>(null);
  const [businessCard, setBusinessCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [intentionsOpen, setIntentionsOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all([
      getProfile(),
      getIntentions(),
      getEventParticipations(),
      getConnections(),
      getCompanyMembership(),
      getPrivacySettings(),
      getBusinessCard(),
    ]).then(([p, i, e, c, m, s, b]) => {
      if (!active) return;
      setProfile(p);
      setIntentions(i);
      setEvents(e);
      setConnections(c);
      setMembership(m);
      setPrivacy(s);
      setBusinessCard(b);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  async function handleSaveProfile(data: EditableProfileFields) {
    const updated = await updateProfile(data);
    setProfile(updated);
    setBusinessCard(await getBusinessCard());
    toast.success('Profil mis à jour');
  }

  async function handleSaveIntentions(next: NetworkingIntention[]) {
    const saved = await updateIntentions(next);
    setIntentions(saved);
    toast.success('Intentions mises à jour');
  }

  async function handlePrivacyUpdate(settings: PrivacySettingsType) {
    const saved = await updatePrivacySettings(settings);
    setPrivacy(saved);
    setBusinessCard(await getBusinessCard());
    toast.success('Préférences de confidentialité enregistrées');
  }

  async function handleSignOut() {
    finishRecovery();
    if (auth) await auth.signOut({ scope: 'local' });
    navigate('/login', { replace: true });
  }

  if (loading || !profile || !privacy || !membership || !businessCard) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-muted-foreground">
        Chargement du profil…
      </div>
    );
  }

  const editableFields: EditableProfileFields = {
    fullName: profile.fullName,
    avatarUrl: profile.avatarUrl,
    title: profile.title,
    company: profile.company,
    location: profile.location,
    email: profile.email,
    phone: profile.phone,
    website: profile.website,
    headline: profile.headline,
    bio: profile.bio,
    expertise: profile.expertise,
    industry: profile.industry,
    interests: profile.interests,
  };

  return (
    <div className="profile-layout">
      <div className="profile-container">
        <div className="profile-content">
          <div className="profile-main">
            <ProfileHeader
              profile={profile}
              onEdit={() => setEditOpen(true)}
              onBusinessCard={() => setCardOpen(true)}
              onSignOut={handleSignOut}
              isOwnProfile
            />
            <ProfessionalDetails profile={profile} onEdit={() => setEditOpen(true)} isOwnProfile />
            <NetworkingIntentions
              intentions={intentions}
              onEdit={() => setIntentionsOpen(true)}
              isOwnProfile
            />
            <ProfileEvents events={events} />
            <ProfessionalNetwork connections={connections} />
          </div>
          <aside className="profile-sidebar">
            <DigitalBusinessCard
              businessCard={businessCard}
              isOpen={cardOpen}
              onClose={() => setCardOpen(false)}
            />
            <CompanyMembership membership={membership} />
            <PrivacySettings settings={privacy} onUpdate={handlePrivacyUpdate} isOwnProfile />
          </aside>
        </div>
      </div>
      <EditProfileDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        onSave={handleSaveProfile}
        initialData={editableFields}
      />
      <IntentionsDialog
        isOpen={intentionsOpen}
        onClose={() => setIntentionsOpen(false)}
        intentions={intentions}
        onSave={handleSaveIntentions}
      />
    </div>
  );
}
