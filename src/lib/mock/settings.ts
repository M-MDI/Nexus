import type { NotificationPreference, PrivacyPreferences } from './types';

export const notificationPreferences: NotificationPreference[] = [
  { id: 'n1', label: 'Demandes de mise en relation', description: 'Quand quelqu’un souhaite se connecter avec vous', email: true, push: true },
  { id: 'n2', label: 'Messages', description: 'Nouveaux messages dans vos conversations', email: false, push: true },
  { id: 'n3', label: 'Rendez-vous', description: 'Confirmations, contre-propositions et annulations', email: true, push: true },
  { id: 'n4', label: 'Événements', description: 'Nouveaux événements correspondant à vos centres d’intérêt', email: true, push: false },
  { id: 'n5', label: 'Suggestions de matching', description: 'Nouvelles suggestions de contacts pour vos événements', email: false, push: true },
  { id: 'n6', label: 'Actualités Nexus', description: 'Nouveautés produit et conseils networking', email: true, push: false },
];

export const privacyPreferences: PrivacyPreferences = {
  profileVisibleInDirectory: true,
  publicBusinessCard: true,
  shareEmail: false,
  sharePhone: false,
  appearInSuggestions: true,
  showOnlineStatus: true,
  allowMeetingRequests: true,
  dataExportRequested: false,
};
