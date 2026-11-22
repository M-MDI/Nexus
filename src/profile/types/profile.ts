export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  title: string;
  company: string;
  location: {
    city: string;
    country: string;
  };
  phone?: string;
  website?: string;
  headline: string;
  bio: string;
  expertise: string[];
  industry: string;
  interests: string[];
  completionPercentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface NetworkingIntention {
  id: string;
  type: 'offer' | 'seek';
  category: string;
  description: string;
  eventId?: string;
  eventName?: string;
}

export interface EventParticipation {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  location: string;
  organizer: string;
  status: 'upcoming' | 'past' | 'cancelled';
  role: string;
}

export interface Connection {
  id: string;
  profileId: string;
  fullName: string;
  title: string;
  company: string;
  avatarUrl?: string;
  status: 'accepted' | 'pending' | 'requested';
  connectedAt?: string;
  upcomingMeeting?: {
    date: string;
    time: string;
  };
}

export interface CompanyMembership {
  id: string;
  companyId: string;
  companyName: string;
  logoUrl?: string;
  industry: string;
  role: string;
  status: 'active' | 'pending' | 'none';
  joinedAt?: string;
}

export interface PrivacySettings {
  profileVisibleInDirectory: boolean;
  publicBusinessCard: boolean;
  shareEmail: boolean;
  sharePhone: boolean;
  appearInSuggestions: boolean;
}

export interface BusinessCard {
  fullName: string;
  title: string;
  company: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  website?: string;
  qrCodeUrl?: string;
}

export type EditableProfileFields = Pick<
  Profile,
  | 'fullName'
  | 'avatarUrl'
  | 'title'
  | 'company'
  | 'location'
  | 'email'
  | 'phone'
  | 'website'
  | 'headline'
  | 'bio'
  | 'expertise'
  | 'industry'
  | 'interests'
>;
