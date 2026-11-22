/**
 * MOCK DATA SERVICE
 *
 * This file provides realistic mock data for frontend development.
 * All data is simulated and will be replaced with actual backend API calls.
 *
 * INTEGRATION NOTES:
 * - Replace these functions with actual API calls when backend is ready
 * - Keep the same TypeScript interfaces for type safety
 * - API contracts are documented in BACKEND_INTEGRATION.md
 */

import type {
  Profile,
  NetworkingIntention,
  EventParticipation,
  Connection,
  CompanyMembership,
  PrivacySettings,
  BusinessCard,
} from '../types/profile';

// Simulated delay for async operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get the current user's profile
 * BACKEND: GET /api/profile
 */
export async function getProfile(): Promise<Profile> {
  await delay(300);
  return {
    id: 'mock-profile-1',
    userId: 'mock-user-1',
    fullName: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    avatarUrl: undefined,
    title: 'Directrice Innovation',
    company: 'TechNova Solutions',
    location: {
      city: 'Paris',
      country: 'France',
    },
    phone: '+33 6 12 34 56 78',
    website: 'https://technova.fr',
    headline: 'Transformer les entreprises par l\'innovation technologique et les partenariats stratégiques.',
    bio: 'Experte en transformation digitale avec plus de 15 ans d\'expérience dans le secteur technologique. Passionnée par la création de liens entre startups et entreprises établies pour accélérer l\'innovation.',
    expertise: ['Transformation digitale', 'Stratégie d\'innovation', 'Partenariats B2B', 'Tech leadership'],
    industry: 'Technologie',
    interests: ['Intelligence artificielle', 'Sustainability Tech', 'FinTech', 'CleanTech'],
    completionPercentage: 75,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-11-20T14:30:00Z',
  };
}

/**
 * Update the user's profile
 * BACKEND: PUT /api/profile
 */
export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  await delay(500);
  const current = await getProfile();
  return { ...current, ...data, updatedAt: new Date().toISOString() };
}

/**
 * Get networking intentions
 * BACKEND: GET /api/profile/intentions
 */
export async function getIntentions(): Promise<NetworkingIntention[]> {
  await delay(200);
  return [
    {
      id: 'intent-1',
      type: 'offer',
      category: 'Conseil en innovation',
      description: 'Accompagnement stratégique pour les entreprises en transformation digitale.',
    },
    {
      id: 'intent-2',
      type: 'offer',
      category: 'Partenariats technologiques',
      description: 'Mise en relation avec des startups innovantes dans le domaine de l\'IA.',
    },
    {
      id: 'intent-3',
      type: 'seek',
      category: 'Investisseurs',
      description: 'À la recherche de partenaires financiers pour des projets d\'expansion européenne.',
    },
    {
      id: 'intent-4',
      type: 'seek',
      category: 'Clients B2B',
      description: 'Entreprises du secteur industriel intéressées par l\'innovation.',
    },
  ];
}

/**
 * Update networking intentions
 * BACKEND: PUT /api/profile/intentions
 */
export async function updateIntentions(intentions: NetworkingIntention[]): Promise<NetworkingIntention[]> {
  await delay(400);
  return intentions;
}

/**
 * Get user's event participations
 * BACKEND: GET /api/profile/events
 */
export async function getEventParticipations(): Promise<EventParticipation[]> {
  await delay(200);
  return [
    {
      id: 'part-1',
      eventId: 'event-1',
      eventName: 'Salon Innovation 2026',
      eventDate: '2026-03-15',
      location: 'Paris Expo Porte de Versailles',
      organizer: 'Nexus Events',
      status: 'upcoming',
      role: 'Participant',
    },
    {
      id: 'part-2',
      eventId: 'event-2',
      eventName: 'Tech Summit Europe',
      eventDate: '2025-11-10',
      location: 'Berlin, Germany',
      organizer: 'Tech Alliance',
      status: 'past',
      role: 'Speaker',
    },
    {
      id: 'part-3',
      eventId: 'event-3',
      eventName: 'Future of Business Conference',
      eventDate: '2025-09-20',
      location: 'Lyon, France',
      organizer: 'Business France',
      status: 'past',
      role: 'Participant',
    },
  ];
}

/**
 * Get user's professional connections
 * BACKEND: GET /api/profile/connections
 */
export async function getConnections(): Promise<Connection[]> {
  await delay(200);
  return [
    {
      id: 'conn-1',
      profileId: 'profile-2',
      fullName: 'Karim Merabet',
      title: 'CEO',
      company: 'GreenTech Solutions',
      avatarUrl: undefined,
      status: 'accepted',
      connectedAt: '2025-08-15T10:00:00Z',
      upcomingMeeting: {
        date: '2025-12-05',
        time: '14:30',
      },
    },
    {
      id: 'conn-2',
      profileId: 'profile-3',
      fullName: 'Sabrina Benali',
      title: 'Directrice Innovation',
      company: 'TechNova',
      avatarUrl: undefined,
      status: 'accepted',
      connectedAt: '2025-07-20T09:00:00Z',
    },
    {
      id: 'conn-3',
      profileId: 'profile-4',
      fullName: 'Thomas Dubois',
      title: 'Investisseur',
      company: 'EuroVentures',
      avatarUrl: undefined,
      status: 'pending',
    },
  ];
}

/**
 * Get company membership
 * BACKEND: GET /api/profile/company
 */
export async function getCompanyMembership(): Promise<CompanyMembership> {
  await delay(200);
  return {
    id: 'comp-1',
    companyId: 'company-1',
    companyName: 'TechNova Solutions',
    logoUrl: undefined,
    industry: 'Technologie',
    role: 'Directrice Innovation',
    status: 'active',
    joinedAt: '2023-03-01T00:00:00Z',
  };
}

/**
 * Get privacy settings
 * BACKEND: GET /api/profile/privacy
 */
export async function getPrivacySettings(): Promise<PrivacySettings> {
  await delay(150);
  return {
    profileVisibleInDirectory: true,
    publicBusinessCard: true,
    shareEmail: false,
    sharePhone: false,
    appearInSuggestions: true,
  };
}

/**
 * Update privacy settings
 * BACKEND: PUT /api/profile/privacy
 */
export async function updatePrivacySettings(settings: PrivacySettings): Promise<PrivacySettings> {
  await delay(300);
  return settings;
}

/**
 * Get business card data
 * BACKEND: GET /api/profile/business-card
 */
export async function getBusinessCard(): Promise<BusinessCard> {
  await delay(150);
  const profile = await getProfile();
  const privacy = await getPrivacySettings();
  return {
    fullName: profile.fullName,
    title: profile.title,
    company: profile.company,
    avatarUrl: profile.avatarUrl,
    email: privacy.shareEmail ? profile.email : undefined,
    phone: privacy.sharePhone ? profile.phone : undefined,
    website: profile.website,
    qrCodeUrl: undefined, // Will be generated by backend
  };
}

/**
 * Upload profile avatar
 * BACKEND: POST /api/profile/avatar
 */
export async function uploadAvatar(file: File): Promise<string> {
  await delay(1000);
  // Simulate upload and return a mock URL
  return `https://mock-cdn.example.com/avatars/${file.name}`;
}
